
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

interface NextAttraction {
  name: string;
  parkName: string;
  estimatedTime: string;
  waitTime: number;
}

interface DailyAgendaProps {
  nextAttraction?: NextAttraction;
}

export function DailyAgenda({ nextAttraction }: DailyAgendaProps) {
  const router = useRouter();

  const getWaitTimeColor = (waitTime: number) => {
    if (waitTime <= 20) return colors.queueGreen;
    if (waitTime <= 45) return colors.queueYellow;
    return colors.queueRed;
  };

  const handleViewItinerary = () => {
    console.log('Navigate to itinerary');
    router.push('/(tabs)/itinerary');
  };

  const handleAddAttractions = () => {
    console.log('Navigate to parks');
    router.push('/(tabs)/parks');
  };

  if (!nextAttraction) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <View style={styles.emptyIconContainer}>
          <IconSymbol
            ios_icon_name="calendar"
            android_material_icon_name="event"
            size={48}
            color={colors.primary}
          />
        </View>
        
        <Text style={styles.emptyTitle}>Comece montando seu dia mágico ✨</Text>
        <Text style={styles.emptySubtitle}>
          Adicione atrações ao seu roteiro para ver sua agenda aqui
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAddAttractions}
          style={styles.addButton}
        >
          <IconSymbol
            ios_icon_name="plus"
            android_material_icon_name="add"
            size={20}
            color={colors.white}
          />
          <Text style={styles.addButtonText}>Adicionar Atrações</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Próxima Atração</Text>
        <TouchableOpacity onPress={handleViewItinerary}>
          <Text style={styles.viewAllText}>Ver roteiro completo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.attractionCard}>
        <View style={styles.attractionHeader}>
          <View style={styles.attractionInfo}>
            <Text style={styles.attractionName}>{nextAttraction.name}</Text>
            <Text style={styles.parkName}>{nextAttraction.parkName}</Text>
          </View>
          
          <View style={[styles.waitTimeBadge, { backgroundColor: getWaitTimeColor(nextAttraction.waitTime) }]}>
            <IconSymbol
              ios_icon_name="clock.fill"
              android_material_icon_name="schedule"
              size={16}
              color={colors.white}
            />
            <Text style={styles.waitTimeText}>{nextAttraction.waitTime} min</Text>
          </View>
        </View>

        <View style={styles.timeRow}>
          <IconSymbol
            ios_icon_name="clock"
            android_material_icon_name="access-time"
            size={18}
            color={colors.primary}
          />
          <Text style={styles.estimatedTime}>Horário estimado: {nextAttraction.estimatedTime}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleViewItinerary}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Ver Roteiro Completo</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron-right"
            size={20}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Poppins_600SemiBold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryText,
    fontFamily: 'Poppins_700Bold',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Poppins_600SemiBold',
  },
  attractionCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: 16,
    padding: 16,
  },
  attractionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  attractionInfo: {
    flex: 1,
    marginRight: 12,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  parkName: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: 'Poppins_400Regular',
  },
  waitTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
  },
  waitTimeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'Poppins_700Bold',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  estimatedTime: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: 'Poppins_400Regular',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Poppins_600SemiBold',
  },
});
