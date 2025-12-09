
import React from 'react';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  return (
    <NativeTabs
      backBehavior="history"
      ignoreTopSafeArea="never"
      tabBarActiveTintColor={colors.primary}
    >
      <NativeTabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              ios_icon_name="house.fill"
              android_material_icon_name="home"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <NativeTabs.Screen
        name="parks"
        options={{
          title: 'Parques',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              ios_icon_name="map.fill"
              android_material_icon_name="place"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <NativeTabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              ios_icon_name="map.fill"
              android_material_icon_name="map"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <NativeTabs.Screen
        name="itinerary"
        options={{
          title: 'Roteiros',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              ios_icon_name="calendar"
              android_material_icon_name="event"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <NativeTabs.Screen
        name="community"
        options={{
          title: 'Comunidade',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              ios_icon_name="bubble.left.and.bubble.right.fill"
              android_material_icon_name="chat-bubble-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <NativeTabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              ios_icon_name="person.fill"
              android_material_icon_name="person"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <NativeTabs.Screen
        name="brand-parks"
        options={{
          href: null,
        }}
      />
    </NativeTabs>
  );
}
