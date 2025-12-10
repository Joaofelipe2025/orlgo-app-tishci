
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  color: string;
}

export function NavigationMenu() {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      id: 'parks',
      label: 'Parques & Atrações',
      icon: 'attractions',
      route: '/(tabs)/parks',
      color: '#6A00F5',
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: 'shopping-bag',
      route: '/(tabs)/marketplace',
      color: '#9A00FF',
    },
    {
      id: 'food',
      label: 'Alimentação',
      icon: 'restaurant',
      route: '/(tabs)/marketplace',
      color: '#C6FF00',
    },
    {
      id: 'shows',
      label: 'Shows & Eventos',
      icon: 'theater-comedy',
      route: '/(tabs)/parks',
      color: '#FF3C38',
    },
    {
      id: 'parking',
      label: 'Estacionamento & GPS',
      icon: 'local-parking',
      route: '/(tabs)/map',
      color: '#FFC300',
    },
    {
      id: 'favorites',
      label: 'Favoritos',
      icon: 'favorite',
      route: '/(tabs)/profile',
      color: '#FF1493',
    },
  ];

  const handlePress = (route: string) => {
    console.log('Navigate to:', route);
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore o App</Text>
      
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <AnimatedMenuItem
              item={item}
              index={index}
              onPress={() => handlePress(item.route)}
            />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

interface AnimatedMenuItemProps {
  item: MenuItem;
  index: number;
  onPress: () => void;
}

function AnimatedMenuItem({ item, index, onPress }: AnimatedMenuItemProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 100,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        delay: index * 100,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, scaleAnim, opacityAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.menuItemWrapper,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
            <IconSymbol
              ios_icon_name={item.icon}
              android_material_icon_name={item.icon}
              size={36}
              color={item.color}
            />
          </View>
          <Text style={styles.menuLabel}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'Poppins_700Bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  menuItemWrapper: {
    width: '48%',
  },
  menuItem: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    minHeight: 140,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
});
