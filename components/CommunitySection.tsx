
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

interface CommunityPost {
  id: string;
  username: string;
  image: string;
  caption: string;
  likes: number;
  location: string;
}

export function CommunitySection() {
  const router = useRouter();

  const communityPosts: CommunityPost[] = [
    {
      id: '1',
      username: '@maria_orlando',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      caption: 'Castelo da Cinderela ao pôr do sol! 🏰✨',
      likes: 234,
      location: 'Magic Kingdom',
    },
    {
      id: '2',
      username: '@joao_viajante',
      image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400',
      caption: 'Fila de 10 min no Hagrid! Corre! 🎢',
      likes: 189,
      location: 'Islands of Adventure',
    },
    {
      id: '3',
      username: '@familia_parks',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400',
      caption: 'EPCOT Festival of the Arts 🎨',
      likes: 156,
      location: 'EPCOT',
    },
    {
      id: '4',
      username: '@dicas_orlando',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400',
      caption: 'Dica: chegue cedo no Animal Kingdom! 🦁',
      likes: 312,
      location: 'Animal Kingdom',
    },
  ];

  const handleShareExperience = () => {
    console.log('Navigate to community share');
    router.push('/(tabs)/community');
  };

  const handleViewCommunity = () => {
    console.log('Navigate to community');
    router.push('/(tabs)/community');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Comunidade OrlGo</Text>
          <Text style={styles.subtitle}>Veja o que está acontecendo agora</Text>
        </View>
        <TouchableOpacity onPress={handleViewCommunity}>
          <Text style={styles.viewAllText}>Ver tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.postsContainer}
      >
        {communityPosts.map((post, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleViewCommunity}
            >
              <View style={styles.postCard}>
                <Image
                  source={{ uri: post.image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
                <View style={styles.postOverlay}>
                  <View style={styles.postInfo}>
                    <Text style={styles.postUsername}>{post.username}</Text>
                    <Text style={styles.postCaption} numberOfLines={2}>
                      {post.caption}
                    </Text>
                    <View style={styles.postFooter}>
                      <View style={styles.locationRow}>
                        <IconSymbol
                          ios_icon_name="location.fill"
                          android_material_icon_name="location-on"
                          size={12}
                          color={colors.primary}
                        />
                        <Text style={styles.postLocation}>{post.location}</Text>
                      </View>
                      <View style={styles.likesRow}>
                        <IconSymbol
                          ios_icon_name="heart.fill"
                          android_material_icon_name="favorite"
                          size={12}
                          color={colors.error}
                        />
                        <Text style={styles.postLikes}>{post.likes}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleShareExperience}
        style={styles.shareButton}
      >
        <IconSymbol
          ios_icon_name="camera.fill"
          android_material_icon_name="photo-camera"
          size={24}
          color={colors.white}
        />
        <Text style={styles.shareButtonText}>Compartilhe sua mágica ✨📸</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  subtitle: {
    fontSize: 13,
    color: colors.secondaryText,
    fontFamily: 'Poppins_400Regular',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Poppins_600SemiBold',
  },
  postsContainer: {
    paddingRight: 16,
    gap: 12,
    marginBottom: 16,
  },
  postCard: {
    width: 200,
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  postInfo: {
    gap: 4,
  },
  postUsername: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryText,
    fontFamily: 'Poppins_700Bold',
  },
  postCaption: {
    fontSize: 12,
    color: colors.primaryText,
    lineHeight: 16,
    fontFamily: 'Poppins_400Regular',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postLocation: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postLikes: {
    fontSize: 11,
    color: colors.primaryText,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'Poppins_700Bold',
  },
});
