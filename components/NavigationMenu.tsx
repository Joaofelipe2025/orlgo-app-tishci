
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

export function NavigationMenu() {
  const router = useRouter();

  const menuItems = [
    {
      id: 'parks',
      icon: 'rollercoaster',
      androidIcon: 'attractions',
      label: 'Parques',
      route: '/(tabs)/brands',
      gradient: ['#6A00F5', '#9A00FF'],
    },
    {
      id: 'marketplace',
      icon: 'bag.fill',
      androidIcon: 'shopping-bag',
      label: 'Marketplace',
      route: '/(tabs)/marketplace',
      gradient: ['#9A00FF', '#C026D3'],
    },
    {
      id: 'food',
      icon: 'fork.knife',
      androidIcon: 'restaurant',
      label: 'Alimentação',
      route: '/(tabs)/marketplace',
      gradient: ['#C026D3', '#D946EF'],
    },
    {
      id: 'shows',
      icon: 'theatermasks.fill',
      androidIcon: 'theater-comedy',
      label: 'Shows',
      route: '/(tabs)/parks',
      gradient: ['#D946EF', '#E879F9'],
    },
    {
      id: 'parking',
      icon: 'car.fill',
      androidIcon: 'local-parking',
      label: 'Estacionamento',
      route: '/(tabs)/map',
      gradient: ['#E879F9', '#F0ABFC'],
    },
    {
      id: 'favorites',
      icon: 'heart.fill',
      androidIcon: 'favorite',
      label: 'Favoritos',
      route: '/(tabs)/itinerary',
      gradient: ['#F0ABFC', '#FCA5A5'],
    },
  ];

  const handlePress = (route: string) => {
    console.log('Navigate to:', route);
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handlePress(item.route)}
              style={styles.itemWrapper}
            >
              <LinearGradient
                colors={item.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.item}
              >
                <View style={styles.iconContainer}>
                  <IconSymbol
                    ios_icon_name={item.icon}
                    android_material_icon_name={item.androidIcon}
                    size={32}
                    color="#FFFFFF"
                  />
                </View>
              </LinearGradient>
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'Poppins_700Bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  itemWrapper: {
    width: '30%',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
});
