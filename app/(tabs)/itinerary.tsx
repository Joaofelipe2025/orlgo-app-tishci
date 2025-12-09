
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

interface ItineraryItem {
  id: string;
  name: string;
  createdBy: string;
  duration: string;
  attractions: number;
  createdDate: string;
}

export default function ItineraryScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [activeTab, setActiveTab] = useState<'suggested' | 'my'>('my');

  const myItineraries: ItineraryItem[] = [
    {
      id: '1',
      name: 'Meu Roteiro Personalizado',
      createdBy: 'Criado por você',
      duration: '1 dia',
      attractions: 0,
      createdDate: 'Criado em 15 de jan.',
    },
  ];

  const suggestedItineraries: ItineraryItem[] = [
    {
      id: 's1',
      name: 'Dia Mágico no Magic Kingdom',
      createdBy: 'Sugerido por OrlGo',
      duration: '1 dia',
      attractions: 12,
      createdDate: 'Atualizado hoje',
    },
    {
      id: 's2',
      name: 'Aventura Universal',
      createdBy: 'Sugerido por OrlGo',
      duration: '1 dia',
      attractions: 10,
      createdDate: 'Atualizado hoje',
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handleCreateItinerary = () => {
    console.log('Create new itinerary');
  };

  const handleCreateWithAI = () => {
    console.log('Create itinerary with AI');
  };

  const handleItineraryPress = (itinerary: ItineraryItem) => {
    console.log('Itinerary pressed:', itinerary.name);
  };

  const currentItineraries = activeTab === 'my' ? myItineraries : suggestedItineraries;

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? colors.background : '#FFFFFF' }]}>
      {/* Header */}
      <LinearGradient
        colors={['#6A00F5', '#9A00FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { fontFamily: 'Poppins_700Bold' }]}>
          Roteiros
        </Text>
        <Text style={[styles.headerSubtitle, { fontFamily: 'Poppins_400Regular' }]}>
          Planeje sua visita perfeita
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Create Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCreateWithAI}
          style={styles.aiButton}
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiButtonGradient}
          >
            <IconSymbol
              ios_icon_name="sparkles"
              android_material_icon_name="auto-awesome"
              size={24}
              color="#FFFFFF"
            />
            <Text style={[styles.aiButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>
              Criar com IA
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('suggested')}
            style={[
              styles.tab,
              activeTab === 'suggested' && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { fontFamily: 'Poppins_600SemiBold' },
                activeTab === 'suggested' && styles.tabTextActive,
              ]}
            >
              Sugeridos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('my')}
            style={[
              styles.tab,
              activeTab === 'my' && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { fontFamily: 'Poppins_600SemiBold' },
                activeTab === 'my' && styles.tabTextActive,
              ]}
            >
              Meus Roteiros
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_700Bold' }]}>
            Meus Roteiros
          </Text>
          <TouchableOpacity onPress={handleCreateItinerary}>
            <View style={styles.addButton}>
              <IconSymbol
                ios_icon_name="plus"
                android_material_icon_name="add"
                size={28}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Itineraries List */}
        {currentItineraries.map((itinerary, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleItineraryPress(itinerary)}
            >
              <View style={[styles.itineraryCard, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
                <View style={styles.itineraryHeader}>
                  <Text style={[styles.itineraryName, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
                    {itinerary.name}
                  </Text>
                  <Text style={[styles.itineraryCreator, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                    {itinerary.createdBy}
                  </Text>
                </View>

                <View style={styles.itineraryDetails}>
                  <View style={styles.detailItem}>
                    <IconSymbol
                      ios_icon_name="clock"
                      android_material_icon_name="schedule"
                      size={16}
                      color={theme.dark ? '#999' : '#666'}
                    />
                    <Text style={[styles.detailText, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                      {itinerary.duration}
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <IconSymbol
                      ios_icon_name="location"
                      android_material_icon_name="place"
                      size={16}
                      color={theme.dark ? '#999' : '#666'}
                    />
                    <Text style={[styles.detailText, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                      {itinerary.attractions} atrações
                    </Text>
                  </View>

                  <Text style={[styles.detailText, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666', fontStyle: 'italic' }]}>
                    {itinerary.createdDate}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}

        {/* Create New Itinerary Card */}
        {activeTab === 'my' && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCreateItinerary}
          >
            <View style={[styles.createCard, { borderColor: theme.dark ? colors.primary : '#E0E0E0' }]}>
              <IconSymbol
                ios_icon_name="plus.circle"
                android_material_icon_name="add-circle"
                size={48}
                color={colors.primary}
              />
              <Text style={[styles.createTitle, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
                Criar Novo Roteiro
              </Text>
              <Text style={[styles.createSubtitle, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                Monte seu roteiro personalizado
              </Text>
            </View>
          </TouchableOpacity>
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
    paddingTop: Platform.OS === 'android' ? 60 : 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  scrollContent: {
    padding: 16,
  },
  aiButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  aiButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
  },
  aiButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'rgba(106, 0, 245, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  itineraryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itineraryHeader: {
    marginBottom: 12,
  },
  itineraryName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  itineraryCreator: {
    fontSize: 14,
  },
  itineraryDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  createCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  createTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
  },
  createSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
