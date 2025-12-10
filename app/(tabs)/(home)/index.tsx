
import React from "react";
import { ScrollView, StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { WeatherWidget } from "@/components/WeatherWidget";
import { DailyAgenda } from "@/components/DailyAgenda";
import { NavigationMenu } from "@/components/NavigationMenu";
import { CommunitySection } from "@/components/CommunitySection";

export default function HomeScreen() {
  const theme = useTheme();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock data for next attraction - in production, this would come from user's itinerary
  const nextAttraction = undefined; // Set to undefined to show empty state
  // Uncomment below to show with data:
  // const nextAttraction = {
  //   name: 'Space Mountain',
  //   parkName: 'Magic Kingdom',
  //   estimatedTime: '14:30',
  //   waitTime: 35,
  // };

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? colors.background : '#FFFFFF' }]}>
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
