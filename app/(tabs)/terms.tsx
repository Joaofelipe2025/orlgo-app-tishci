
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

export default function TermsScreen() {
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
        <Text style={styles.headerTitle}>Termos de Serviço</Text>
        <View style={styles.headerPlaceholder} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Última atualização: Janeiro 2025</Text>

        <Text style={styles.sectionTitle}>1. Aceitação dos Termos</Text>
        <Text style={styles.paragraph}>
          Ao acessar e usar o aplicativo OrlGo, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não use o aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>2. Uso do Serviço</Text>
        <Text style={styles.paragraph}>
          O OrlGo é um guia de parques temáticos que fornece informações sobre atrações, tempos de espera e permite criar itinerários personalizados. Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.
        </Text>

        <Text style={styles.sectionTitle}>3. Conta de Usuário</Text>
        <Text style={styles.paragraph}>
          Para acessar certos recursos, você deve criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades que ocorrem em sua conta.
        </Text>

        <Text style={styles.sectionTitle}>4. Conteúdo do Usuário</Text>
        <Text style={styles.paragraph}>
          Você mantém todos os direitos sobre o conteúdo que publica no aplicativo. Ao publicar conteúdo, você nos concede uma licença mundial, não exclusiva e livre de royalties para usar, modificar e exibir esse conteúdo.
        </Text>

        <Text style={styles.sectionTitle}>5. Informações de Terceiros</Text>
        <Text style={styles.paragraph}>
          Os tempos de espera e informações de parques são fornecidos por APIs de terceiros. Não garantimos a precisão dessas informações e não somos responsáveis por quaisquer imprecisões.
        </Text>

        <Text style={styles.sectionTitle}>6. Exclusão de Conta</Text>
        <Text style={styles.paragraph}>
          Você pode excluir sua conta a qualquer momento através das configurações do aplicativo. A exclusão da conta removerá permanentemente todos os seus dados pessoais e conteúdo.
        </Text>

        <Text style={styles.sectionTitle}>7. Limitação de Responsabilidade</Text>
        <Text style={styles.paragraph}>
          O OrlGo é fornecido "como está" sem garantias de qualquer tipo. Não somos responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do uso do aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>8. Modificações dos Termos</Text>
        <Text style={styles.paragraph}>
          Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos você sobre mudanças significativas através do aplicativo ou por email.
        </Text>

        <Text style={styles.sectionTitle}>9. Contato</Text>
        <Text style={styles.paragraph}>
          Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco em support@orlgo.com
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
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
});
