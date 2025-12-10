
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { useUser } from "@/contexts/UserContext";
import { useItinerary } from "@/contexts/ItineraryContext";

type TabType = 'account' | 'preferences' | 'help';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useUser();
  const { clearItinerary } = useItinerary();
  const [activeTab, setActiveTab] = useState<TabType>('account');

  const handleLogin = () => {
    router.push('/(tabs)/login');
  };

  const handleLogout = () => {
    logout();
  };

  const handleEmergencyCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/1234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@orlgo.com');
  };

  const renderAccountTab = () => (
    <View style={styles.tabContent}>
      {isLoggedIn && user ? (
        <>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Nome</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <IconSymbol
              ios_icon_name="arrow.right.square"
              android_material_icon_name="logout"
              size={20}
              color={colors.queueRed}
            />
            <Text style={[styles.actionButtonText, { color: colors.queueRed }]}>Sair da Conta</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyState}>
          <IconSymbol
            ios_icon_name="person.circle"
            android_material_icon_name="account-circle"
            size={80}
            color="#999"
          />
          <Text style={styles.emptyStateText}>Você não está logado</Text>
          <Text style={styles.emptyStateSubtext}>
            Faça login para salvar suas preferências e roteiros
          </Text>
        </View>
      )}
    </View>
  );

  const renderPreferencesTab = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity style={styles.preferenceItem}>
        <View style={styles.preferenceLeft}>
          <IconSymbol
            ios_icon_name="globe"
            android_material_icon_name="language"
            size={24}
            color={colors.primary}
          />
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Idioma</Text>
            <Text style={styles.preferenceValue}>Português (BR)</Text>
          </View>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.preferenceItem}>
        <View style={styles.preferenceLeft}>
          <IconSymbol
            ios_icon_name="dollarsign.circle"
            android_material_icon_name="attach-money"
            size={24}
            color={colors.primary}
          />
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Moeda</Text>
            <Text style={styles.preferenceValue}>Real (R$)</Text>
          </View>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.preferenceItem}>
        <View style={styles.preferenceLeft}>
          <IconSymbol
            ios_icon_name="bell.fill"
            android_material_icon_name="notifications"
            size={24}
            color={colors.primary}
          />
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Notificações</Text>
            <Text style={styles.preferenceValue}>Ativadas</Text>
          </View>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={clearItinerary}>
        <IconSymbol
          ios_icon_name="trash"
          android_material_icon_name="delete"
          size={20}
          color={colors.queueRed}
        />
        <Text style={[styles.actionButtonText, { color: colors.queueRed }]}>Limpar Roteiro</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHelpTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Emergências</Text>
      
      <TouchableOpacity
        style={styles.emergencyCard}
        onPress={() => handleEmergencyCall('911')}
      >
        <View style={styles.emergencyIcon}>
          <IconSymbol
            ios_icon_name="phone.fill"
            android_material_icon_name="phone"
            size={28}
            color="#FFFFFF"
          />
        </View>
        <View style={styles.emergencyInfo}>
          <Text style={styles.emergencyTitle}>Emergência 911</Text>
          <Text style={styles.emergencySubtitle}>Toque para discar</Text>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={24}
          color={colors.queueRed}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.helpCard}
        onPress={() => console.log('Tourist Police')}
      >
        <IconSymbol
          ios_icon_name="shield.fill"
          android_material_icon_name="security"
          size={24}
          color={colors.primary}
        />
        <View style={styles.helpCardInfo}>
          <Text style={styles.helpCardTitle}>Polícia Turística</Text>
          <Text style={styles.helpCardSubtitle}>Assistência para turistas</Text>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.helpCard}
        onPress={() => console.log('Nearest Hospital')}
      >
        <IconSymbol
          ios_icon_name="cross.fill"
          android_material_icon_name="local-hospital"
          size={24}
          color={colors.primary}
        />
        <View style={styles.helpCardInfo}>
          <Text style={styles.helpCardTitle}>Hospital mais próximo</Text>
          <Text style={styles.helpCardSubtitle}>Encontre atendimento médico</Text>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Suporte do App</Text>

      <TouchableOpacity style={styles.supportCard} onPress={handleWhatsApp}>
        <IconSymbol
          ios_icon_name="message.fill"
          android_material_icon_name="chat"
          size={24}
          color={colors.queueGreen}
        />
        <View style={styles.supportCardInfo}>
          <Text style={styles.supportCardTitle}>WhatsApp</Text>
          <Text style={styles.supportCardSubtitle}>Fale conosco pelo WhatsApp</Text>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.supportCard} onPress={handleEmail}>
        <IconSymbol
          ios_icon_name="envelope.fill"
          android_material_icon_name="email"
          size={24}
          color={colors.primary}
        />
        <View style={styles.supportCardInfo}>
          <Text style={styles.supportCardTitle}>Email</Text>
          <Text style={styles.supportCardSubtitle}>support@orlgo.com</Text>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.supportCard}
        onPress={() => console.log('FAQ')}
      >
        <IconSymbol
          ios_icon_name="questionmark.circle.fill"
          android_material_icon_name="help"
          size={24}
          color={colors.primary}
        />
        <View style={styles.supportCardInfo}>
          <Text style={styles.supportCardTitle}>FAQ</Text>
          <Text style={styles.supportCardSubtitle}>Perguntas frequentes</Text>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron-right"
          size={20}
          color="#999"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Compact Header */}
      <LinearGradient
        colors={['#6A00F5', '#9A00FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.profileHeader}>
          <IconSymbol
            ios_icon_name="person.circle.fill"
            android_material_icon_name="account-circle"
            size={60}
            color={colors.accent}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {isLoggedIn && user ? user.name : 'Visitante'}
            </Text>
            {!isLoggedIn && (
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginButton}>Entrar na Conta</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'account' && styles.tabActive]}
          onPress={() => setActiveTab('account')}
        >
          <Text style={[styles.tabText, activeTab === 'account' && styles.tabTextActive]}>
            Conta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'preferences' && styles.tabActive]}
          onPress={() => setActiveTab('preferences')}
        >
          <Text style={[styles.tabText, activeTab === 'preferences' && styles.tabTextActive]}>
            Preferências
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'help' && styles.tabActive]}
          onPress={() => setActiveTab('help')}
        >
          <Text style={[styles.tabText, activeTab === 'help' && styles.tabTextActive]}>
            Ajuda
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'account' && renderAccountTab()}
        {activeTab === 'preferences' && renderPreferencesTab()}
        {activeTab === 'help' && renderHelpTab()}

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 120 }} />
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
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  loginButton: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
    fontFamily: 'Poppins_600SemiBold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    fontFamily: 'Poppins_600SemiBold',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  tabContent: {
    gap: 16,
  },
  infoSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
    fontFamily: 'Poppins_400Regular',
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Poppins_600SemiBold',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
    fontFamily: 'Poppins_600SemiBold',
  },
  preferenceValue: {
    fontSize: 13,
    color: '#999',
    fontFamily: 'Poppins_400Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'Poppins_700Bold',
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 60, 56, 0.1)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.queueRed,
    gap: 12,
  },
  emergencyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.queueRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.queueRed,
    marginBottom: 2,
    fontFamily: 'Poppins_700Bold',
  },
  emergencySubtitle: {
    fontSize: 13,
    color: colors.queueRed,
    fontFamily: 'Poppins_400Regular',
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  helpCardInfo: {
    flex: 1,
  },
  helpCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
    fontFamily: 'Poppins_600SemiBold',
  },
  helpCardSubtitle: {
    fontSize: 13,
    color: '#999',
    fontFamily: 'Poppins_400Regular',
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  supportCardInfo: {
    flex: 1,
  },
  supportCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
    fontFamily: 'Poppins_600SemiBold',
  },
  supportCardSubtitle: {
    fontSize: 13,
    color: '#999',
    fontFamily: 'Poppins_400Regular',
  },
});
