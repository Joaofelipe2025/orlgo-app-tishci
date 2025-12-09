
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

interface NearbyLocation {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
  rating: number;
}

export default function MapScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const nearbyLocations: NearbyLocation[] = [
    {
      id: '1',
      name: 'Magic Kingdom',
      distance: '2.1 km',
      travelTime: '45 min',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Universal Studios',
      distance: '15.3 km',
      travelTime: '30 min',
      rating: 4.7,
    },
    {
      id: '3',
      name: 'SeaWorld Orlando',
      distance: '12.8 km',
      travelTime: '20 min',
      rating: 4.5,
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handleLocationPress = (location: NearbyLocation) => {
    console.log('Location pressed:', location.name);
  };

  const handleNavigate = (location: NearbyLocation) => {
    console.log('Navigate to:', location.name);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? colors.background : '#FFFFFF' }]}>
      {/* Header */}
      <LinearGradient
        colors={['#6A00F5', '#9A00FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { fontFamily: 'Poppins_700Bold' }]}>
          Mapa Interativo
        </Text>
        <Text style={[styles.headerSubtitle, { fontFamily: 'Poppins_400Regular' }]}>
          Encontre parques e atrações próximas
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Placeholder */}
        <View style={[styles.mapPlaceholder, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
          <IconSymbol
            ios_icon_name="map"
            android_material_icon_name="map"
            size={64}
            color={colors.primary}
          />
          <Text style={[styles.mapTitle, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
            Mapa Interativo
          </Text>
          <Text style={[styles.mapSubtitle, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
            Visualização do mapa será implementada aqui
          </Text>
          <Text style={[styles.mapNote, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
            Nota: react-native-maps não é suportado no Natively no momento.
            {'\n'}
            Use uma alternativa web-based ou aguarde suporte futuro.
          </Text>
        </View>

        {/* Nearby Locations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
            Locais Próximos
          </Text>

          {nearbyLocations.map((location, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleLocationPress(location)}
              >
                <View style={[styles.locationCard, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
                  <View style={styles.locationInfo}>
                    <Text style={[styles.locationName, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
                      {location.name}
                    </Text>

                    <View style={styles.locationDetails}>
                      <View style={styles.detailItem}>
                        <IconSymbol
                          ios_icon_name="location"
                          android_material_icon_name="near-me"
                          size={16}
                          color={theme.dark ? '#999' : '#666'}
                        />
                        <Text style={[styles.detailText, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                          {location.distance}
                        </Text>
                      </View>

                      <View style={styles.detailItem}>
                        <IconSymbol
                          ios_icon_name="clock"
                          android_material_icon_name="schedule"
                          size={16}
                          color={theme.dark ? '#999' : '#666'}
                        />
                        <Text style={[styles.detailText, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                          {location.travelTime}
                        </Text>
                      </View>

                      <View style={styles.detailItem}>
                        <IconSymbol
                          ios_icon_name="star"
                          android_material_icon_name="star"
                          size={16}
                          color="#FFC300"
                        />
                        <Text style={[styles.detailText, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                          {location.rating}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleNavigate(location)}
                    style={styles.navigateButton}
                  >
                    <View style={styles.navigateButtonInner}>
                      <IconSymbol
                        ios_icon_name="navigation"
                        android_material_icon_name="navigation"
                        size={24}
                        color="#FFFFFF"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 60 : 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  scrollContent: {
    padding: 16,
  },
  mapPlaceholder: {
    borderRadius: 18,
    padding: 48,
    alignItems: 'center',
    marginBottom: 24,
    minHeight: 280,
    justifyContent: 'center',
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  mapSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  mapNote: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  locationCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  locationDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  navigateButton: {
    marginLeft: 12,
  },
  navigateButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
});
