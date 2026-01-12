
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import {
  marketHighlights,
  restaurantsOffers,
  storesOffers,
  servicesList,
  categoryChips,
} from '@/data/marketplaceData';
import { Store, Service } from '@/types/marketplaceData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const CARD_MARGIN = 12;

export default function MarketplaceHome() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleStorePress = (storeId: string) => {
    router.push({
      pathname: '/(tabs)/store-details',
      params: { storeId },
    });
  };

  const handleServicePress = (service: Service) => {
    console.log('Service pressed:', service.name);
    // In a real app, this would open a web browser or navigate to service details
  };

  const renderCategoryChips = () => (
    <View style={styles.categoryContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {categoryChips.map((chip, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              selectedCategory === chip.tag && styles.categoryChipActive,
            ]}
            onPress={() =>
              setSelectedCategory(selectedCategory === chip.tag ? null : chip.tag)
            }
          >
            <Text style={styles.categoryIcon}>{chip.icon}</Text>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === chip.tag && styles.categoryTextActive,
              ]}
            >
              {chip.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFeaturedCard = (store: Store, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.featuredCard}
      onPress={() => handleStorePress(store.id)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: store.imageUrl }} style={styles.featuredImage} />
      {store.discountBadge && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>{store.discountBadge}</Text>
        </View>
      )}
      <View style={styles.featuredCardContent}>
        <Text style={styles.featuredCardTitle}>{store.name}</Text>
        <Text style={styles.featuredCardDescription} numberOfLines={2}>
          {store.description}
        </Text>
        <View style={styles.featuredCardFooter}>
          <View style={styles.ratingContainer}>
            <IconSymbol
              ios_icon_name="star.fill"
              android_material_icon_name="star"
              size={16}
              color={colors.accent}
            />
            <Text style={styles.ratingText}>{store.rating}</Text>
          </View>
          <Text style={styles.distanceText}>{store.distanceKm} km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCouponCard = (store: Store, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.couponCard}
      onPress={() => handleStorePress(store.id)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: store.imageUrl }} style={styles.couponImage} />
      {store.discountBadge && (
        <View style={styles.couponDiscountBadge}>
          <Text style={styles.discountBadgeText}>{store.discountBadge}</Text>
        </View>
      )}
      <View style={styles.couponCardContent}>
        <Text style={styles.couponCardTitle}>{store.name}</Text>
        <Text style={styles.couponCardDescription} numberOfLines={2}>
          {store.description}
        </Text>
        <View style={styles.couponCardFooter}>
          <View style={styles.ratingContainer}>
            <IconSymbol
              ios_icon_name="star.fill"
              android_material_icon_name="star"
              size={14}
              color={colors.accent}
            />
            <Text style={styles.couponRatingText}>{store.rating}</Text>
          </View>
          <Text style={styles.couponDistanceText}>{store.distanceKm} km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderServiceCard = (service: Service, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.serviceCard}
      onPress={() => handleServicePress(service)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: service.imageUrl }} style={styles.serviceImage} />
      <View style={styles.serviceCardContent}>
        <Text style={styles.serviceCardTitle}>{service.name}</Text>
        <Text style={styles.serviceCardDescription} numberOfLines={2}>
          {service.description}
        </Text>
        <View style={styles.serviceButtonContainer}>
          <View style={styles.serviceButton}>
            <Text style={styles.serviceButtonText}>{service.actionLabel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Compact Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marketplace</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <IconSymbol
              ios_icon_name="magnifyingglass"
              android_material_icon_name="search"
              size={20}
              color={colors.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cupons, lojas ou restaurantes..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <IconSymbol
              ios_icon_name="line.3.horizontal.decrease.circle"
              android_material_icon_name="filter_list"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Category Chips */}
        {renderCategoryChips()}

        {/* Featured Offers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ofertas em Destaque</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollContent}
            snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
            decelerationRate="fast"
          >
            {marketHighlights.map((store, index) => renderFeaturedCard(store, index))}
          </ScrollView>
        </View>

        {/* Restaurant Coupons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cupons em Restaurantes</Text>
          <View style={styles.couponGrid}>
            {restaurantsOffers.map((store, index) => renderCouponCard(store, index))}
          </View>
        </View>

        {/* Store Coupons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cupons em Lojas</Text>
          <View style={styles.couponGrid}>
            {storesOffers.map((store, index) => renderCouponCard(store, index))}
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviços</Text>
          {servicesList.map((service, index) => renderServiceCard(service, index))}
        </View>

        {/* Bottom Padding for Tab Bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.secondary,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  categoryScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryTextActive: {
    color: colors.textOnDark,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featuredScrollContent: {
    paddingHorizontal: 20,
    gap: CARD_MARGIN * 2,
  },
  featuredCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.backgroundSecondary,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountBadgeText: {
    color: colors.textOnDark,
    fontSize: 12,
    fontWeight: '700',
  },
  featuredCardContent: {
    padding: 16,
  },
  featuredCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  featuredCardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  featuredCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  distanceText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  couponGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  couponCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  couponImage: {
    width: 120,
    height: 120,
    backgroundColor: colors.backgroundSecondary,
  },
  couponDiscountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  couponCardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  couponCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  couponCardDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 8,
  },
  couponCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  couponRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  couponDistanceText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  serviceImage: {
    width: 120,
    height: 140,
    backgroundColor: colors.backgroundSecondary,
  },
  serviceCardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  serviceCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  serviceCardDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  serviceButtonContainer: {
    alignItems: 'flex-start',
  },
  serviceButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  serviceButtonText: {
    color: colors.textOnDark,
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});
