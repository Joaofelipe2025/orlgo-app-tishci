
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getParkById } from '@/data/parksData';
import { loadParkLiveData, loadBuschGardensWithQueue, EnrichedEntity, BUSCH_GARDENS } from '@/services/themeParksApi';
import { IconSymbol } from '@/components/IconSymbol';
import { useItinerary } from '@/contexts/ItineraryContext';

type TabType = 'attractions' | 'restaurants' | 'shows';
type FilterType = 'all' | 'radical' | 'family' | 'kids' | 'show' | 'simulator' | 'water';

export default function ParkContentScreen() {
  const router = useRouter();
  const { parkId } = useLocalSearchParams<{ parkId: string }>();
  const { addToItinerary, isInItinerary } = useItinerary();

  const [activeTab, setActiveTab] = useState<TabType>('attractions');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [attractions, setAttractions] = useState<EnrichedEntity[]>([]);
  const [restaurants, setRestaurants] = useState<EnrichedEntity[]>([]);
  const [shows, setShows] = useState<EnrichedEntity[]>([]);
  const [error, setError] = useState<string | null>(null);

  const park = parkId ? getParkById(parkId) : null;

  // Check if this is Busch Gardens
  const isBuschGardens = park?.id === 'busch-gardens' || park?.apiEntityId === BUSCH_GARDENS.id;

  useEffect(() => {
    if (isBuschGardens) {
      // Use new function with wait times for Busch Gardens
      loadBuschGardensData();
    } else if (park?.apiEntityId) {
      // Use /live endpoint for other parks
      loadLiveData();
    } else {
      // Use mock data if no API entity ID
      loadMockData();
    }
  }, [park, isBuschGardens]);

  const loadBuschGardensData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Loading Busch Gardens data with wait times...');
      const data = await loadBuschGardensWithQueue();
      setAttractions(data.attractions);
      setRestaurants(data.restaurants);
      setShows(data.shows);
      console.log(`Loaded ${data.attractions.length} attractions, ${data.restaurants.length} restaurants, ${data.shows.length} shows`);
    } catch (err) {
      console.error('Error loading Busch Gardens data:', err);
      setError('Erro ao carregar dados. Usando dados offline.');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadLiveData = async () => {
    if (!park?.apiEntityId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await loadParkLiveData(park.apiEntityId);
      setAttractions(data.attractions);
      setRestaurants(data.restaurants);
      setShows(data.shows);
      console.log(`Loaded ${data.attractions.length} attractions, ${data.restaurants.length} restaurants, ${data.shows.length} shows`);
    } catch (err) {
      console.error('Error loading live data:', err);
      setError('Erro ao carregar dados. Usando dados offline.');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    // Mock data as fallback
    const mockAttractions: EnrichedEntity[] = [
      {
        id: 'mock-1',
        name: 'Space Mountain',
        entityType: 'ATTRACTION',
        status: 'OPERATING',
        queue: { STANDBY: { waitTime: 45 } },
        attractionStyle: ['radical', 'simulator'],
        intensity: 'high',
        summary: 'Montanha-russa no escuro com efeitos espaciais e muita emoção!',
        queueStatus: 'long',
        waitTime: 45,
      },
      {
        id: 'mock-2',
        name: 'Pirates of the Caribbean',
        entityType: 'ATTRACTION',
        status: 'OPERATING',
        queue: { STANDBY: { waitTime: 25 } },
        attractionStyle: ['family'],
        intensity: 'low',
        summary: 'Aventura aquática clássica com piratas, tesouros e canhões.',
        queueStatus: 'medium',
        waitTime: 25,
      },
      {
        id: 'mock-3',
        name: 'Haunted Mansion',
        entityType: 'ATTRACTION',
        status: 'OPERATING',
        queue: { STANDBY: { waitTime: 8 } },
        attractionStyle: ['family'],
        intensity: 'low',
        summary: 'Mansão assombrada com fantasmas divertidos e efeitos especiais.',
        queueStatus: 'short',
        waitTime: 8,
      },
      {
        id: 'mock-4',
        name: 'Dumbo the Flying Elephant',
        entityType: 'ATTRACTION',
        status: 'OPERATING',
        queue: { STANDBY: { waitTime: 15 } },
        attractionStyle: ['kids', 'family'],
        intensity: 'low',
        summary: 'Voe com o Dumbo em círculos mágicos, perfeito para os pequenos.',
        queueStatus: 'medium',
        waitTime: 15,
      },
    ];

    const mockRestaurants: EnrichedEntity[] = [
      {
        id: 'mock-r1',
        name: "Be Our Guest Restaurant",
        entityType: 'RESTAURANT',
        status: 'OPERATING',
        summary: 'Jantar no castelo da Fera com pratos franceses requintados.',
        waitTime: null,
      },
      {
        id: 'mock-r2',
        name: "Cinderella's Royal Table",
        entityType: 'RESTAURANT',
        status: 'OPERATING',
        summary: 'Refeição real no castelo da Cinderela com princesas Disney.',
        waitTime: null,
      },
    ];

    const mockShows: EnrichedEntity[] = [
      {
        id: 'mock-s1',
        name: 'Festival of Fantasy Parade',
        entityType: 'PARADE',
        status: 'OPERATING',
        attractionStyle: ['show'],
        summary: 'Desfile colorido com personagens Disney e carros alegóricos gigantes.',
        waitTime: null,
      },
      {
        id: 'mock-s2',
        name: 'Happily Ever After Fireworks',
        entityType: 'FIREWORKS',
        status: 'OPERATING',
        attractionStyle: ['show'],
        summary: 'Espetáculo de fogos com projeções no castelo e trilha emocionante.',
        waitTime: null,
      },
    ];

    setAttractions(mockAttractions);
    setRestaurants(mockRestaurants);
    setShows(mockShows);
    setLoading(false);
  };

  const handleBack = () => {
    router.back();
  };

  const handleItemPress = (item: EnrichedEntity) => {
    if (item.entityType === 'ATTRACTION') {
      router.push({
        pathname: '/(tabs)/attraction-detail',
        params: {
          attractionId: item.id,
          parkId: parkId || '',
        },
      });
    } else {
      console.log('Item pressed:', item.name);
    }
  };

  const handleAddToItinerary = (item: EnrichedEntity) => {
    if (!park) return;

    const category = item.entityType === 'ATTRACTION' ? 'ATTRACTION' : 
                     item.entityType === 'RESTAURANT' ? 'RESTAURANT' : 'SHOW';

    addToItinerary({
      attractionId: item.id,
      attractionName: item.name,
      parkId: park.id,
      parkName: park.name,
      waitTime: item.waitTime ?? undefined,
    });

    console.log('Added to itinerary:', {
      parkId: park.id,
      parkName: park.name,
      itemId: item.id,
      itemName: item.name,
      category: category,
      waitTime: item.waitTime,
    });
  };

  const getWaitTimeColor = (waitTime?: number | null) => {
    if (!waitTime) return '#10B981'; // Green for no wait
    if (waitTime <= 10) return '#10B981'; // Green
    if (waitTime <= 30) return '#F59E0B'; // Yellow/Amber
    return '#EF4444'; // Red
  };

  const getFilteredData = () => {
    let data = getCurrentTabData();
    
    if (activeFilter === 'all') {
      return data;
    }

    // Filter by keywords for non-"all" filters
    return data.filter(item => {
      const name = item.name.toLowerCase();
      
      switch (activeFilter) {
        case 'radical':
          return name.includes('coaster') || 
                 name.includes('express') || 
                 name.includes('cheetah') ||
                 name.includes('tigris') ||
                 name.includes('cobra') ||
                 name.includes('montu') ||
                 name.includes('kumba') ||
                 name.includes('sheikra') ||
                 name.includes('gwazi') ||
                 name.includes('hunt') ||
                 item.attractionStyle?.includes('radical');
        case 'family':
          return name.includes('safari') || 
                 name.includes('train') ||
                 name.includes('skyride') ||
                 name.includes('serengeti') ||
                 item.attractionStyle?.includes('family');
        case 'kids':
          return name.includes('kiddie') || 
                 name.includes('junior') ||
                 name.includes('sesame') ||
                 name.includes('elmo') ||
                 item.attractionStyle?.includes('kids');
        default:
          return item.attractionStyle?.includes(activeFilter);
      }
    });
  };

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'attractions':
        return attractions;
      case 'restaurants':
        return restaurants;
      case 'shows':
        return shows;
    }
  };

  const getFilterIcon = (filter: FilterType) => {
    switch (filter) {
      case 'radical':
        return { ios: 'bolt.fill', android: 'flash-on' };
      case 'family':
        return { ios: 'person.2.fill', android: 'people' };
      case 'kids':
        return { ios: 'figure.and.child.holdinghands', android: 'child-care' };
      case 'show':
        return { ios: 'theatermasks.fill', android: 'theater-comedy' };
      case 'simulator':
        return { ios: 'gamecontroller.fill', android: 'videogame-asset' };
      case 'water':
        return { ios: 'drop.fill', android: 'water-drop' };
      default:
        return { ios: 'square.grid.2x2', android: 'apps' };
    }
  };

  const renderItem = (item: EnrichedEntity, index: number) => {
    const inItinerary = isInItinerary(item.id);
    const waitTime = item.waitTime;

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.itemCard}>
          <View style={styles.itemContent}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              
              {/* Wait Time Badge - only for attractions with wait time */}
              {activeTab === 'attractions' && waitTime !== undefined && waitTime !== null && (
                <View style={[styles.waitTimeBadge, { backgroundColor: getWaitTimeColor(waitTime) }]}>
                  <IconSymbol
                    ios_icon_name="clock.fill"
                    android_material_icon_name="schedule"
                    size={12}
                    color="#FFFFFF"
                  />
                  <Text style={styles.waitTimeText}>{waitTime} min</Text>
                </View>
              )}

              {/* No wait time info */}
              {activeTab === 'attractions' && (waitTime === undefined || waitTime === null) && (
                <View style={styles.waitTimeBadgeMuted}>
                  <Text style={styles.waitTimeTextMuted}>sem informação</Text>
                </View>
              )}
            </View>

            {/* Summary - unique description for each attraction */}
            {item.summary && (
              <Text style={styles.itemSummary} numberOfLines={2}>
                {item.summary}
              </Text>
            )}

            {/* Attraction Styles - only for attractions tab */}
            {activeTab === 'attractions' && item.attractionStyle && item.attractionStyle.length > 0 && (
              <View style={styles.stylesContainer}>
                {item.attractionStyle.slice(0, 3).map((style, styleIndex) => (
                  <View key={styleIndex} style={styles.styleBadge}>
                    <Text style={styles.styleBadgeText}>
                      {style === 'radical' ? '🎢 Radical' :
                       style === 'family' ? '👨‍👩‍👧 Família' :
                       style === 'kids' ? '🧸 Infantil' :
                       style === 'water' ? '💧 Aquática' :
                       style === 'simulator' ? '🎮 Simulador' :
                       style === 'show' ? '🎭 Show' : style}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.addButton, inItinerary && styles.addButtonAdded]}
            onPress={() => handleAddToItinerary(item)}
            disabled={inItinerary}
          >
            <IconSymbol
              ios_icon_name={inItinerary ? "checkmark.circle.fill" : "plus.circle"}
              android_material_icon_name={inItinerary ? "check-circle" : "add-circle"}
              size={20}
              color={inItinerary ? '#10B981' : '#6A00F5'}
            />
            <Text style={[styles.addButtonText, inItinerary && styles.addButtonTextAdded]}>
              {inItinerary ? 'No Roteiro' : 'Adicionar'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (!park) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Parque não encontrado</Text>
      </View>
    );
  }

  const filteredData = getFilteredData();

  return (
    <View style={styles.container}>
      {/* Compact Header */}
      <LinearGradient
        colors={['#6A00F5', '#9A00FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{park.shortName}</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'attractions' && styles.tabActive]}
          onPress={() => setActiveTab('attractions')}
        >
          <Text style={[styles.tabText, activeTab === 'attractions' && styles.tabTextActive]}>
            Atrações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'restaurants' && styles.tabActive]}
          onPress={() => setActiveTab('restaurants')}
        >
          <Text style={[styles.tabText, activeTab === 'restaurants' && styles.tabTextActive]}>
            Restaurantes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'shows' && styles.tabActive]}
          onPress={() => setActiveTab('shows')}
        >
          <Text style={[styles.tabText, activeTab === 'shows' && styles.tabTextActive]}>
            Shows & Eventos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters (only for attractions) */}
      {activeTab === 'attractions' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {(['all', 'radical', 'family', 'kids'] as FilterType[]).map((filter, index) => {
            const icon = getFilterIcon(filter);
            return (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <IconSymbol
                    ios_icon_name={icon.ios}
                    android_material_icon_name={icon.android}
                    size={16}
                    color={activeFilter === filter ? '#FFFFFF' : '#6B7280'}
                  />
                  <Text style={[styles.filterChipText, activeFilter === filter && styles.filterChipTextActive]}>
                    {filter === 'all' ? 'Todos' : 
                     filter === 'radical' ? 'Radical' :
                     filter === 'family' ? 'Família' :
                     filter === 'kids' ? 'Infantil' : filter}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </ScrollView>
      )}

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <View style={styles.errorBanner}>
            <IconSymbol
              ios_icon_name="exclamationmark.triangle.fill"
              android_material_icon_name="warning"
              size={20}
              color="#F59E0B"
            />
            <Text style={styles.errorBannerText}>{error}</Text>
          </View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6A00F5" />
            <Text style={styles.loadingText}>
              Carregando dados do parque...
            </Text>
          </View>
        ) : (
          <>
            {filteredData.length === 0 ? (
              <View style={styles.emptyContainer}>
                <IconSymbol
                  ios_icon_name="exclamationmark.circle"
                  android_material_icon_name="info"
                  size={48}
                  color="#9CA3AF"
                />
                <Text style={styles.emptyText}>
                  Nenhum item disponível nesta categoria
                </Text>
              </View>
            ) : (
              filteredData.map((item, index) => renderItem(item, index))
            )}
          </>
        )}

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  headerPlaceholder: {
    width: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  tabActive: {
    backgroundColor: '#6A00F5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Poppins_600SemiBold',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#6A00F5',
    borderColor: '#6A00F5',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Poppins_600SemiBold',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  errorBannerText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    fontFamily: 'Poppins_400Regular',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 16,
    fontFamily: 'Poppins_400Regular',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  itemContent: {
    marginBottom: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 24,
    fontFamily: 'Poppins_700Bold',
  },
  waitTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 4,
  },
  waitTimeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  waitTimeBadgeMuted: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  waitTimeTextMuted: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Poppins_600SemiBold',
  },
  itemSummary: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
  stylesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleBadge: {
    backgroundColor: '#EDE9FE',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  styleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6A00F5',
    fontFamily: 'Poppins_600SemiBold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButtonAdded: {
    backgroundColor: '#D1FAE5',
    borderColor: '#A7F3D0',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6A00F5',
    fontFamily: 'Poppins_600SemiBold',
  },
  addButtonTextAdded: {
    color: '#10B981',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Poppins_400Regular',
  },
});
