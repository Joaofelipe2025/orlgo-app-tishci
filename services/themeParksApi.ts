
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

export interface ChildEntity {
  id: string;
  name: string;
  entityType: 'ATTRACTION' | 'RESTAURANT' | 'SHOW' | 'ENTERTAINMENT' | 'PARADE' | 'FIREWORKS';
  externalId?: string;
}

export interface EnrichedEntity extends LiveEntity {
  attractionStyle?: string[];
  intensity?: 'low' | 'medium' | 'high';
  summary?: string;
  queueStatus?: 'short' | 'medium' | 'long';
  waitTime?: number | null;
  queueTime?: number | null;
  externalId?: string;
}

export interface LiveDataResponse {
  liveData: {
    entities: LiveEntity[];
  };
}

export interface ChildrenResponse {
  children: ChildEntity[];
}

export interface FilteredLiveData {
  attractions: EnrichedEntity[];
  restaurants: EnrichedEntity[];
  shows: EnrichedEntity[];
}

// Busch Gardens Configuration
export const BUSCH_GARDENS = {
  id: "fc40c99a-be0a-42f4-a483-1e939db275c2",
  name: "Busch Gardens Tampa",
  brand: "SeaWorld Parks",
  timezone: "America/New_York"
};

export const BUSCH_GARDENS_ID = "fc40c99a-be0a-42f4-a483-1e939db275c2";
export const THEMEPARKS_API = "https://api.themeparks.wiki/v1/entity";

