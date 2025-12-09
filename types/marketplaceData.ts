
// Marketplace Data Models

export type StoreCategory = "RESTAURANT" | "STORE" | "OUTLET" | "SERVICE";

export interface Store {
  id: string;
  name: string;
  category: StoreCategory;
  description: string;
  rating: number;
  distanceKm: number;
  imageUrl: string;
  discountBadge?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  actionLabel: string;
  actionLink?: string;
}

export interface CategoryChip {
  name: string;
  icon: string;
  tag: string;
}
