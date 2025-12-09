
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

interface ShortWaitAttraction {
  name: string;
  park: string;
  waitTime: number;
  status: 'short' | 'medium' | 'long';
}

interface FeaturedPark {
  id: string;
  name: string;
  brand: string;
  location: string;
  status: 'open' | 'closed';
  image: string;
}

export default function ParksScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const shortWaitAttractions: ShortWaitAttraction[] = [
    {
      name: "it's a small world",
      park: 'Magic Kingdom',
      waitTime: 14,
      status: 'short',
    },
    {
      name: 'E.T. Adventure',
      park: 'Universal Studios Fl...',
      waitTime: 14,
      status: 'short',
    },
    {
      name: 'Kraken',
      park: 'SeaWorld',
      waitTime: 16,
      status: 'short',
    },
  ];

  const featuredParks: FeaturedPark[] = [
    {
      id: 'magic-kingdom',
      name: 'Magic Kingdom',
      brand: 'Disney',
      location: 'Orlando',
      status: 'open',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    },
    {
      id: 'epcot',
      name: 'EPCOT',
      brand: 'Disney',
      location: 'Orlando',
      status: 'open',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handleViewAll = () => {
    console.log('View all short wait attractions');
  };

  const handleParkPress = (parkId: string) => {
    console.log('Park pressed:', parkId);
    router.push(`/(tabs)/park-detail?parkId=${parkId}`);
  };

  const getWaitTimeColor = (status: ShortWaitAttraction['status']) => {
    switch (status) {
      case 'short':
        return colors.queueGreen;
      case 'medium':
        return colors.queueYellow;
      case 'long':
        return colors.queueRed;
    }
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
          Parques
        </Text>
        <Text style={[styles.headerSubtitle, { fontFamily: 'Poppins_400Regular' }]}>
          Explore os melhores parques temáticos de Orlando
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Short Wait Times Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <IconSymbol
                ios_icon_name="clock"
                android_material_icon_name="schedule"
                size={24}
                color={theme.dark ? colors.text : colors.textDark}
              />
              <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
                Menores Filas Agora
              </Text>
            </View>
            <TouchableOpacity onPress={handleViewAll}>
              <Text style={[styles.viewAllButton, { fontFamily: 'Poppins_600SemiBold' }]}>
                Ver Tudo
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.updateText, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
            Atualizado: Agora mesmo
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {shortWaitAttractions.map((attraction, index) => (
              <React.Fragment key={index}>
                <View style={[styles.waitCard, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
                  <Text style={[styles.attractionName, { fontFamily: 'Poppins_600SemiBold', color: theme.dark ? colors.text : colors.textDark }]}>
                    {attraction.name}
                  </Text>
                  <Text style={[styles.parkName, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                    {attraction.park}
                  </Text>
                  <View style={styles.waitTimeContainer}>
                    <IconSymbol
                      ios_icon_name="arrow-down"
                      android_material_icon_name="trending-down"
                      size={16}
                      color={getWaitTimeColor(attraction.status)}
                    />
                    <Text style={[styles.waitTime, { fontFamily: 'Poppins_700Bold', color: getWaitTimeColor(attraction.status) }]}>
                      {attraction.waitTime} min
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        {/* Featured Parks */}
        <View style={styles.section}>
          {featuredParks.map((park, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleParkPress(park.id)}
              >
                <View style={styles.parkCard}>
                  <Image
                    source={{ uri: park.image }}
                    style={styles.parkImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.parkGradient}
                  >
                    <View style={styles.parkInfo}>
                      <Text style={[styles.parkName, { fontFamily: 'Poppins_700Bold' }]}>
                        {park.name}
                      </Text>
                      <Text style={[styles.parkBrand, { fontFamily: 'Poppins_400Regular' }]}>
                        {park.brand}
                      </Text>
                      <View style={styles.parkFooter}>
                        <Text style={[styles.parkLocation, { fontFamily: 'Poppins_400Regular' }]}>
                          {park.location}
                        </Text>
                        <View style={[styles.statusBadge, { backgroundColor: park.status === 'open' ? colors.queueGreen : colors.queueRed }]}>
                          <Text style={[styles.statusText, { fontFamily: 'Poppins_600SemiBold' }]}>
                            {park.status === 'open' ? 'Aberto' : 'Fechado'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
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
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  viewAllButton: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  updateText: {
    fontSize: 12,
    marginBottom: 16,
  },
  horizontalScroll: {
    gap: 12,
    paddingRight: 16,
  },
  waitCard: {
    width: 160,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  attractionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  parkName: {
    fontSize: 12,
    marginBottom: 12,
  },
  waitTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  waitTime: {
    fontSize: 16,
    fontWeight: '700',
  },
  parkCard: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    height: 240,
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  parkImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  parkGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  parkInfo: {
    padding: 20,
  },
  parkBrand: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 12,
  },
  parkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parkLocation: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDark,
  },
});