// Function to determine attraction style based on name and type
function determineAttractionStyle(entity: LiveEntity | ChildEntity): string[] {
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
    name.includes('splash') ||
    name.includes('cheetah') ||
    name.includes('tigris') ||
    name.includes('cobra') ||
    name.includes('montu') ||
    name.includes('kumba') ||
    name.includes('sheikra') ||
    name.includes('falcon') ||
    name.includes('phoenix') ||
    name.includes('hunt') ||
    name.includes('iron gwazi') ||
    name.includes('gwazi')
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
    name.includes('buzz') ||
    name.includes('train') ||
    name.includes('skyride') ||
    name.includes('serengeti') ||
    name.includes('express')
  ) {
    styles.push('family');
  }

  // Kids rides
  if (
    name.includes('dumbo') ||
    name.includes('carousel') ||
    name.includes('barnstormer') ||
    name.includes('carpet') ||
    name.includes('tea') ||
    name.includes('kiddie') ||
    name.includes('junior') ||
    name.includes('sesame') ||
    name.includes('elmo') ||
    name.includes('cookie') ||
    name.includes('air grover')
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
    name.includes('simulator') ||
    name.includes('battle')
  ) {
    styles.push('simulator');
  }

  // Water rides
  if (
    name.includes('splash') ||
    name.includes('rapids') ||
    name.includes('kali') ||
    name.includes('water') ||
    name.includes('flume') ||
    name.includes('river') ||
    name.includes('congo')
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

// Function to generate unique, context-aware descriptions for each attraction
function generateSummary(entity: LiveEntity | ChildEntity, styles: string[]): string {
  const name = entity.name.toLowerCase();

  // Restaurants
  if (entity.entityType === 'RESTAURANT') {
    if (name.includes('zambia') || name.includes('smokehouse')) {
      return 'Sabores defumados e pratos fartos em ambiente temático africano.';
    }
    if (name.includes('dragon') || name.includes('fire')) {
      return 'Culinária asiática com pratos saborosos e ambiente acolhedor.';
    }
    if (name.includes('garden') || name.includes('oasis')) {
      return 'Refeições leves e refrescantes em meio a jardins tropicais.';
    }
    if (name.includes('grill') || name.includes('bbq')) {
      return 'Carnes grelhadas e especialidades americanas para toda família.';
    }
    return 'Deliciosas opções gastronômicas para recarregar as energias.';
  }

  // Shows and Entertainment
  if (entity.entityType === 'SHOW' || entity.entityType === 'ENTERTAINMENT') {
    if (name.includes('ice') || name.includes('skating')) {
      return 'Espetáculo no gelo com acrobacias e coreografias impressionantes.';
    }
    if (name.includes('animal') || name.includes('bird') || name.includes('wildlife')) {
      return 'Apresentação educativa com animais exóticos e seus cuidadores.';
    }
    if (name.includes('music') || name.includes('concert')) {
      return 'Show musical ao vivo com performances energéticas e envolventes.';
    }
    return 'Apresentação ao vivo repleta de entretenimento e momentos especiais.';
  }

  if (entity.entityType === 'PARADE') {
    return 'Desfile colorido com personagens, música e muita alegria.';
  }

  if (entity.entityType === 'FIREWORKS') {
    return 'Espetáculo pirotécnico que ilumina o céu com cores vibrantes.';
  }

  // Specific Busch Gardens attractions
  if (name.includes('iron gwazi') || name.includes('gwazi')) {
    return 'Montanha-russa híbrida mais alta e rápida da América do Norte! Pura adrenalina.';
  }

  if (name.includes('sheikra')) {
    return 'Queda livre de 61 metros em 90 graus! Uma das mais radicais do mundo.';
  }

  if (name.includes('montu')) {
    return 'Montanha-russa invertida com loops intensos e velocidade extrema.';
  }

  if (name.includes('kumba')) {
    return 'Clássica montanha-russa com loops gigantes e força G impressionante.';
  }

  if (name.includes('cheetah hunt')) {
    return 'Acelere como um guepardo em trilhos que cortam o parque em alta velocidade.';
  }

  if (name.includes('tigris')) {
    return 'Montanha-russa de lançamento com looping invertido e muita emoção.';
  }

  if (name.includes('cobra')) {
    return 'Giros e inversões em uma montanha-russa compacta e intensa.';
  }

  if (name.includes('falcon')) {
    return 'Voo livre com asas delta simulando o voo de um falcão sobre o parque.';
  }

  if (name.includes('phoenix')) {
    return 'Torre de queda livre com vistas panorâmicas antes da descida emocionante.';
  }

  if (name.includes('serengeti') && name.includes('safari')) {
    return 'Safari autêntico com girafas, zebras e rinocerontes em habitat natural.';
  }

  if (name.includes('skyride')) {
    return 'Teleférico panorâmico com vistas aéreas incríveis do parque e animais.';
  }

  if (name.includes('congo river')) {
    return 'Descida de corredeiras que molha bastante! Perfeita para dias quentes.';
  }

  if (name.includes('stanley falls')) {
    return 'Aventura aquática com quedas refrescantes em meio à floresta tropical.';
  }

  if (name.includes('sesame') || name.includes('elmo') || name.includes('cookie')) {
    return 'Diversão garantida para os pequenos com personagens da Vila Sésamo.';
  }

  if (name.includes('air grover')) {
    return 'Montanha-russa infantil perfeita para a primeira experiência radical.';
  }

  if (name.includes('train') && styles.includes('family')) {
    return 'Passeio relaxante de trem com vistas dos animais e paisagens do parque.';
  }

  if (name.includes('carousel')) {
    return 'Carrossel clássico com cavalos decorados, ideal para toda a família.';
  }

  // Generic descriptions based on style
  if (styles.includes('radical')) {
    if (name.includes('coaster')) {
      return 'Montanha-russa eletrizante com loops, quedas e velocidade de tirar o fôlego.';
    }
    if (name.includes('tower') || name.includes('drop')) {
      return 'Torre de queda livre com adrenalina pura e vistas espetaculares.';
    }
    return 'Atração radical repleta de emoção, velocidade e momentos intensos.';
  }

  if (styles.includes('simulator')) {
    return 'Simulador imersivo com efeitos especiais e aventura cinematográfica.';
  }

  if (styles.includes('water')) {
    return 'Atração aquática refrescante que molha e diverte em dias quentes.';
  }

  if (styles.includes('kids')) {
    return 'Atração segura e divertida, perfeita para crianças pequenas e famílias.';
  }

  if (styles.includes('family')) {
    return 'Experiência encantadora que agrada visitantes de todas as idades.';
  }

  return 'Atração imperdível com diversão e entretenimento para todos.';
}

// Function to determine queue status based on wait time
function getQueueStatus(waitTime?: number | null): 'short' | 'medium' | 'long' {
  if (!waitTime) return 'short';
  if (waitTime <= 10) return 'short';
  if (waitTime <= 30) return 'medium';
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
    waitTime: waitTime ?? null,
    queueTime: waitTime ?? null,
  };
}

