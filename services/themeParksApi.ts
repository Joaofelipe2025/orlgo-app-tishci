
// ThemeParks API Integration
const API = "https://api.themeparks.wiki/v1";

export interface LiveEntity {
  id: string;
  name: string;
  entityType: 'ATTRACTION' | 'RESTAURANT' | 'SHOW' | 'ENTERTAINMENT';
  status?: 'OPERATING' | 'DOWN' | 'CLOSED';
  queue?: {
    STANDBY?: {
      waitTime?: number;
    };
  };
}

export interface LiveDataResponse {
  liveData: {
    entities: LiveEntity[];
  };
}

export interface FilteredLiveData {
  attractions: LiveEntity[];
  restaurants: LiveEntity[];
  shows: LiveEntity[];
}

export async function getLiveData(parkId: string): Promise<FilteredLiveData> {
  try {
    const res = await fetch(`${API}/entity/${parkId}/live`);
    if (!res.ok) throw new Error("Erro ao carregar live data");
    const json: LiveDataResponse = await res.json();
    const entities = json.liveData?.entities || [];
    
    return {
      attractions: entities.filter(e => e.entityType === "ATTRACTION"),
      restaurants: entities.filter(e => e.entityType === "RESTAURANT"),
      shows: entities.filter(e => e.entityType === "SHOW" || e.entityType === "ENTERTAINMENT")
    };
  } catch (error) {
    console.error('Error fetching live data:', error);
    throw error;
  }
}

export async function getEntityDetails(entityId: string) {
  try {
    const res = await fetch(`${API}/entity/${entityId}`);
    if (!res.ok) throw new Error("Erro ao carregar detalhes");
    return await res.json();
  } catch (error) {
    console.error('Error fetching entity details:', error);
    throw error;
  }
}

export async function getDestinations() {
  try {
    const res = await fetch(`${API}/destinations`);
    if (!res.ok) throw new Error("Erro ao carregar destinos");
    return await res.json();
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
}

export async function getEntityChildren(entityId: string) {
  try {
    const res = await fetch(`${API}/entity/${entityId}/children`);
    if (!res.ok) throw new Error("Erro ao carregar filhos");
    return await res.json();
  } catch (error) {
    console.error('Error fetching entity children:', error);
    throw error;
  }
}
