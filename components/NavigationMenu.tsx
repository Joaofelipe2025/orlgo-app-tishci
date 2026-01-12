
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

export function NavigationMenu() {
  const router = useRouter();

  const menuItems = [
    {
      id: 'parks',
      icon: 'attractions',
      label: 'Parques',
      route: '/(tabs)/brands',
    },
    {
      id: 'marketplace',
      icon: 'shopping-bag',
      label: 'Marketplace',
      route: '/(tabs)/marketplace',
    },
    {
      id: 'food',
      icon: 'restaurant',
      label: 'Alimentação',
      route: '/(tabs)/marketplace',
    },
    {
      id: 'shows',
      icon: 'theater-comedy',
      label: 'Shows',
      route: '/(tabs)/parks',
    },
    {
      id: 'parking',
      icon: 'local-parking',
      label: 'Estacionamento',
      route: '/(tabs)/map',
    },
    {
      id: 'favorites',
      icon: 'favorite',
      label: 'Favoritos',
      route: '/(tabs)/itinerary',
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
              <View style={styles.item}>
                <View style={styles.iconContainer}>
                  <IconSymbol
                    ios_icon_name={item.icon}
                    android_material_icon_name={item.icon}
                    size={32}
                    color={colors.primary}
                  />
                </View>
              </View>
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
    color: colors.primaryText,
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
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryText,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
});
