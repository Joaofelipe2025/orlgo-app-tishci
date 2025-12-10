
import { supabase } from '@/app/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/app/integrations/supabase/types';

// Type aliases for easier use
export type Brand = Tables<'brands'>;
export type Park = Tables<'parks'>;
export type Attraction = Tables<'attractions'>;
export type Profile = Tables<'profiles'>;
export type Itinerary = Tables<'itineraries'>;
export type ItineraryItem = Tables<'itinerary_items'>;
export type Favorite = Tables<'favorites'>;
export type Review = Tables<'reviews'>;
export type Post = Tables<'posts'>;
export type WaitTimeHistory = Tables<'wait_time_history'>;

// ============================================
// BRANDS
// ============================================

export async function getAllBrands() {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
  
  return data;
}

export async function getBrandBySlug(slug: string) {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
  
  return data;
}

// ============================================
// PARKS
// ============================================

export async function getAllParks() {
  const { data, error } = await supabase
    .from('parks')
    .select(`
      *,
      brand:brands(*)
    `)
    .order('name');
  
  if (error) {
    console.error('Error fetching parks:', error);
    throw error;
  }
  
  return data;
}

export async function getParksByBrand(brandId: string) {
  const { data, error } = await supabase
    .from('parks')
    .select(`
      *,
      brand:brands(*)
    `)
    .eq('brand_id', brandId)
    .order('name');
  
  if (error) {
    console.error('Error fetching parks by brand:', error);
    throw error;
  }
  
  return data;
}

export async function getParkBySlug(slug: string) {
  const { data, error } = await supabase
    .from('parks')
    .select(`
      *,
      brand:brands(*)
    `)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching park:', error);
    throw error;
  }
  
  return data;
}

export async function getParkByApiEntityId(apiEntityId: string) {
  const { data, error } = await supabase
    .from('parks')
    .select(`
      *,
      brand:brands(*)
    `)
    .eq('api_entity_id', apiEntityId)
    .single();
  
  if (error) {
    console.error('Error fetching park by API entity ID:', error);
    throw error;
  }
  
  return data;
}

// ============================================
// ATTRACTIONS
// ============================================

