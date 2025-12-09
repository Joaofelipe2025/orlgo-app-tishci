
import { Store, Service, CategoryChip } from '@/types/marketplaceData';

// Category Chips
export const categoryChips: CategoryChip[] = [
  {
    name: 'Restaurantes',
    icon: '🍽️',
    tag: 'restaurants',
  },
  {
    name: 'Lojas',
    icon: '🛍',
    tag: 'stores',
  },
  {
    name: 'Outlets',
    icon: '🏬',
    tag: 'outlets',
  },
  {
    name: 'Serviços',
    icon: '⭐',
    tag: 'services',
  },
];

// Featured Offers / Market Highlights
export const marketHighlights: Store[] = [
  {
    id: '1',
    name: "Camila's Restaurant",
    category: 'RESTAURANT',
    description: '10% de desconto no buffet brasileiro. Experimente os sabores autênticos do Brasil.',
    rating: 4.7,
    distanceKm: 2.1,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    discountBadge: '10% OFF',
  },
  {
    id: '2',
    name: 'The Cheesecake Factory',
    category: 'RESTAURANT',
    description: 'R$30 OFF em pedidos acima de R$150. Mais de 250 opções no cardápio.',
    rating: 4.8,
    distanceKm: 1.5,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    discountBadge: 'R$30 OFF',
  },
  {
    id: '3',
    name: 'Perfume Land',
    category: 'STORE',
    description: 'R$50 off em compras acima de R$500. A maior seleção de perfumes importados.',
    rating: 4.5,
    distanceKm: 1.8,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    discountBadge: 'R$50 OFF',
  },
  {
    id: '4',
    name: 'Orlando Premium Outlets - Vineland',
    category: 'OUTLET',
    description: 'Cupom VIP Book com descontos exclusivos em mais de 160 lojas de marca.',
    rating: 4.6,
    distanceKm: 3.2,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    discountBadge: 'VIP BOOK',
  },
];

// Restaurant Offers
export const restaurantsOffers: Store[] = [
  {
    id: '1',
    name: "Camila's Restaurant",
    category: 'RESTAURANT',
    description: '10% de desconto no buffet brasileiro. Experimente os sabores autênticos do Brasil com pratos tradicionais e ambiente acolhedor.',
    rating: 4.7,
    distanceKm: 2.1,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    discountBadge: '10% OFF',
  },
  {
    id: '5',
    name: 'Olive Garden',
    category: 'RESTAURANT',
    description: '15% OFF no almoço executivo. Massas italianas frescas e breadsticks ilimitados.',
    rating: 4.6,
    distanceKm: 2.8,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    discountBadge: '15% OFF',
  },
  {
    id: '6',
    name: 'Texas de Brazil',
    category: 'RESTAURANT',
    description: 'R$40 OFF no rodízio completo. Churrasco brasileiro premium com salad bar gourmet.',
    rating: 4.9,
    distanceKm: 3.5,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    discountBadge: 'R$40 OFF',
  },
  {
    id: '7',
    name: 'Maggiano\'s Little Italy',
    category: 'RESTAURANT',
    description: '20% OFF em jantares para grupos. Porções generosas de comida italiana caseira.',
    rating: 4.5,
    distanceKm: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800',
    discountBadge: '20% OFF',
  },
];

// Store Offers
export const storesOffers: Store[] = [
  {
    id: '3',
    name: 'Perfume Land',
    category: 'STORE',
    description: 'R$50 off em compras acima de R$500. A maior seleção de perfumes importados e cosméticos de luxo.',
    rating: 4.5,
    distanceKm: 1.8,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    discountBadge: 'R$50 OFF',
  },
  {
    id: '4',
    name: 'Orlando Premium Outlets - Vineland',
    category: 'OUTLET',
    description: 'Cupom VIP Book com descontos exclusivos em mais de 160 lojas de marca.',
    rating: 4.6,
    distanceKm: 3.2,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    discountBadge: 'VIP BOOK',
  },
  {
    id: '8',
    name: 'Nike Factory Store',
    category: 'OUTLET',
    description: '30% OFF em toda a loja. Tênis, roupas e acessórios esportivos com preços incríveis.',
    rating: 4.7,
    distanceKm: 3.0,
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800',
    discountBadge: '30% OFF',
  },
  {
    id: '9',
    name: 'Kate Spade Outlet',
    category: 'OUTLET',
    description: 'Até 70% OFF em bolsas e acessórios. Coleções anteriores com descontos imperdíveis.',
    rating: 4.4,
    distanceKm: 3.1,
    imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800',
    discountBadge: '70% OFF',
  },
];

// Services List
export const servicesList: Service[] = [
  {
    id: 's1',
    name: 'Seguro Viagem',
    description: 'Proteja sua viagem com cobertura completa. Assistência médica, bagagem e cancelamento inclusos.',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    actionLabel: 'Cotar agora',
    actionLink: 'https://www.seguroviagem.com',
  },
  {
    id: 's2',
    name: 'Ingressos',
    description: 'Compre ingressos com desconto para todos os parques de Orlando. Parceiro oficial.',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800',
    actionLabel: 'Comprar ingressos',
    actionLink: 'https://www.ingressos.com',
  },
];

// Helper function to get store by ID
export const getStoreById = (id: string): Store | undefined => {
  const allStores = [...marketHighlights, ...restaurantsOffers, ...storesOffers];
  return allStores.find(store => store.id === id);
};
