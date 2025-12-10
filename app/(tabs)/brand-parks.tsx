
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getBrandById } from "@/data/parksData";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function BrandParksScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { brandId } = useLocalSearchParams<{ brandId: string }>();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const brand = brandId ? getBrandById(brandId) : null;

  if (!fontsLoaded || !brand) {
    return null;
  }

  const handleParkPress = (parkId: string) => {
    console.log('Park pressed:', parkId);
    router.push({
      pathname: '/(tabs)/park-content',
      params: { parkId },
    });
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? '#F9FAFB' : '#FFFFFF' }]}>
      {/* Compact Header with white text */}
      <LinearGradient
        colors={['#6A00F5', '#9A00FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { fontFamily: 'Poppins_700Bold' }]}>
            {brand.name}
          </Text>
          <Text style={[styles.headerSubtitle, { fontFamily: 'Poppins_400Regular' }]}>
            Escolha seu parque
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Parks List */}
        {brand.parks.map((park, index) => (
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
                    <Text style={[styles.parkDescription, { fontFamily: 'Poppins_400Regular' }]}>
                      {park.description}
                    </Text>
                    <View style={styles.ctaButton}>
                      <Text style={[styles.ctaButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>
                        Ver atrações
                      </Text>
                      <IconSymbol
                        ios_icon_name="chevron.right"
                        android_material_icon_name="chevron-right"
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}

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
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 12,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  scrollContent: {
    padding: 16,
  },
  parkCard: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    height: 280,
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
  parkName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  parkDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#6A00F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
});
