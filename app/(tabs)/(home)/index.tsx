
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { brandsData } from "@/data/parksData";
import { colors, commonStyles } from "@/styles/commonStyles";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleBrandPress = (brandId: string) => {
    console.log('Brand pressed:', brandId);
    router.push(`/(tabs)/brand-parks?brandId=${brandId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? colors.background : '#FFFFFF' }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#6A00F5', '#9A00FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoContainer}
          >
            <Text style={styles.logoText}>OrlGo</Text>
          </LinearGradient>
          <Text style={[styles.headerTitle, { fontFamily: 'Poppins_700Bold' }]}>
            Orlando Guide
          </Text>
          <Text style={[styles.headerSubtitle, { fontFamily: 'Poppins_400Regular' }]}>
            Escolha sua marca favorita
          </Text>
        </View>

        {/* Brands Grid */}
        <View style={styles.brandsGrid}>
          {brandsData.map((brand, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleBrandPress(brand.id)}
              >
                <LinearGradient
                  colors={['#6A00F5', '#9A00FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.brandCard, { width: cardWidth }]}
                >
                  <View style={styles.brandImageContainer}>
                    <Image
                      source={{ uri: brand.logo }}
                      style={styles.brandImage}
                      resizeMode="cover"
                    />
                    <View style={styles.brandOverlay} />
                  </View>
                  <View style={styles.brandNameContainer}>
                    <Text style={[styles.brandName, { fontFamily: 'Poppins_700Bold' }]}>
                      {brand.name}
                    </Text>
                    <Text style={[styles.parkCount, { fontFamily: 'Poppins_400Regular' }]}>
                      {brand.parks.length} {brand.parks.length === 1 ? 'parque' : 'parques'}
                    </Text>
                  </View>
                </LinearGradient>
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
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#C6FF00',
    fontFamily: 'Poppins_700Bold',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#999',
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brandCard: {
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  brandImageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  brandImage: {
    width: '100%',
    height: '100%',
  },
  brandOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(106, 0, 245, 0.3)',
  },
  brandNameContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#C6FF00',
    marginBottom: 4,
  },
  parkCount: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