export async function getAttractionsByPark(parkId: string, entityType?: string) {
  let query = supabase
    .from('attractions')
    .select(`
      *,
      park:parks(*)
    `)
    .eq('park_id', parkId);
  
  if (entityType) {
    query = query.eq('entity_type', entityType);
  }
  
  const { data, error } = await query.order('name');
  
  if (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
  
  return data;
}

export async function getAttractionById(id: string) {
  const { data, error } = await supabase
    .from('attractions')
    .select(`
      *,
      park:parks(
        *,
        brand:brands(*)
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching attraction:', error);
    throw error;
  }
  
  return data;
}

export async function upsertAttraction(attraction: TablesInsert<'attractions'>) {
  const { data, error } = await supabase
    .from('attractions')
    .upsert(attraction, {
      onConflict: 'api_entity_id',
      ignoreDuplicates: false
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error upserting attraction:', error);
    throw error;
  }
  
  return data;
}

export async function bulkUpsertAttractions(attractions: TablesInsert<'attractions'>[]) {
  const { data, error } = await supabase
    .from('attractions')
    .upsert(attractions, {
      onConflict: 'api_entity_id',
      ignoreDuplicates: false
    })
    .select();
  
  if (error) {
    console.error('Error bulk upserting attractions:', error);
    throw error;
  }
  
  return data;
}

export async function updateAttractionWaitTime(
  attractionId: string,
  waitTime: number,
  status?: string
) {
  const { data, error } = await supabase
    .from('attractions')
    .update({
      wait_time: waitTime,
      status: status || 'operating',
      last_updated: new Date().toISOString()
    })
    .eq('id', attractionId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating wait time:', error);
    throw error;
  }
  
  return data;
}

// ============================================
// WAIT TIME HISTORY
// ============================================

export async function recordWaitTime(
  attractionId: string,
  waitTime: number,
  status?: string
) {
  const { data, error } = await supabase
    .from('wait_time_history')
    .insert({
      attraction_id: attractionId,
      wait_time: waitTime,
      status: status
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error recording wait time:', error);
    throw error;
  }
  
  return data;
}

export async function getWaitTimeHistory(
  attractionId: string,
  hoursBack: number = 24
) {
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - hoursBack);
  
  const { data, error } = await supabase
    .from('wait_time_history')
    .select('*')
    .eq('attraction_id', attractionId)
    .gte('recorded_at', cutoffTime.toISOString())
    .order('recorded_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching wait time history:', error);
    throw error;
  }
  
  return data;
}

// ============================================
// PROFILES
// ============================================

export async function getCurrentUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
  
  return data;
}

export async function updateProfile(updates: TablesUpdate<'profiles'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
  
  return data;
}

// ============================================
// ITINERARIES
// ============================================

export async function getUserItineraries() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { data, error } = await supabase
    .from('itineraries')
    .select(`
      *,
      items:itinerary_items(
        *,
        attraction:attractions(
          *,
          park:parks(*)
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching itineraries:', error);
    throw error;
  }
  
  return data;
}

export async function createItinerary(itinerary: Omit<TablesInsert<'itineraries'>, 'user_id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { data, error } = await supabase
    .from('itineraries')
    .insert({
      ...itinerary,
      user_id: user.id
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating itinerary:', error);
    throw error;
  }
  
  return data;
}

export async function updateItinerary(id: string, updates: TablesUpdate<'itineraries'>) {
  const { data, error } = await supabase
    .from('itineraries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating itinerary:', error);
    throw error;
  }
  
  return data;
}

export async function deleteItinerary(id: string) {
  const { error } = await supabase
    .from('itineraries')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting itinerary:', error);
    throw error;
  }
}

// ============================================
// ITINERARY ITEMS
// ============================================

export async function addAttractionToItinerary(
  itineraryId: string,
  attractionId: string,
  orderIndex?: number
) {
  // Get the current max order index if not provided
  if (orderIndex === undefined) {
    const { data: items } = await supabase
      .from('itinerary_items')
      .select('order_index')
      .eq('itinerary_id', itineraryId)
      .order('order_index', { ascending: false })
      .limit(1);
    
    orderIndex = items && items.length > 0 ? items[0].order_index + 1 : 0;
  }
  
  const { data, error } = await supabase
    .from('itinerary_items')
    .insert({
      itinerary_id: itineraryId,
      attraction_id: attractionId,
      order_index: orderIndex
    })
    .select(`
      *,
      attraction:attractions(
        *,
        park:parks(*)
      )
    `)
    .single();
  
  if (error) {
    console.error('Error adding attraction to itinerary:', error);
    throw error;
  }
  
  return data;
}

export async function removeAttractionFromItinerary(itemId: string) {
  const { error } = await supabase
    .from('itinerary_items')
    .delete()
    .eq('id', itemId);
  
  if (error) {
    console.error('Error removing attraction from itinerary:', error);
    throw error;
  }
}

export async function reorderItineraryItems(
  itineraryId: string,
  itemIds: string[]
) {
  // Update order_index for each item
  const updates = itemIds.map((id, index) => ({
    id,
    itinerary_id: itineraryId,
    order_index: index
  }));
  
  const { data, error } = await supabase
    .from('itinerary_items')
    .upsert(updates)
    .select();
  
  if (error) {
    console.error('Error reordering itinerary items:', error);
    throw error;
  }
  
  return data;
}

// ============================================
// FAVORITES
// ============================================

export async function getUserFavorites() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      attraction:attractions(
        *,
        park:parks(*)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
  
  return data;
}

export async function addFavorite(attractionId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { data, error } = await supabase
    .from('favorites')
    .insert({
      user_id: user.id,
      attraction_id: attractionId
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
  
  return data;
}

export async function removeFavorite(attractionId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('attraction_id', attractionId);
  
  if (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
}

export async function isAttractionFavorited(attractionId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }
  
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('attraction_id', attractionId)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error checking favorite:', error);
    return false;
  }
  
  return !!data;
}

// ============================================
// REVIEWS
// ============================================

export async function getAttractionReviews(attractionId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      user:profiles(id, full_name, avatar_url, username)
    `)
    .eq('attraction_id', attractionId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
  
  return data;
}

export async function createReview(review: Omit<TablesInsert<'reviews'>, 'user_id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      ...review,
      user_id: user.id
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating review:', error);
    throw error;
  }
  
  return data;
}

export async function updateReview(id: string, updates: TablesUpdate<'reviews'>) {
  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating review:', error);
    throw error;
  }
  
  return data;
}

export async function deleteReview(id: string) {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}

// ============================================
// POSTS (Community)
// ============================================

export async function getAllPosts(limit: number = 50) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      user:profiles(id, full_name, avatar_url, username),
      park:parks(id, name, slug),
      attraction:attractions(id, name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
  
  return data;
}

export async function createPost(post: Omit<TablesInsert<'posts'>, 'user_id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No user logged in');
  }
  
  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...post,
      user_id: user.id
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }
  
  return data;
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// ============================================
// AUTHENTICATION
// ============================================

export async function signUp(email: string, password: string, fullName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://natively.dev/email-confirmed',
      data: {
        full_name: fullName
      }
    }
  });
  
  if (error) {
    console.error('Error signing up:', error);
    throw error;
  }
  
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
  
  return user;
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://natively.dev/reset-password'
  });
  
  if (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
  
  return data;
}
