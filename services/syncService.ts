
import { supabase } from '@/app/integrations/supabase/client';
import type { TablesInsert } from '@/app/integrations/supabase/types';

const THEMEPARKS_API = 'https://api.themeparks.wiki/v1/entity';

interface ThemeParksChild {
  id: string;
  name: string;
  entityType: string;
  externalId?: string;
}

interface ThemeParksLiveEntity {
  id?: string;
  entityId?: string;
  externalId?: string;
  queue?: {
    STANDBY?: {
      waitTime?: number;
    };
  };
  status?: string;
}

interface ThemeParksLiveData {
  entities?: ThemeParksLiveEntity[];
}

interface ThemeParksLiveResponse {
  liveData?: ThemeParksLiveData | ThemeParksLiveData[];
}

/**
 * Fetch park children (attractions, restaurants, shows) from ThemeParks API
 */
async function fetchParkChildren(apiEntityId: string): Promise<ThemeParksChild[]> {
  try {
    const response = await fetch(`${THEMEPARKS_API}/${apiEntityId}/children`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch children: ${response.status}`);
    }
    
    const json = await response.json();
    return json.children || [];
  } catch (error) {
    console.error('Error fetching park children:', error);
    return [];
  }
}

/**
 * Fetch live wait times from ThemeParks API
 */
async function fetchLiveWaitTimes(apiEntityId: string): Promise<Map<string, { waitTime: number; status?: string }>> {
  try {
    const response = await fetch(`${THEMEPARKS_API}/${apiEntityId}/live`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch live data: ${response.status}`);
    }
    
    const json: ThemeParksLiveResponse = await response.json();
    
    // Normalize liveData to array
    const liveDataArray = Array.isArray(json.liveData)
      ? json.liveData
      : json.liveData
      ? [json.liveData]
      : [];
    
    // Flatten all entities
    const liveEntities = liveDataArray.flatMap((ld) => ld.entities || []);
    
    // Create map of wait times
    const waitTimeMap = new Map<string, { waitTime: number; status?: string }>();
    
    liveEntities.forEach((entity) => {
      const entityId = entity.id || entity.entityId;
      const externalId = entity.externalId;
      const standby = entity.queue?.STANDBY;
      
      if (standby && typeof standby.waitTime === 'number') {
        const waitData = {
          waitTime: standby.waitTime,
          status: entity.status
        };
        
        if (entityId) {
          waitTimeMap.set(entityId, waitData);
        }
        if (externalId) {
          waitTimeMap.set(externalId, waitData);
        }
      }
    });
    
    return waitTimeMap;
  } catch (error) {
    console.error('Error fetching live wait times:', error);
    return new Map();
  }
}

/**
 * Determine queue status based on wait time
 */
function getQueueStatus(waitTime: number): 'short' | 'medium' | 'long' {
  if (waitTime <= 20) return 'short';
  if (waitTime <= 45) return 'medium';
  return 'long';
}

/**
 * Sync a single park's attractions to Supabase
 */
export async function syncParkAttractions(parkId: string, apiEntityId: string) {
  console.log(`Syncing park ${parkId} (${apiEntityId})...`);
  
  try {
    // Fetch children and live data
    const [children, waitTimeMap] = await Promise.all([
      fetchParkChildren(apiEntityId),
      fetchLiveWaitTimes(apiEntityId)
    ]);
    
    console.log(`Found ${children.length} items for park ${parkId}`);
    console.log(`Found ${waitTimeMap.size} wait times`);
    
    // Prepare attractions for upsert
    const attractions: TablesInsert<'attractions'>[] = children.map((child) => {
      // Try to find wait time by id or externalId
      const waitData = waitTimeMap.get(child.id) || 
                      (child.externalId ? waitTimeMap.get(child.externalId) : undefined);
      
      const waitTime = waitData?.waitTime;
      const status = waitData?.status || 'operating';
      
      return {
        park_id: parkId,
        api_entity_id: child.id,
        external_id: child.externalId,
        name: child.name,
        entity_type: child.entityType,
        wait_time: waitTime !== undefined ? waitTime : null,
        queue_status: waitTime !== undefined ? getQueueStatus(waitTime) : null,
        status: status,
        last_updated: new Date().toISOString()
      };
    });
    
    // Upsert attractions to Supabase
    if (attractions.length > 0) {
      const { data, error } = await supabase
        .from('attractions')
        .upsert(attractions, {
          onConflict: 'api_entity_id',
          ignoreDuplicates: false
        })
        .select();
      
      if (error) {
        console.error('Error upserting attractions:', error);
        throw error;
      }
      
      console.log(`Successfully synced ${data?.length || 0} attractions for park ${parkId}`);
      return data;
    }
    
    return [];
  } catch (error) {
    console.error(`Error syncing park ${parkId}:`, error);
    throw error;
  }
}