// Enrich child entity (from /children endpoint)
function enrichChildEntity(entity: ChildEntity, waitTime?: number | null): EnrichedEntity {
  const styles = determineAttractionStyle(entity);
  const intensity = determineIntensity(styles);
  const summary = generateSummary(entity, styles);

  return {
    ...entity,
    status: 'OPERATING',
    attractionStyle: styles,
    intensity,
    summary,
    queueStatus: getQueueStatus(waitTime),
    waitTime: waitTime ?? null,
    queueTime: waitTime ?? null,
  };
}

// NEW IMPROVED FUNCTION: Load Busch Gardens with Queue Times (ROBUST VERSION WITH EXTERNAL ID SUPPORT)
export async function loadBuschGardensWithQueue(): Promise<FilteredLiveData> {
  try {
    // 1) CHILDREN: base de atrações / restaurantes / shows
    const childrenRes = await fetch(
      `${THEMEPARKS_API}/${BUSCH_GARDENS_ID}/children`
    );
    if (!childrenRes.ok) throw new Error("Erro CHILDREN: " + childrenRes.status);
    const childrenJson: ChildrenResponse = await childrenRes.json();
    const children = childrenJson.children || [];

    console.log(`Loaded ${children.length} children for Busch Gardens`);

    // 2) LIVE: tempos de fila
    const liveRes = await fetch(
      `${THEMEPARKS_API}/${BUSCH_GARDENS_ID}/live`
    );
    if (!liveRes.ok) throw new Error("Erro LIVE: " + liveRes.status);
    const liveJson: any = await liveRes.json();

    const liveDataArray = Array.isArray(liveJson.liveData)
      ? liveJson.liveData
      : liveJson.liveData
      ? [liveJson.liveData]
      : [];

    console.log(`liveData is ${Array.isArray(liveJson.liveData) ? 'array' : 'object'}, normalized to ${liveDataArray.length} items`);

    const liveEntities = liveDataArray.flatMap((ld: any) => ld.entities || []);

    console.log(`Loaded ${liveEntities.length} live entities for Busch Gardens`);

    // 3) Mapas de fila: por id/entityId e por externalId
    const waitTimeById: Record<string, number> = {};
    const waitTimeByExternalId: Record<string, number> = {};

    liveEntities.forEach((e: any) => {
      const standby = e.queue?.STANDBY;
      if (!standby || typeof standby.waitTime !== "number") return;

      const minutes = standby.waitTime;
      const entityId = e.id || e.entityId;
      const externalId = e.externalId;

      if (entityId) {
        waitTimeById[entityId] = minutes;
        console.log(`Found wait time for ${entityId}: ${minutes} min`);
      }
      if (externalId) {
        waitTimeByExternalId[externalId] = minutes;
        console.log(`Found wait time for externalId ${externalId}: ${minutes} min`);
      }
    });

    console.log(`Found wait times for ${Object.keys(waitTimeById).length} attractions by ID`);
    console.log(`Found wait times for ${Object.keys(waitTimeByExternalId).length} attractions by externalId`);

    // 4) Anexar waitTime/queueTime a cada item
    const attachWaitTime = (item: ChildEntity): EnrichedEntity => {
      const byId = waitTimeById[item.id];
      const byExternal = item.externalId
        ? waitTimeByExternalId[item.externalId]
        : null;

      const waitTime =
        typeof byId === "number"
          ? byId
          : typeof byExternal === "number"
          ? byExternal
          : null;

      if (waitTime !== null) {
        console.log(`Matched wait time for ${item.name}: ${waitTime} min (by ${byId !== undefined ? 'id' : 'externalId'})`);
      }

      return {
        ...enrichChildEntity(item, waitTime),
        waitTime,          // pra gente usar
        queueTime: waitTime, // pra bater com componentes que esperem outro nome
      };
    };

    const attractions = children
      .filter((c) => c.entityType === "ATTRACTION")
      .map(attachWaitTime);

    const restaurants = children
      .filter((c) => c.entityType === "RESTAURANT")
      .map(attachWaitTime);

    const shows = children
      .filter((c) => c.entityType === "SHOW")
      .map(attachWaitTime);

    console.log(`Processed: ${attractions.length} attractions, ${restaurants.length} restaurants, ${shows.length} shows`);

    return { attractions, restaurants, shows };
  } catch (error) {
    console.log("Erro Busch Gardens:", error);
    return { attractions: [], restaurants: [], shows: [] };
  }
}

// Legacy function - kept for backwards compatibility
export async function loadBuschGardensContent(): Promise<FilteredLiveData> {
  return loadBuschGardensWithQueue();
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
