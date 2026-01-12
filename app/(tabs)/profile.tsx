
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { colors, typography, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { OrlGoColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, profile, isAuthenticated, signOut, deleteAccount } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await signOut();
              router.replace('/(tabs)/login');
            } catch (error: any) {
              Alert.alert('Erro', error.message || 'Erro ao sair');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Deletar Conta',
      'Esta ação é irreversível. Todos os seus dados, incluindo roteiros e favoritos, serão permanentemente deletados. Tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmação Final',
              'Digite "DELETAR" para confirmar a exclusão da sua conta.',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Confirmar',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      setLoading(true);
                      await deleteAccount();
                      router.replace('/(tabs)/login');
                    } catch (error: any) {
                      Alert.alert('Erro', error.message || 'Erro ao deletar conta');
                    } finally {
                      setLoading(false);
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.unauthContainer}>
            <LinearGradient
              colors={[OrlGoColors.gradientStart, OrlGoColors.gradientEnd]}
              style={styles.logoContainer}
            >
              <Text style={styles.logo}>OrlGo</Text>
            </LinearGradient>
            <Text style={styles.unauthTitle}>Bem-vindo ao OrlGo!</Text>
            <Text style={styles.unauthSubtitle}>
              Entre ou crie uma conta para salvar seus roteiros e favoritos
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/(tabs)/login')}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => router.push('/(tabs)/signup')}
            >
              <Text style={styles.signupButtonText}>Criar Conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <LinearGradient
            colors={[OrlGoColors.gradientStart, OrlGoColors.gradientEnd]}
            style={styles.avatarContainer}
          >
            <Text style={styles.avatarText}>
              {profile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || '?'}
            </Text>
          </LinearGradient>
          <Text style={styles.name}>{profile?.full_name || 'Usuário'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="person.circle"
                android_material_icon_name="person"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>Editar Perfil</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={20}
              color={colors.textGray}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="lock.fill"
                android_material_icon_name="lock"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>Alterar Senha</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={20}
              color={colors.textGray}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/terms')}
          >
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="doc.text"
                android_material_icon_name="description"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>Termos de Serviço</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={20}
              color={colors.textGray}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/privacy')}
          >
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="shield.fill"
                android_material_icon_name="security"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.menuItemText}>Política de Privacidade</Text>
            </View>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={20}
              color={colors.textGray}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleSignOut}
            disabled={loading}
          >
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="arrow.right.square"
                android_material_icon_name="logout"
                size={24}
                color={colors.warning}
              />
              <Text style={[styles.menuItemText, { color: colors.warning }]}>
                Sair
              </Text>
            </View>
            {loading && <ActivityIndicator size="small" color={colors.warning} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleDeleteAccount}
            disabled={loading}
          >
            <View style={styles.menuItemLeft}>
              <IconSymbol
                ios_icon_name="trash.fill"
                android_material_icon_name="delete"
                size={24}
                color={colors.error}
              />
              <Text style={[styles.menuItemText, { color: colors.error }]}>
                Deletar Conta
              </Text>
            </View>
            {loading && <ActivityIndicator size="small" color={colors.error} />}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>OrlGo v1.0.0</Text>
          <Text style={styles.footerText}>Orlando Theme Parks Guide</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? 48 : 0,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.glowPurple,
  },
  avatarText: {
    ...typography.h1,
    color: colors.textLight,
    fontSize: 40,
  },
  name: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
    color: colors.textGray,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.bodySmall,
    color: colors.textGray,
    fontWeight: '600',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.md,
  },
  unauthContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.glowPurple,
  },
  logo: {
    ...typography.h1,
    color: colors.textLight,
    fontSize: 36,
  },
  unauthTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  unauthSubtitle: {
    ...typography.body,
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: colors.neonGreen,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.glow,
  },
  loginButtonText: {
    ...typography.button,
    color: colors.text,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    ...typography.caption,
    color: colors.textGray,
    textAlign: 'center',
  },
});
