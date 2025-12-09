
export interface Brand {
  id: string;
  name: string;
  logo: string;
  color: string;
  parks: Park[];
}

export interface Park {
  id: string;
  brandId: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  apiEntityId?: string;
  attractions: Attraction[];
}

export interface Attraction {
  id: string;
  parkId: string;
  name: string;
  description: string;
  image: string;
  type: AttractionType[];
  intensity: 'low' | 'medium' | 'high';
  minHeight?: number;
  minAge?: number;
  accessible: boolean;
  waitTime?: number;
  status?: 'operating' | 'closed' | 'down';
}

export type AttractionType = 
  | 'radical'
  | 'family'
  | 'kids'
  | 'show'
  | 'simulator'
  | 'water';

export interface ItineraryItem {
  attraction: Attraction;
  park: Park;
  addedAt: number;
  order: number;
}

export type QueueStatus = 'short' | 'medium' | 'long';

export function getQueueStatus(waitTime: number): QueueStatus {
  if (waitTime <= 20) return 'short';
  if (waitTime <= 45) return 'medium';
  return 'long';
}

export function getQueueColor(status: QueueStatus): string {
  switch (status) {
    case 'short':
      return '#C6FF00';
    case 'medium':
      return '#FFC300';
    case 'long':
      return '#FF3C38';
  }
}
