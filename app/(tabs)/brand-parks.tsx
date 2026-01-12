
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
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
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      {/* Compact Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={24}
            color={colors.primary}
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
      </View>

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
                <View style={styles.parkOverlay}>
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
                        color={colors.white}
                      />
                    </View>
                  </View>
                </View>
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
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    color: colors.primaryText,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  scrollContent: {
    padding: 16,
  },
  parkCard: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    height: 280,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  parkImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  parkOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  parkInfo: {
    padding: 20,
  },
  parkName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 8,
  },
  parkDescription: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: 16,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginRight: 8,
  },
});
