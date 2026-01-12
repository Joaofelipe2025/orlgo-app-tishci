
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useItinerary } from "@/contexts/ItineraryContext";

export default function ItineraryScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { items, removeFromItinerary } = useItinerary();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleCreateItinerary = () => {
    console.log('Create new itinerary');
    router.push('/(tabs)/brands');
  };

  const handleItemPress = (item: any) => {
    console.log('Itinerary item pressed:', item.attractionName);
    router.push({
      pathname: '/(tabs)/attraction-detail',
      params: {
        attractionId: item.attractionId,
        parkId: item.parkId,
      },
    });
  };

  const handleRemoveItem = (id: string) => {
    removeFromItinerary(id);
  };

  const getWaitTimeColor = (waitTime?: number) => {
    if (!waitTime) return colors.primary;
    if (waitTime <= 20) return colors.queueGreen;
    if (waitTime <= 45) return colors.queueYellow;
    return colors.queueRed;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? colors.background : colors.background }]}>
      {/* Compact Header */}
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { fontFamily: 'Poppins_700Bold' }]}>
          Meu Roteiro
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol
              ios_icon_name="calendar"
              android_material_icon_name="event"
              size={80}
              color={colors.textSecondary}
            />
            <Text style={[styles.emptyTitle, { fontFamily: 'Poppins_700Bold' }]}>
              Seu roteiro está vazio
            </Text>
            <Text style={[styles.emptySubtitle, { fontFamily: 'Poppins_400Regular' }]}>
              Adicione atrações para começar a planejar seu dia mágico
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCreateItinerary}
            >
              <LinearGradient
                colors={[colors.secondary, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.createButton}
              >
                <IconSymbol
                  ios_icon_name="plus"
                  android_material_icon_name="add"
                  size={20}
                  color={colors.textOnDark}
                />
                <Text style={[styles.createButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>
                  Ver Parques
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_700Bold' }]}>
                {items.length} {items.length === 1 ? 'atração' : 'atrações'}
              </Text>
            </View>

            {items.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleItemPress(item)}
                >
                  <View style={[styles.itemCard, { backgroundColor: theme.dark ? colors.card : '#FFFFFF' }]}>
                    <View style={styles.itemHeader}>
                      <View style={styles.itemInfo}>
                        <Text style={[styles.itemName, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.textOnDark : colors.text }]}>
                          {item.attractionName}
                        </Text>
                        <Text style={[styles.parkName, { fontFamily: 'Poppins_400Regular', color: colors.textSecondary }]}>
                          {item.parkName}
                        </Text>
                      </View>

                      {item.waitTime !== undefined && (
                        <View style={[styles.waitTimeBadge, { backgroundColor: getWaitTimeColor(item.waitTime) }]}>
                          <IconSymbol
                            ios_icon_name="clock.fill"
                            android_material_icon_name="schedule"
                            size={14}
                            color={colors.textOnDark}
                          />
                          <Text style={[styles.waitTimeText, { fontFamily: 'Poppins_700Bold' }]}>
                            {item.waitTime} min
                          </Text>
                        </View>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveItem(item.id)}
                    >
                      <IconSymbol
                        ios_icon_name="trash"
                        android_material_icon_name="delete"
                        size={18}
                        color={colors.error}
                      />
                      <Text style={[styles.removeButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>
                        Remover
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            ))}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCreateItinerary}
              style={styles.addMoreButton}
            >
              <IconSymbol
                ios_icon_name="plus.circle"
                android_material_icon_name="add-circle"
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.addMoreText, { fontFamily: 'Poppins_600SemiBold' }]}>
                Adicionar mais atrações
              </Text>
            </TouchableOpacity>
          </>
        )}

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
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textOnDark,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 40,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    gap: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textOnDark,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  itemCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  parkName: {
    fontSize: 13,
  },
  waitTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 4,
  },
  waitTimeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textOnDark,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 77, 156, 0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginTop: 8,
  },
  addMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
