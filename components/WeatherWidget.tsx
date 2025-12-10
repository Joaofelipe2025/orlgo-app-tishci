
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

interface WeatherData {
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  icon: string;
  forecast: {
    time: string;
    temp: number;
    condition: string;
  }[];
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set personalized greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Bom dia, Explorador!');
    } else if (hour < 18) {
      setGreeting('Boa tarde, Aventureiro!');
    } else {
      setGreeting('Boa noite, Viajante!');
    }

    // Mock weather data for Orlando
    // In production, you would fetch from a weather API
    setTimeout(() => {
      setWeather({
        temperature: 75,
        condition: 'Parcialmente nublado',
        feelsLike: 78,
        humidity: 65,
        icon: 'partly-sunny',
        forecast: [
          { time: '12:00', temp: 77, condition: 'sunny' },
          { time: '15:00', temp: 79, condition: 'partly-sunny' },
          { time: '18:00', temp: 73, condition: 'cloudy' },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  const celsiusTemp = Math.round((weather?.temperature || 0 - 32) * 5 / 9);
  const celsiusFeelsLike = Math.round((weather?.feelsLike || 0 - 32) * 5 / 9);

  if (loading) {
    return (
      <LinearGradient
        colors={['#6A00F5', '#9A00FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#6A00F5', '#9A00FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Greeting */}
      <Text style={styles.greeting}>{greeting}</Text>
      
      {/* Location */}
      <View style={styles.locationRow}>
        <IconSymbol
          ios_icon_name="location.fill"
          android_material_icon_name="location-on"
          size={16}
          color="#FFFFFF"
        />
        <Text style={styles.location}>Orlando, FL</Text>
      </View>

      {/* Main Weather */}
      <View style={styles.mainWeather}>
        <View style={styles.weatherLeft}>
          <IconSymbol
            ios_icon_name="cloud.sun.fill"
            android_material_icon_name="wb-cloudy"
            size={64}
            color="#FFFFFF"
          />
        </View>
        
        <View style={styles.weatherRight}>
          <View style={styles.tempRow}>
            <Text style={styles.temperature}>{weather?.temperature}°F</Text>
            <Text style={styles.temperatureCelsius}>({celsiusTemp}°C)</Text>
          </View>
          <Text style={styles.condition}>{weather?.condition}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detail}>Sensação {weather?.feelsLike}°F ({celsiusFeelsLike}°C)</Text>
            <Text style={styles.detail}>Umidade {weather?.humidity}%</Text>
          </View>
        </View>
      </View>

      {/* Forecast */}
      <View style={styles.forecast}>
        {weather?.forecast.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.forecastItem}>
              <Text style={styles.forecastTime}>{item.time}</Text>
              <IconSymbol
                ios_icon_name="sun.max.fill"
                android_material_icon_name="wb-sunny"
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.forecastTemp}>{item.temp}°</Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 6,
  },
  location: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  mainWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  weatherLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherRight: {
    flex: 1,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  temperatureCelsius: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft: 8,
    opacity: 0.8,
    fontFamily: 'Poppins_400Regular',
  },
  condition: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Poppins_400Regular',
  },
  detailsRow: {
    gap: 8,
  },
  detail: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: 'Poppins_400Regular',
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  forecastItem: {
    alignItems: 'center',
    gap: 6,
  },
  forecastTime: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: 'Poppins_400Regular',
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
  },
});
