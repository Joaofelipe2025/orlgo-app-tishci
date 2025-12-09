
import { Brand, Park, Attraction } from '@/types/parkData';

export const brandsData: Brand[] = [
  {
    id: 'disney',
    name: 'Disney',
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    color: '#6A00F5',
    parks: [
      {
        id: 'magic-kingdom',
        brandId: 'disney',
        name: 'Magic Kingdom',
        shortName: 'Magic Kingdom',
        description: 'O parque mais icônico da Disney, onde os sonhos se tornam realidade!',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        apiEntityId: '75ea578a-adc8-4116-a54d-dccb60765ef9',
        attractions: [],
      },
      {
        id: 'epcot',
        brandId: 'disney',
        name: 'EPCOT',
        shortName: 'EPCOT',
        description: 'Explore o futuro e culturas do mundo todo em um só lugar!',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
        apiEntityId: '47f90d2c-e191-4239-a466-5892ef59a88b',
        attractions: [],
      },
      {
        id: 'hollywood-studios',
        brandId: 'disney',
        name: "Hollywood Studios",
        shortName: 'Hollywood Studios',
        description: 'Viva a magia do cinema e das séries mais famosas!',
        image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800',
        apiEntityId: '288747d1-8b4f-4a64-867e-ea7c9b27bad8',
        attractions: [],
      },
      {
        id: 'animal-kingdom',
        brandId: 'disney',
        name: 'Animal Kingdom',
        shortName: 'Animal Kingdom',
        description: 'Aventuras selvagens e a magia da natureza!',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
        apiEntityId: '1c84a229-8862-4648-9c71-378ddd2c7693',
        attractions: [],
      },
    ],
  },
  {
    id: 'universal',
    name: 'Universal',
    logo: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400',
    color: '#9A00FF',
    parks: [
      {
        id: 'epic-universe',
        brandId: 'universal',
        name: 'Epic Universe',
        shortName: 'Epic Universe',
        description: 'O mais novo e épico parque da Universal!',
        image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800',
        attractions: [],
      },
      {
        id: 'universal-studios',
        brandId: 'universal',
        name: 'Universal Studios Florida',
        shortName: 'USF',
        description: 'Viva as aventuras dos seus filmes favoritos!',
        image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800',
        apiEntityId: 'eb3f4560-2383-4a36-9152-6b3e5ed6bc57',
        attractions: [],
      },
      {
        id: 'islands-of-adventure',
        brandId: 'universal',
        name: 'Islands of Adventure',
        shortName: 'IOA',
        description: 'Ilhas repletas de aventuras emocionantes!',
        image: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=800',
        apiEntityId: '267615cc-8943-4c2a-ae2c-5da728ca591f',
        attractions: [],
      },
      {
        id: 'volcano-bay',
        brandId: 'universal',
        name: 'Volcano Bay',
        shortName: 'Volcano Bay',
        description: 'Parque aquático tropical com muita diversão!',
        image: 'https://images.unsplash.com/photo-1561133988-001f59fba1f6?w=800',
        apiEntityId: 'fe78a026-b91b-470c-b906-9d2266b692da',
        attractions: [],
      },
    ],
  },
  {
    id: 'seaworld',
    name: 'SeaWorld',
    logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    color: '#C6FF00',
    parks: [
      {
        id: 'seaworld-orlando',
        brandId: 'seaworld',
        name: 'SeaWorld Orlando',
        shortName: 'SeaWorld',
        description: 'Vida marinha e montanhas-russas incríveis!',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        attractions: [],
      },
      {
        id: 'aquatica',
        brandId: 'seaworld',
        name: 'Aquatica',
        shortName: 'Aquatica',
        description: 'Parque aquático com toboáguas emocionantes!',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        attractions: [],
      },
      {
        id: 'busch-gardens',
        brandId: 'seaworld',
        name: 'Busch Gardens Tampa',
        shortName: 'Busch Gardens',
        description: 'Aventuras africanas e montanhas-russas radicais!',
        image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800',
        attractions: [],
      },
    ],
  },
  {
    id: 'legoland',
    name: 'LEGOLAND',
    logo: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400',
    color: '#FFC300',
    parks: [
      {
        id: 'legoland-florida',
        brandId: 'legoland',
        name: 'LEGOLAND Florida',
        shortName: 'LEGOLAND',
        description: 'Diversão em blocos para toda a família!',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
        attractions: [],
      },
    ],
  },
];

// Sample attractions for demonstration
export const sampleAttractions: Attraction[] = [
  {
    id: 'space-mountain',
    parkId: 'magic-kingdom',
    name: 'Space Mountain',
    description: 'Montanha-russa no escuro pelo espaço sideral!',
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600',
    type: ['radical', 'simulator'],
    intensity: 'high',
    minHeight: 112,
    accessible: false,
    waitTime: 45,
    status: 'operating',
  },
  {
    id: 'pirates-caribbean',
    parkId: 'magic-kingdom',
    name: 'Pirates of the Caribbean',
    description: 'Navegue com os piratas mais famosos dos mares!',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
    type: ['family'],
    intensity: 'low',
    accessible: true,
    waitTime: 25,
    status: 'operating',
  },
  {
    id: 'haunted-mansion',
    parkId: 'magic-kingdom',
    name: 'Haunted Mansion',
    description: 'Uma mansão assombrada cheia de fantasmas divertidos!',
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600',
    type: ['family'],
    intensity: 'low',
    accessible: true,
    waitTime: 30,
    status: 'operating',
  },
  {
    id: 'splash-mountain',
    parkId: 'magic-kingdom',
    name: 'Splash Mountain',
    description: 'Aventura aquática com uma queda emocionante!',
    image: 'https://images.unsplash.com/photo-1561133988-001f59fba1f6?w=600',
    type: ['family', 'water'],
    intensity: 'medium',
    minHeight: 102,
    accessible: false,
    waitTime: 55,
    status: 'operating',
  },
  {
    id: 'dumbo',
    parkId: 'magic-kingdom',
    name: 'Dumbo the Flying Elephant',
    description: 'Voe com o elefante mais fofo da Disney!',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    type: ['kids', 'family'],
    intensity: 'low',
    accessible: true,
    waitTime: 15,
    status: 'operating',
  },
  {
    id: 'festival-of-fantasy',
    parkId: 'magic-kingdom',
    name: 'Festival of Fantasy Parade',
    description: 'Desfile mágico com personagens Disney!',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    type: ['show'],
    intensity: 'low',
    accessible: true,
    waitTime: 0,
    status: 'operating',
  },
];

// Add sample attractions to Magic Kingdom
brandsData[0].parks[0].attractions = sampleAttractions;

export function getBrandById(id: string): Brand | undefined {
  return brandsData.find(brand => brand.id === id);
}

export function getParkById(parkId: string): Park | undefined {
  for (const brand of brandsData) {
    const park = brand.parks.find(p => p.id === parkId);
    if (park) return park;
  }
  return undefined;
}

export function getAttractionById(attractionId: string): Attraction | undefined {
  for (const brand of brandsData) {
    for (const park of brand.parks) {
      const attraction = park.attractions.find(a => a.id === attractionId);
      if (attraction) return attraction;
    }
  }
  return undefined;
}
