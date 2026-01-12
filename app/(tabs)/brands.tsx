
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { brandsData } from '@/data/parksData';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function BrandsScreen() {
  const router = useRouter();

  const handleBrandPress = (brandId: string) => {
    console.log('Brand pressed:', brandId);
    router.push({
      pathname: '/(tabs)/brand-parks',
      params: { brandId },
    });
  };

  return (
    <View style={styles.container}>
      {/* Compact Header with white text */}
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Parques</Text>
        <Text style={styles.headerSubtitle}>Escolha sua marca favorita</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brands Grid */}
        <View style={styles.brandsGrid}>
          {brandsData.map((brand, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleBrandPress(brand.id)}
                style={styles.brandCardWrapper}
              >
                <View style={styles.brandCard}>
                  <Image
                    source={{ uri: brand.logo }}
                    style={styles.brandImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                    style={styles.brandGradient}
                  >
                    <View style={styles.brandInfo}>
                      <Text style={styles.brandName}>{brand.name}</Text>
                      <View style={styles.parksCount}>
                        <IconSymbol
                          ios_icon_name="building.2.fill"
                          android_material_icon_name="domain"
                          size={16}
                          color="#FFFFFF"
                        />
                        <Text style={styles.parksCountText}>
                          {brand.parks.length} {brand.parks.length === 1 ? 'parque' : 'parques'}
                        </Text>
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
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textOnDark,
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textOnDark,
    opacity: 0.9,
    fontFamily: 'Poppins_400Regular',
  },
  scrollContent: {
    padding: 16,
  },
  brandsGrid: {
    gap: 16,
  },
  brandCardWrapper: {
    marginBottom: 16,
  },
  brandCard: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  brandImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  brandGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  brandInfo: {
    padding: 20,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textOnDark,
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  parksCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  parksCountText: {
    fontSize: 14,
    color: colors.textOnDark,
    fontFamily: 'Poppins_600SemiBold',
  },
});
