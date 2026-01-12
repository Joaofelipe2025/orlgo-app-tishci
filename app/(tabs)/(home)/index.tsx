
import React from "react";
import { ScrollView, StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { WeatherWidget } from "@/components/WeatherWidget";
import { DailyAgenda } from "@/components/DailyAgenda";
import { NavigationMenu } from "@/components/NavigationMenu";
import { CommunitySection } from "@/components/CommunitySection";
import { useItinerary } from "@/contexts/ItineraryContext";

export default function HomeScreen() {
  const theme = useTheme();
  const { getUpcomingItems } = useItinerary();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Get the next attraction from itinerary
  const upcomingItems = getUpcomingItems(1);
  const nextAttraction = upcomingItems.length > 0 ? {
    name: upcomingItems[0].attractionName,
    parkName: upcomingItems[0].parkName,
    estimatedTime: upcomingItems[0].estimatedTime || '14:30',
    waitTime: upcomingItems[0].waitTime || 30,
  } : undefined;

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? colors.background : colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dynamic Header with Weather */}
        <WeatherWidget />

        {/* Daily Agenda */}
        <DailyAgenda nextAttraction={nextAttraction} />

        {/* Navigation Menu */}
        <NavigationMenu />

        {/* Community Section */}
        <CommunitySection />

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
    paddingTop: Platform.OS === 'android' ? 60 : 60,
    paddingHorizontal: 16,
  },
});
