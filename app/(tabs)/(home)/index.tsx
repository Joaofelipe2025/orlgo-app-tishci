
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { brandsData } from "@/data/parksData";
import { colors, commonStyles } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 3;

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  route: string;
}

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const categories: CategoryItem[] = [
    {
      id: 'parks',
      name: 'Parques',
      icon: 'attractions',
      route: '/(tabs)/parks',
    },
    {
      id: 'attractions',
      name: 'Atrações',
      icon: 'local-activity',
      route: '/(tabs)/parks',
    },
    {
      id: 'itineraries',
      name: 'Itinerários',
      icon: 'map',
      route: '/(tabs)/itinerary',
    },
    {
      id: 'map',
      name: 'Mapa',
      icon: 'public',
      route: '/(tabs)/map',
    },
    {
      id: 'diary',
      name: 'Diário',
      icon: 'menu-book',
      route: '/(tabs)/profile',
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      icon: 'card-giftcard',
      route: '/(tabs)/profile',
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handleBrandPress = (brandId: string) => {
    console.log('Brand pressed:', brandId);
    router.push(`/(tabs)/brand-parks?brandId=${brandId}`);
  };

  const handleCategoryPress = (route: string) => {
    console.log('Category pressed:', route);
    router.push(route as any);
  };

  const handleCreateItinerary = () => {
    console.log('Create itinerary');
    router.push('/(tabs)/itinerary');
  };

  const handleAccessCommunity = () => {
    console.log('Access community');
    router.push('/(tabs)/community');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.dark ? colors.background : '#FFFFFF' }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#6A00F5', '#9A00FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoContainer}
          >
            <Text style={styles.logoText}>OrlGo</Text>
          </LinearGradient>
          <Text style={[styles.headerTitle, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
            Orlando Guide
          </Text>
          <Text style={[styles.headerSubtitle, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
            Escolha sua marca favorita
          </Text>
        </View>

        {/* Empty State Card */}
        <View style={[styles.emptyStateCard, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
          <Text style={[styles.emptyStateTitle, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
            Hoje você não tem nenhum agendamento
          </Text>
          <Text style={[styles.emptyStateSubtitle, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
            Crie um roteiro personalizado ou explore os parques disponíveis
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCreateItinerary}
          >
            <LinearGradient
              colors={['#6A00F5', '#9A00FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.createButton}
            >
              <Text style={[styles.createButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>
                Criar Roteiro
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Community Section */}
        <View style={[styles.communitySection, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
          <View style={styles.communitySectionHeader}>
            <IconSymbol
              ios_icon_name="chat"
              android_material_icon_name="chat-bubble-outline"
              size={48}
              color={colors.primary}
            />
            <Text style={[styles.communitySectionTitle, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
              Comunidade Orlando Guide
            </Text>
            <Text style={[styles.communitySectionSubtitle, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
              Veja dicas em tempo real, filas, promoções e achados dos parques e outlets
            </Text>
          </View>

          <View style={styles.communityTags}>
            {['#Fila', '#Chuva', '#Desconto', '#MagicKingdom'].map((tag, index) => (
              <React.Fragment key={index}>
                <View style={styles.communityTag}>
                  <Text style={[styles.communityTagText, { fontFamily: 'Poppins_400Regular' }]}>
                    {tag}
                  </Text>
                </View>
              </React.Fragment>
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAccessCommunity}
          >
            <LinearGradient
              colors={['#6A00F5', '#9A00FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.communityButton}
            >
              <Text style={[styles.communityButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>
                Acessar Comunidade
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={[styles.categoriesTitle, { fontFamily: 'Poppins_700Bold', color: theme.dark ? colors.text : colors.textDark }]}>
            Explore as Categorias
          </Text>

          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleCategoryPress(category.route)}
                >
                  <View style={[styles.categoryCard, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
                    <View style={styles.categoryIconContainer}>
                      <IconSymbol
                        ios_icon_name={category.icon}
                        android_material_icon_name={category.icon}
                        size={40}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={[styles.categoryName, { fontFamily: 'Poppins_600SemiBold', color: theme.dark ? colors.text : colors.textDark }]}>
                      {category.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </View>

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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#C6FF00',
    fontFamily: 'Poppins_700Bold',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  emptyStateCard: {
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  createButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  communitySection: {
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  communitySectionHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  communitySectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  communitySectionSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  communityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  communityTag: {
    backgroundColor: 'rgba(106, 0, 245, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  communityTagText: {
    fontSize: 13,
    color: colors.primary,
  },
  communityButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  communityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  categoriesTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: cardWidth,
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIconContainer: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
