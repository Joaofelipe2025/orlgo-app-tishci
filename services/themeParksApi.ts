
// ThemeParks API Integration
const API_URL = "https://api.themeparks.wiki/v1/entity/";

export interface LiveEntity {
  id: string;
  name: string;
  entityType: 'ATTRACTION' | 'RESTAURANT' | 'SHOW' | 'ENTERTAINMENT' | 'PARADE' | 'FIREWORKS';
  status?: 'OPERATING' | 'DOWN' | 'CLOSED' | 'REFURBISHMENT';
  queue?: {
    STANDBY?: {
      waitTime?: number;
    };
    SINGLE_RIDER?: {
      waitTime?: number;
    };
  };
}

export interface EnrichedEntity extends LiveEntity {
  attractionStyle?: string[];
  intensity?: 'low' | 'medium' | 'high';
  summary?: string;
  queueStatus?: 'short' | 'medium' | 'long';
}

export interface LiveDataResponse {
  liveData: {
    entities: LiveEntity[];
  };
}

export interface FilteredLiveData {
  attractions: EnrichedEntity[];
  restaurants: EnrichedEntity[];
  shows: EnrichedEntity[];
}

// Function to determine attraction style based on name and type
function determineAttractionStyle(entity: LiveEntity): string[] {
  const name = entity.name.toLowerCase();
  const styles: string[] = [];

  // Radical/Thrill rides
  if (
    name.includes('mountain') ||
    name.includes('coaster') ||
    name.includes('tower') ||
    name.includes('drop') ||
    name.includes('expedition') ||
    name.includes('everest') ||
    name.includes('space') ||
    name.includes('thunder') ||
    name.includes('splash')
  ) {
    styles.push('radical');
  }

  // Family rides
  if (
    name.includes('pirates') ||
    name.includes('haunted') ||
    name.includes('jungle') ||
    name.includes('safari') ||
    name.includes('carousel') ||
    name.includes('dumbo') ||
    name.includes('tea') ||
    name.includes('small world') ||
    name.includes('buzz')
  ) {
    styles.push('family');
  }

  // Kids rides
  if (
    name.includes('dumbo') ||
    name.includes('carousel') ||
    name.includes('barnstormer') ||
    name.includes('carpet') ||
    name.includes('tea')
  ) {
    styles.push('kids');
  }

  // Shows
  if (entity.entityType === 'SHOW' || entity.entityType === 'ENTERTAINMENT') {
    styles.push('show');
  }

  // Parades and Fireworks
  if (entity.entityType === 'PARADE' || entity.entityType === 'FIREWORKS') {
    styles.push('show');
  }

  // Simulators
  if (
    name.includes('flight') ||
    name.includes('soarin') ||
    name.includes('star tours') ||
    name.includes('simulator')
  ) {
    styles.push('simulator');
  }

  // Water rides
  if (
    name.includes('splash') ||
    name.includes('rapids') ||
    name.includes('kali') ||
    name.includes('water')
  ) {
    styles.push('water');
  }

  // Default to family if no style detected
  if (styles.length === 0) {
    styles.push('family');
  }

  return styles;
}

// Function to determine intensity based on attraction style
function determineIntensity(styles: string[]): 'low' | 'medium' | 'high' {
  if (styles.includes('radical')) return 'high';
  if (styles.includes('water') || styles.includes('simulator')) return 'medium';
  return 'low';
}

// Function to generate a brief summary
function generateSummary(entity: LiveEntity, styles: string[]): string {
  const name = entity.name;

  if (entity.entityType === 'RESTAURANT') {
    return `Restaurante com opções deliciosas para toda a família.`;
  }

  if (entity.entityType === 'SHOW' || entity.entityType === 'ENTERTAINMENT') {
    return `Show ao vivo com apresentações incríveis e momentos mágicos.`;
  }

  if (entity.entityType === 'PARADE') {
    return `Desfile espetacular com personagens e carros alegóricos.`;
  }

  if (entity.entityType === 'FIREWORKS') {
    return `Show de fogos de artifício deslumbrante que ilumina o céu.`;
  }

  // Attraction summaries based on style
  if (styles.includes('radical')) {
    return `Atração radical com emoção e adrenalina do início ao fim!`;
  }

  if (styles.includes('simulator')) {
    return `Experiência imersiva em simulador de última geração.`;
  }

  if (styles.includes('water')) {
    return `Aventura aquática refrescante com momentos emocionantes.`;
  }

  if (styles.includes('kids')) {
    return `Atração perfeita para os pequenos se divertirem com segurança.`;
  }

  return `Atração clássica que encanta visitantes de todas as idades.`;
}

