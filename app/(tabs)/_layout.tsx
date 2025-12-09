
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'location',
      route: '/(tabs)/parks',
      icon: 'place',
      label: 'Parques',
    },
    {
      name: 'marketplace',
      route: '/(tabs)/marketplace',
      icon: 'local-offer',
      label: 'Ofertas',
    },
    {
      name: 'calendar',
      route: '/(tabs)/itinerary',
      icon: 'event',
      label: 'Roteiros',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person',
      label: 'Perfil',
    },
  ];

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none', // Remove fade animation to prevent black screen flash
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="parks" name="parks" />
        <Stack.Screen key="marketplace" name="marketplace" />
        <Stack.Screen key="store-details" name="store-details" />
        <Stack.Screen key="itinerary" name="itinerary" />
        <Stack.Screen key="profile" name="profile" />
        <Stack.Screen key="brand-parks" name="brand-parks" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={380} />
    </>
  );
}
