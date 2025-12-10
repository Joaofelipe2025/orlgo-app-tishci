
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
import { getEntityDetails } from '@/services/themeParksApi';
import { getParkById } from '@/data/parksData';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useItinerary } from '@/contexts/ItineraryContext';

export default function AttractionDetailScreen() {
  const router = useRouter();
  const { attractionId, parkId } = useLocalSearchParams<{ attractionId: string; parkId: string }>();
  const { addToItinerary, isInItinerary } = useItinerary();

  const [loading, setLoading] = useState(true);
  const [attraction, setAttraction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const park = parkId ? getParkById(parkId) : null;
  const inItinerary = attractionId ? isInItinerary(attractionId) : false;

  useEffect(() => {
    if (attractionId) {
      loadAttractionDetails();
    }
  }, [attractionId]);

  const loadAttractionDetails = async () => {
    if (!attractionId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getEntityDetails(attractionId);
      setAttraction(data);
    } catch (err) {
      console.error('Error loading attraction details:', err);
      setError('Erro ao carregar detalhes');
      // Use mock data as fallback
      setAttraction({
        id: attractionId,
        name: 'Atração',
        status: 'OPERATING',
        queue: { STANDBY: { waitTime: 30 } },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleAddToItinerary = () => {
    if (!attraction || !park || inItinerary) return;

    addToItinerary({
      attractionId: attraction.id,
      attractionName: attraction.name,
      parkId: park.id,
      parkName: park.name,
      waitTime: attraction.queue?.STANDBY?.waitTime,
    });
  };

  const getWaitTimeColor = (waitTime?: number) => {
    if (!waitTime) return colors.primary;
    if (waitTime <= 20) return colors.queueGreen;
    if (waitTime <= 45) return colors.queueYellow;
    return colors.queueRed;
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'OPERATING':
        return 'Operando';
      case 'DOWN':
        return 'Fora de operação';
      case 'CLOSED':
        return 'Fechado';
      default:
        return 'Status desconhecido';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'OPERATING':
        return colors.queueGreen;
      case 'DOWN':
        return colors.queueRed;
      case 'CLOSED':
        return '#999';
      default:
        return '#999';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
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
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </View>
    );
  }

  if (!attraction) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Atração não encontrada</Text>
      </View>
    );
  }

  const waitTime = attraction.queue?.STANDBY?.waitTime;

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
          <Text style={styles.headerTitle}>Detalhes</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
            style={styles.heroGradient}
          >
            <Text style={styles.attractionName}>{attraction.name}</Text>
          </LinearGradient>
        </View>

        {/* Info Cards */}
        <View style={styles.content}>
          {/* Status and Wait Time */}
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Status</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(attraction.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(attraction.status) }]}>
                  {getStatusText(attraction.status)}
                </Text>
              </View>
            </View>

            {waitTime !== undefined && (
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Tempo de Fila</Text>
                <View style={[styles.waitTimeContainer, { backgroundColor: getWaitTimeColor(waitTime) }]}>
                  <IconSymbol
                    ios_icon_name="clock.fill"
                    android_material_icon_name="schedule"
                    size={20}
                    color={colors.textDark}
                  />
                  <Text style={styles.waitTimeValue}>{waitTime} min</Text>
                </View>
              </View>
            )}
          </View>

          {/* Description */}
          {park && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Parque</Text>
              <Text style={styles.parkName}>{park.name}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            <Text style={styles.description}>
              {attraction.description || 'Viva uma experiência inesquecível nesta atração incrível! Prepare-se para momentos de diversão e emoção.'}
            </Text>
          </View>

          {/* Additional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações</Text>
            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <IconSymbol
                  ios_icon_name="person.2.fill"
                  android_material_icon_name="people"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.infoItemText}>Adequado para toda a família</Text>
              </View>
              <View style={styles.infoItem}>
                <IconSymbol
                  ios_icon_name="camera.fill"
                  android_material_icon_name="photo-camera"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.infoItemText}>Fotos permitidas</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Fixed Add Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAddToItinerary}
          disabled={inItinerary}
        >
          <LinearGradient
            colors={inItinerary ? ['rgba(198, 255, 0, 0.3)', 'rgba(198, 255, 0, 0.3)'] : ['#C6FF00', '#A8E600']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButton}
          >
            <IconSymbol
              ios_icon_name={inItinerary ? "checkmark.circle.fill" : "plus.circle.fill"}
              android_material_icon_name={inItinerary ? "check-circle" : "add-circle"}
              size={24}
              color={inItinerary ? colors.queueGreen : colors.textDark}
            />
            <Text style={[styles.addButtonText, inItinerary && styles.addButtonTextAdded]}>
              {inItinerary ? 'Já está no Roteiro' : 'Adicionar ao Meu Roteiro'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    marginTop: 16,
    fontFamily: 'Poppins_400Regular',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroContainer: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  attractionName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent,
    fontFamily: 'Poppins_700Bold',
  },
  content: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    fontFamily: 'Poppins_400Regular',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  waitTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  waitTimeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: 'Poppins_700Bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'Poppins_700Bold',
  },
  parkName: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: 'Poppins_600SemiBold',
  },
  description: {
    fontSize: 15,
    color: '#999',
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoItemText: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'Poppins_400Regular',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#C6FF00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: 'Poppins_700Bold',
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
