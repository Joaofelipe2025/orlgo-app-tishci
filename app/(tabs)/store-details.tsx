
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { getStoreById } from '@/data/marketplaceData';
import { Store } from '@/types/marketplaceData';

export default function StoreDetails() {
  const router = useRouter();
  const { storeId } = useLocalSearchParams<{ storeId: string }>();
  
  const store: Store | undefined = storeId ? getStoreById(storeId) : undefined;

  if (!store) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Estabelecimento não encontrado</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const getCTALabel = () => {
    switch (store.category) {
      case 'RESTAURANT':
        return 'Obter cupom';
      case 'STORE':
      case 'OUTLET':
        return 'Ativar desconto';
      case 'SERVICE':
        return 'Saiba mais';
      default:
        return 'Ver oferta';
    }
  };

  const getCategoryLabel = () => {
    switch (store.category) {
      case 'RESTAURANT':
        return 'Restaurante';
      case 'STORE':
        return 'Loja';
      case 'OUTLET':
        return 'Outlet';
      case 'SERVICE':
        return 'Serviço';
      default:
        return '';
    }
  };

  const handleCTAPress = () => {
    console.log('CTA pressed for store:', store.name);
    // In a real app, this would activate the coupon or discount
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => router.back()}
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: store.imageUrl }} style={styles.heroImage} />
          {store.discountBadge && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>{store.discountBadge}</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{getCategoryLabel()}</Text>
          </View>

          {/* Name */}
          <Text style={styles.storeName}>{store.name}</Text>

          {/* Rating and Distance */}
          <View style={styles.infoRow}>
            <View style={styles.ratingContainer}>
              <IconSymbol
                ios_icon_name="star.fill"
                android_material_icon_name="star"
                size={20}
                color="#FFC300"
              />
              <Text style={styles.ratingText}>{store.rating}</Text>
              <Text style={styles.ratingSubtext}>avaliação</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.distanceContainer}>
              <IconSymbol
                ios_icon_name="location.fill"
                android_material_icon_name="location_on"
                size={20}
                color="#9A4DFF"
              />
              <Text style={styles.distanceText}>{store.distanceKm} km</Text>
              <Text style={styles.distanceSubtext}>de distância</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Sobre</Text>
            <Text style={styles.descriptionText}>{store.description}</Text>
          </View>

          {/* Additional Info based on category */}
          {store.category === 'RESTAURANT' && (
            <View style={styles.additionalInfo}>
              <View style={styles.infoItem}>
                <IconSymbol
                  ios_icon_name="clock.fill"
                  android_material_icon_name="schedule"
                  size={20}
                  color="#6D6D6D"
                />
                <Text style={styles.infoItemText}>Seg-Dom: 11h - 23h</Text>
              </View>
              <View style={styles.infoItem}>
                <IconSymbol
                  ios_icon_name="phone.fill"
                  android_material_icon_name="phone"
                  size={20}
                  color="#6D6D6D"
                />
                <Text style={styles.infoItemText}>(407) 123-4567</Text>
              </View>
            </View>
          )}

          {store.category === 'OUTLET' && (
            <View style={styles.additionalInfo}>
              <View style={styles.infoItem}>
                <IconSymbol
                  ios_icon_name="bag.fill"
                  android_material_icon_name="shopping_bag"
                  size={20}
                  color="#6D6D6D"
                />
                <Text style={styles.infoItemText}>160+ lojas de marca</Text>
              </View>
              <View style={styles.infoItem}>
                <IconSymbol
                  ios_icon_name="clock.fill"
                  android_material_icon_name="schedule"
                  size={20}
                  color="#6D6D6D"
                />
                <Text style={styles.infoItemText}>Seg-Sáb: 10h - 21h</Text>
              </View>
            </View>
          )}

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleCTAPress}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaButtonText}>{getCTALabel()}</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#9A4DFF',
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBackButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF3C38',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6D6D6D',
    textTransform: 'uppercase',
  },
  storeName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  ratingSubtext: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  distanceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  distanceSubtext: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6D6D6D',
    lineHeight: 24,
  },
  additionalInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoItemText: {
    fontSize: 15,
    color: '#1E1E1E',
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: '#9A4DFF',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9A4DFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 40,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#6D6D6D',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#9A4DFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
