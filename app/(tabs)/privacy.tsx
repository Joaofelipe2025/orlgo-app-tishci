
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A00F5', '#9A00FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Política de Privacidade</Text>
        <View style={styles.headerPlaceholder} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Última atualização: Janeiro 2025</Text>

        <Text style={styles.sectionTitle}>1. Informações que Coletamos</Text>
        <Text style={styles.paragraph}>
          Coletamos informações que você nos fornece diretamente, incluindo:
        </Text>
        <Text style={styles.bulletPoint}>• Nome e endereço de email</Text>
        <Text style={styles.bulletPoint}>• Informações de perfil</Text>
        <Text style={styles.bulletPoint}>• Itinerários e preferências de parques</Text>
        <Text style={styles.bulletPoint}>• Avaliações e comentários</Text>

        <Text style={styles.sectionTitle}>2. Como Usamos Suas Informações</Text>
        <Text style={styles.paragraph}>
          Usamos as informações coletadas para:
        </Text>
        <Text style={styles.bulletPoint}>• Fornecer e melhorar nossos serviços</Text>
        <Text style={styles.bulletPoint}>• Personalizar sua experiência</Text>
        <Text style={styles.bulletPoint}>• Enviar notificações importantes</Text>
        <Text style={styles.bulletPoint}>• Responder às suas solicitações</Text>

        <Text style={styles.sectionTitle}>3. Compartilhamento de Informações</Text>
        <Text style={styles.paragraph}>
          Não vendemos suas informações pessoais. Podemos compartilhar informações apenas:
        </Text>
        <Text style={styles.bulletPoint}>• Com seu consentimento explícito</Text>
        <Text style={styles.bulletPoint}>• Para cumprir obrigações legais</Text>
        <Text style={styles.bulletPoint}>• Com provedores de serviços que nos ajudam a operar o aplicativo</Text>

        <Text style={styles.sectionTitle}>4. Armazenamento de Dados</Text>
        <Text style={styles.paragraph}>
          Seus dados são armazenados de forma segura usando criptografia e práticas de segurança padrão da indústria. Usamos o Supabase como nosso provedor de banco de dados, que está em conformidade com GDPR e outras regulamentações de privacidade.
        </Text>

        <Text style={styles.sectionTitle}>5. Seus Direitos</Text>
        <Text style={styles.paragraph}>
          Você tem o direito de:
        </Text>
        <Text style={styles.bulletPoint}>• Acessar seus dados pessoais</Text>
        <Text style={styles.bulletPoint}>• Corrigir informações imprecisas</Text>
        <Text style={styles.bulletPoint}>• Solicitar a exclusão de seus dados</Text>
        <Text style={styles.bulletPoint}>• Exportar seus dados</Text>
        <Text style={styles.bulletPoint}>• Optar por não receber comunicações de marketing</Text>

        <Text style={styles.sectionTitle}>6. Exclusão de Dados</Text>
        <Text style={styles.paragraph}>
          Você pode excluir sua conta e todos os dados associados a qualquer momento através das configurações do aplicativo. A exclusão é permanente e não pode ser desfeita.
        </Text>

        <Text style={styles.sectionTitle}>7. Cookies e Tecnologias Similares</Text>
        <Text style={styles.paragraph}>
          Usamos tecnologias de armazenamento local para melhorar sua experiência, incluindo manter você conectado e salvar suas preferências.
        </Text>

        <Text style={styles.sectionTitle}>8. Segurança</Text>
        <Text style={styles.paragraph}>
          Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda ou alteração.
        </Text>

        <Text style={styles.sectionTitle}>9. Crianças</Text>
        <Text style={styles.paragraph}>
          Nosso serviço não é direcionado a menores de 13 anos. Não coletamos intencionalmente informações pessoais de crianças.
        </Text>

        <Text style={styles.sectionTitle}>10. Alterações nesta Política</Text>
        <Text style={styles.paragraph}>
          Podemos atualizar esta política de privacidade periodicamente. Notificaremos você sobre mudanças significativas através do aplicativo ou por email.
        </Text>

        <Text style={styles.sectionTitle}>11. Contato</Text>
        <Text style={styles.paragraph}>
          Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, entre em contato conosco em privacy@orlgo.com
        </Text>

        <View style={{ height: 40 }} />
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
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
    fontFamily: 'Poppins_400Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 12,
    fontFamily: 'Poppins_700Bold',
  },
  paragraph: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: 'Poppins_400Regular',
  },
  bulletPoint: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 16,
    fontFamily: 'Poppins_400Regular',
  },
});