// Function to determine queue status based on wait time
function getQueueStatus(waitTime?: number): 'short' | 'medium' | 'long' {
  if (!waitTime) return 'short';
  if (waitTime <= 20) return 'short';
  if (waitTime <= 45) return 'medium';
  return 'long';
}

// Enrich entity with additional metadata
function enrichEntity(entity: LiveEntity): EnrichedEntity {
  const styles = determineAttractionStyle(entity);
  const intensity = determineIntensity(styles);
  const summary = generateSummary(entity, styles);
  const waitTime = entity.queue?.STANDBY?.waitTime;
  const queueStatus = getQueueStatus(waitTime);

  return {
    ...entity,
    attractionStyle: styles,
    intensity,
    summary,
    queueStatus,
  };
}

export async function loadParkLiveData(parkId: string): Promise<FilteredLiveData> {
  try {
    const response = await fetch(`${API_URL}${parkId}/live`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json: LiveDataResponse = await response.json();
    const entities = json.liveData?.entities || [];

    console.log(`Loaded ${entities.length} entities for park ${parkId}`);

    const attractions = entities
      .filter(e => e.entityType === 'ATTRACTION')
      .map(enrichEntity);

    const restaurants = entities
      .filter(e => e.entityType === 'RESTAURANT')
      .map(enrichEntity);

    const shows = entities
      .filter(
        e =>
          e.entityType === 'SHOW' ||
          e.entityType === 'ENTERTAINMENT' ||
          e.entityType === 'PARADE' ||
          e.entityType === 'FIREWORKS'
      )
      .map(enrichEntity);

    return {
      attractions,
      restaurants,
      shows,
    };
  } catch (err) {
    console.error('Erro ao carregar LIVE:', err);
    return { attractions: [], restaurants: [], shows: [] };
  }
}

// Legacy function for backwards compatibility
export async function getLiveData(parkId: string): Promise<FilteredLiveData> {
  return loadParkLiveData(parkId);
}

export async function getEntityDetails(entityId: string) {
  try {
    const res = await fetch(`${API_URL}${entityId}`);
    if (!res.ok) throw new Error("Erro ao carregar detalhes");
    return await res.json();
  } catch (error) {
    console.error('Error fetching entity details:', error);
    throw error;
  }
}

export async function getDestinations() {
  try {
    const res = await fetch(`https://api.themeparks.wiki/v1/destinations`);
    if (!res.ok) throw new Error("Erro ao carregar destinos");
    return await res.json();
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
}

export async function getEntityChildren(entityId: string) {
  try {
    const res = await fetch(`${API_URL}${entityId}/children`);
    if (!res.ok) throw new Error("Erro ao carregar filhos");
    return await res.json();
  } catch (error) {
    console.error('Error fetching entity children:', error);
    throw error;
  }
}

// Function to get daily schedule from itinerary
export function getDailySchedule(itinerary: any[]) {
  const today = new Date().toISOString().slice(0, 10);
  return itinerary
    .filter(item => {
      // If item has a date field, filter by it
      if (item.date) {
        return item.date.startsWith(today);
      }
      // Otherwise, assume it's for today
      return true;
    })
    .sort((a, b) => {
      // Sort by time if available, otherwise by addedAt
      if (a.time && b.time) {
        return a.time.localeCompare(b.time);
      }
      return (a.addedAt || 0) - (b.addedAt || 0);
    })
    .slice(0, 3);
}