/**
 * Sync all parks with API entity IDs
 */
export async function syncAllParks() {
  console.log('Starting sync of all parks...');
  
  try {
    // Get all parks with API entity IDs
    const { data: parks, error } = await supabase
      .from('parks')
      .select('id, name, api_entity_id')
      .not('api_entity_id', 'is', null);
    
    if (error) {
      console.error('Error fetching parks:', error);
      throw error;
    }
    
    if (!parks || parks.length === 0) {
      console.log('No parks with API entity IDs found');
      return;
    }
    
    console.log(`Found ${parks.length} parks to sync`);
    
    // Sync each park
    const results = [];
    for (const park of parks) {
      try {
        const attractions = await syncParkAttractions(park.id, park.api_entity_id!);
        results.push({
          parkId: park.id,
          parkName: park.name,
          attractionsCount: attractions.length,
          success: true
        });
      } catch (error) {
        console.error(`Failed to sync park ${park.name}:`, error);
        results.push({
          parkId: park.id,
          parkName: park.name,
          attractionsCount: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    console.log('Sync complete:', results);
    return results;
  } catch (error) {
    console.error('Error syncing all parks:', error);
    throw error;
  }
}

/**
 * Update wait times for a specific park
 */
export async function updateParkWaitTimes(parkId: string, apiEntityId: string) {
  console.log(`Updating wait times for park ${parkId}...`);
  
  try {
    const waitTimeMap = await fetchLiveWaitTimes(apiEntityId);
    
    if (waitTimeMap.size === 0) {
      console.log('No wait times found');
      return;
    }
    
    // Get all attractions for this park
    const { data: attractions, error } = await supabase
      .from('attractions')
      .select('id, api_entity_id, external_id')
      .eq('park_id', parkId);
    
    if (error) {
      console.error('Error fetching attractions:', error);
      throw error;
    }
    
    if (!attractions || attractions.length === 0) {
      console.log('No attractions found for park');
      return;
    }
    
    // Update wait times
    const updates = [];
    for (const attraction of attractions) {
      const waitData = waitTimeMap.get(attraction.api_entity_id!) || 
                      (attraction.external_id ? waitTimeMap.get(attraction.external_id) : undefined);
      
      if (waitData) {
        updates.push({
          id: attraction.id,
          wait_time: waitData.waitTime,
          queue_status: getQueueStatus(waitData.waitTime),
          status: waitData.status || 'operating',
          last_updated: new Date().toISOString()
        });
        
        // Also record in history
        await supabase
          .from('wait_time_history')
          .insert({
            attraction_id: attraction.id,
            wait_time: waitData.waitTime,
            status: waitData.status
          });
      }
    }
    
    if (updates.length > 0) {
      const { error: updateError } = await supabase
        .from('attractions')
        .upsert(updates);
      
      if (updateError) {
        console.error('Error updating wait times:', updateError);
        throw updateError;
      }
      
      console.log(`Updated ${updates.length} wait times for park ${parkId}`);
    }
    
    return updates.length;
  } catch (error) {
    console.error(`Error updating wait times for park ${parkId}:`, error);
    throw error;
  }
}

/**
 * Update wait times for all parks
 */
export async function updateAllParkWaitTimes() {
  console.log('Updating wait times for all parks...');
  
  try {
    const { data: parks, error } = await supabase
      .from('parks')
      .select('id, name, api_entity_id')
      .not('api_entity_id', 'is', null);
    
    if (error) {
      console.error('Error fetching parks:', error);
      throw error;
    }
    
    if (!parks || parks.length === 0) {
      console.log('No parks with API entity IDs found');
      return;
    }
    
    const results = [];
    for (const park of parks) {
      try {
        const updatedCount = await updateParkWaitTimes(park.id, park.api_entity_id!);
        results.push({
          parkId: park.id,
          parkName: park.name,
          updatedCount,
          success: true
        });
      } catch (error) {
        console.error(`Failed to update wait times for ${park.name}:`, error);
        results.push({
          parkId: park.id,
          parkName: park.name,
          updatedCount: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    console.log('Wait time update complete:', results);
    return results;
  } catch (error) {
    console.error('Error updating all park wait times:', error);
    throw error;
  }
}
