
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getParkById } from '@/data/parksData';
import { getLiveData, LiveEntity } from '@/services/themeParksApi';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useItinerary } from '@/contexts/ItineraryContext';

type TabType = 'attractions' | 'restaurants' | 'shows';

export default function ParkContentScreen() {
  const router = useRouter();
  const { parkId } = useLocalSearchParams<{ parkId: string }>();
  const { addToItinerary, isInItinerary } = useItinerary();

  const [activeTab, setActiveTab] = useState<TabType>('attractions');
  const [loading, setLoading] = useState(true);
  const [attractions, setAttractions] = useState<LiveEntity[]>([]);
  const [restaurants, setRestaurants] = useState<LiveEntity[]>([]);
  const [shows, setShows] = useState<LiveEntity[]>([]);
  const [error, setError] = useState<string | null>(null);

  const park = parkId ? getParkById(parkId) : null;

  useEffect(() => {
    if (park?.apiEntityId) {
      loadLiveData();
    } else {
      // Use mock data if no API entity ID
      loadMockData();
    }
  }, [park]);

  const loadLiveData = async () => {
    if (!park?.apiEntityId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getLiveData(park.apiEntityId);
      setAttractions(data.attractions);
      setRestaurants(data.restaurants);
      setShows(data.shows);
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
    const mockAttractions: LiveEntity[] = [
      {
        id: 'mock-1',
        name: 'Space Mountain',
        entityType: 'ATTRACTION',
        status: 'OPERATING',
        queue: { STANDBY: { waitTime: 45 } },
      },
      {
        id: 'mock-2',
        name: 'Pirates of the Caribbean',
        entityType: 'ATTRACTION',
        status: 'OPERATING',
        queue: { STANDBY: { waitTime: 25 } },
      },
      {
        id: 'mock-3',
        name: 'Haunted Mansion',
        entityType: 'ATTRACTION',
        status: 'OPERATING',
        queue: { STANDBY: { waitTime: 30 } },
      },
    ];

    const mockRestaurants: LiveEntity[] = [
      {
        id: 'mock-r1',
        name: "Be Our Guest Restaurant",
        entityType: 'RESTAURANT',
        status: 'OPERATING',
      },
      {
        id: 'mock-r2',
        name: "Cinderella's Royal Table",
        entityType: 'RESTAURANT',
        status: 'OPERATING',
      },
    ];

    const mockShows: LiveEntity[] = [
      {
        id: 'mock-s1',
        name: 'Festival of Fantasy Parade',
        entityType: 'SHOW',
        status: 'OPERATING',
      },
      {
        id: 'mock-s2',
        name: 'Happily Ever After Fireworks',
        entityType: 'SHOW',
        status: 'OPERATING',
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

  const handleItemPress = (item: LiveEntity) => {
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

  const handleAddToItinerary = (item: LiveEntity) => {
    if (!park) return;

    addToItinerary({
      attractionId: item.id,
      attractionName: item.name,
      parkId: park.id,
      parkName: park.name,
      waitTime: item.queue?.STANDBY?.waitTime,
    });
  };

  const getWaitTimeColor = (waitTime?: number) => {
    if (!waitTime) return colors.primary;
    if (waitTime <= 20) return colors.queueGreen;
    if (waitTime <= 45) return colors.queueYellow;
    return colors.queueRed;
  };

  const renderItem = (item: LiveEntity) => {
    const inItinerary = isInItinerary(item.id);
    const waitTime = item.queue?.STANDBY?.waitTime;

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.8}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              {item.status && (
                <Text style={[
                  styles.itemStatus,
                  item.status === 'OPERATING' && styles.itemStatusOperating,
                  item.status === 'DOWN' && styles.itemStatusDown,
                  item.status === 'CLOSED' && styles.itemStatusClosed,
                ]}>
                  {item.status === 'OPERATING' ? 'Operando' : item.status === 'DOWN' ? 'Fora de operação' : 'Fechado'}
                </Text>
              )}
            </View>

            {waitTime !== undefined && (
              <View style={[styles.waitTimeBadge, { backgroundColor: getWaitTimeColor(waitTime) }]}>
                <IconSymbol
                  ios_icon_name="clock.fill"
                  android_material_icon_name="schedule"
                  size={14}
                  color={colors.textDark}
                />
                <Text style={styles.waitTimeText}>{waitTime} min</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.addButton, inItinerary && styles.addButtonAdded]}
            onPress={() => handleAddToItinerary(item)}
            disabled={inItinerary}
          >
            <IconSymbol
              ios_icon_name={inItinerary ? "checkmark" : "plus"}
              android_material_icon_name={inItinerary ? "check" : "add"}
              size={16}
              color={inItinerary ? colors.queueGreen : colors.textDark}
            />
            <Text style={[styles.addButtonText, inItinerary && styles.addButtonTextAdded]}>
              {inItinerary ? 'No Roteiro' : 'Adicionar ao Roteiro'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
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

  if (!park) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Parque não encontrado</Text>
      </View>
    );
  }

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
              color={colors.queueYellow}
            />
            <Text style={styles.errorBannerText}>{error}</Text>
          </View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Carregando dados ao vivo...</Text>
          </View>
        ) : (
          <>
            {getCurrentTabData().length === 0 ? (
              <View style={styles.emptyContainer}>
                <IconSymbol
                  ios_icon_name="exclamationmark.circle"
                  android_material_icon_name="info"
                  size={48}
                  color="#999"
                />
                <Text style={styles.emptyText}>
                  Nenhum item disponível nesta categoria
                </Text>
              </View>
            ) : (
              getCurrentTabData().map(item => renderItem(item))
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    fontFamily: 'Poppins_600SemiBold',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 195, 0, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  errorBannerText: {
    flex: 1,
    fontSize: 13,
    color: colors.queueYellow,
    fontFamily: 'Poppins_400Regular',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
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
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  itemCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  itemStatus: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  itemStatusOperating: {
    color: colors.queueGreen,
  },
  itemStatusDown: {
    color: colors.queueRed,
  },
  itemStatusClosed: {
    color: '#999',
  },
  waitTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 4,
  },
  waitTimeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: 'Poppins_700Bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 6,
  },
  addButtonAdded: {
    backgroundColor: 'rgba(198, 255, 0, 0.2)',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    fontFamily: 'Poppins_600SemiBold',
  },
  addButtonTextAdded: {
    color: colors.queueGreen,
  },
  errorText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Poppins_400Regular',
  },
});
