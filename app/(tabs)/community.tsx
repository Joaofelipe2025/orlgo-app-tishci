
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

interface Post {
  id: string;
  author: string;
  authorInitial: string;
  timeAgo: string;
  content: string;
  comments: number;
  hashtags: string[];
}

export default function CommunityScreen() {
  const theme = useTheme();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [activeFilter, setActiveFilter] = useState<'recent' | 'top' | 'magickingdom' | 'epcot'>('recent');

  const posts: Post[] = [
    {
      id: '1',
      author: 'Usuário Demo',
      authorInitial: 'U',
      timeAgo: 'há 2h',
      content: 'Acabei de chegar no #MagicKingdom! O parque está bem movimentado hoje, mas as #Filas estão andando rápido. Space Mountain com apenas 25 min de espera! 🚀',
      comments: 3,
      hashtags: ['#MagicKingdom', '#Filas'],
    },
    {
      id: '2',
      author: 'Usuário Demo',
      authorInitial: 'U',
      timeAgo: 'há 2h',
      content: 'Dica: O #EPCOT está com promoção de 20% em algumas lojas hoje! Aproveitem para comprar souvenirs. #Desconto #Compras',
      comments: 1,
      hashtags: ['#EPCOT', '#Desconto', '#Compras'],
    },
    {
      id: '3',
      author: 'Usuário Demo',
      authorInitial: 'U',
      timeAgo: 'há 2h',
      content: 'O show de fogos do Magic Kingdom hoje estava INCRÍVEL! 🎆 Melhor lugar para assistir é perto do castelo. #MagicKingdom #Shows',
      comments: 5,
      hashtags: ['#MagicKingdom', '#Shows'],
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handleFilterPress = (filter: typeof activeFilter) => {
    setActiveFilter(filter);
    console.log('Filter changed to:', filter);
  };

  const handlePostPress = (post: Post) => {
    console.log('Post pressed:', post.id);
  };

  const handleCreatePost = () => {
    console.log('Create new post');
  };

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
          Comunidade
        </Text>
        <Text style={[styles.headerSubtitle, { fontFamily: 'Poppins_400Regular' }]}>
          Dicas e experiências em tempo real
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
          <IconSymbol
            ios_icon_name="search"
            android_material_icon_name="search"
            size={20}
            color={theme.dark ? '#999' : '#666'}
          />
          <TextInput
            placeholder="Buscar posts ou #hashtags..."
            placeholderTextColor={theme.dark ? '#999' : '#666'}
            style={[styles.searchInput, { fontFamily: 'Poppins_400Regular', color: theme.dark ? colors.text : colors.textDark }]}
          />
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleFilterPress('recent')}
            style={[
              styles.filterChip,
              activeFilter === 'recent' && styles.filterChipActive,
            ]}
          >
            <IconSymbol
              ios_icon_name="clock"
              android_material_icon_name="schedule"
              size={16}
              color={activeFilter === 'recent' ? '#FFFFFF' : colors.primary}
            />
            <Text
              style={[
                styles.filterText,
                { fontFamily: 'Poppins_600SemiBold' },
                activeFilter === 'recent' && styles.filterTextActive,
              ]}
            >
              Recentes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleFilterPress('top')}
            style={[
              styles.filterChip,
              activeFilter === 'top' && styles.filterChipActive,
            ]}
          >
            <IconSymbol
              ios_icon_name="trending-up"
              android_material_icon_name="trending-up"
              size={16}
              color={activeFilter === 'top' ? '#FFFFFF' : colors.primary}
            />
            <Text
              style={[
                styles.filterText,
                { fontFamily: 'Poppins_600SemiBold' },
                activeFilter === 'top' && styles.filterTextActive,
              ]}
            >
              Top 24h
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleFilterPress('magickingdom')}
            style={[
              styles.filterChip,
              activeFilter === 'magickingdom' && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { fontFamily: 'Poppins_600SemiBold' },
                activeFilter === 'magickingdom' && styles.filterTextActive,
              ]}
            >
              # MagicKingdom
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleFilterPress('epcot')}
            style={[
              styles.filterChip,
              activeFilter === 'epcot' && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                { fontFamily: 'Poppins_600SemiBold' },
                activeFilter === 'epcot' && styles.filterTextActive,
              ]}
            >
              # EPCOT
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Posts */}
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handlePostPress(post)}
            >
              <View style={[styles.postCard, { backgroundColor: theme.dark ? colors.card : '#F5F5F5' }]}>
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatar}>
                    <Text style={[styles.authorInitial, { fontFamily: 'Poppins_700Bold' }]}>
                      {post.authorInitial}
                    </Text>
                  </View>
                  <View style={styles.authorInfo}>
                    <Text style={[styles.authorName, { fontFamily: 'Poppins_600SemiBold', color: theme.dark ? colors.text : colors.textDark }]}>
                      {post.author}
                    </Text>
                    <Text style={[styles.postTime, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                      {post.timeAgo}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.postContent, { fontFamily: 'Poppins_400Regular', color: theme.dark ? colors.text : colors.textDark }]}>
                  {post.content}
                </Text>

                <View style={styles.postFooter}>
                  <TouchableOpacity style={styles.commentButton}>
                    <IconSymbol
                      ios_icon_name="chat"
                      android_material_icon_name="chat-bubble-outline"
                      size={18}
                      color={theme.dark ? '#999' : '#666'}
                    />
                    <Text style={[styles.commentCount, { fontFamily: 'Poppins_400Regular', color: theme.dark ? '#999' : '#666' }]}>
                      {post.comments}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleCreatePost}
        style={styles.fab}
      >
        <LinearGradient
          colors={['#6A00F5', '#9A00FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabGradient}
        >
          <IconSymbol
            ios_icon_name="plus"
            android_material_icon_name="add"
            size={28}
            color="#FFFFFF"
          />
        </LinearGradient>
      </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    paddingRight: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(106, 0, 245, 0.1)',
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  postCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  authorInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentCount: {
    fontSize: 13,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#6A00F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
