
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ItineraryItem {
  id: string;
  attractionId: string;
  attractionName: string;
  parkId: string;
  parkName: string;
  addedAt: number;
  estimatedTime?: string;
  waitTime?: number;
}

interface ItineraryContextType {
  items: ItineraryItem[];
  addToItinerary: (item: Omit<ItineraryItem, 'id' | 'addedAt'>) => void;
  removeFromItinerary: (id: string) => void;
  clearItinerary: () => void;
  isInItinerary: (attractionId: string) => boolean;
  getUpcomingItems: (limit?: number) => ItineraryItem[];
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItineraryItem[]>([]);

  const addToItinerary = (item: Omit<ItineraryItem, 'id' | 'addedAt'>) => {
    const newItem: ItineraryItem = {
      ...item,
      id: `${item.attractionId}-${Date.now()}`,
      addedAt: Date.now(),
    };
    setItems(prev => [...prev, newItem]);
    console.log('Added to itinerary:', newItem);
  };

  const removeFromItinerary = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    console.log('Removed from itinerary:', id);
  };

  const clearItinerary = () => {
    setItems([]);
    console.log('Cleared itinerary');
  };

  const isInItinerary = (attractionId: string): boolean => {
    return items.some(item => item.attractionId === attractionId);
  };

  const getUpcomingItems = (limit: number = 3): ItineraryItem[] => {
    // Sort by addedAt and return the first 'limit' items
    return [...items]
      .sort((a, b) => a.addedAt - b.addedAt)
      .slice(0, limit);
  };

  return (
    <ItineraryContext.Provider value={{
      items,
      addToItinerary,
      removeFromItinerary,
      clearItinerary,
      isInItinerary,
      getUpcomingItems,
    }}>
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary() {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
}
