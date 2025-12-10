
# ORLGO - Supabase Database Structure

## Overview

The ORLGO app uses Supabase as its backend database and authentication system. The database is designed to support a theme park guide app with real-time wait times, user itineraries, favorites, reviews, and community features.

## Database Schema

### Core Tables

#### 1. **brands**
Stores theme park brands (Disney, Universal, SeaWorld, LEGOLAND).

- `id` (uuid, PK): Unique identifier
- `slug` (text, unique): URL-friendly identifier
- `name` (text): Brand name
- `logo_url` (text): Logo image URL
- `color` (text): Brand color (hex)
- `description` (text): Brand description
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

**RLS Policies:**
- Public read access (authenticated and anonymous users)

---

#### 2. **parks**
Stores individual theme parks.

- `id` (uuid, PK): Unique identifier
- `brand_id` (uuid, FK → brands): Parent brand
- `slug` (text, unique): URL-friendly identifier
- `name` (text): Park name
- `short_name` (text): Abbreviated name
- `description` (text): Park description
- `image_url` (text): Park image URL
- `api_entity_id` (text, unique): ThemeParks API entity ID
- `location_lat` (numeric): Latitude
- `location_lng` (numeric): Longitude
- `timezone` (text): Park timezone
- `status` (text): operating | closed | seasonal
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

**RLS Policies:**
- Public read access (authenticated and anonymous users)

---

#### 3. **attractions**
Stores attractions, restaurants, and shows.

- `id` (uuid, PK): Unique identifier
- `park_id` (uuid, FK → parks): Parent park
- `api_entity_id` (text): ThemeParks API entity ID
- `external_id` (text): External reference ID
- `name` (text): Attraction name
- `description` (text): Attraction description
- `image_url` (text): Attraction image URL
- `entity_type` (text): ATTRACTION | RESTAURANT | SHOW
- `attraction_types` (text[]): Array of types (radical, family, kids, show, simulator, water)
- `intensity` (text): low | medium | high
- `min_height` (integer): Minimum height in cm
- `min_age` (integer): Minimum age
- `accessible` (boolean): Wheelchair accessible
- `wait_time` (integer): Current wait time in minutes
- `queue_status` (text): short | medium | long
- `status` (text): operating | closed | down | refurbishment
- `last_updated` (timestamptz): Last wait time update
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

**RLS Policies:**
- Public read access (authenticated and anonymous users)

---

#### 4. **wait_time_history**
Historical wait time data for analytics.

- `id` (uuid, PK): Unique identifier
- `attraction_id` (uuid, FK → attractions): Related attraction
- `wait_time` (integer): Wait time in minutes
- `status` (text): Attraction status
- `recorded_at` (timestamptz): Recording timestamp

**RLS Policies:**
- Public read access (authenticated and anonymous users)

---

### User Tables

#### 5. **profiles**
User profile information.

- `id` (uuid, PK, FK → auth.users): User ID
- `email` (text): User email
- `full_name` (text): Full name
- `username` (text, unique): Username
- `avatar_url` (text): Avatar image URL
- `bio` (text): User bio
- `preferences` (jsonb): User preferences
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

**RLS Policies:**
- Users can view their own profile
- Users can update their own profile
- Users can insert their own profile

**Triggers:**
- Automatically created when a user signs up

---

#### 6. **itineraries**
User-created itineraries.

- `id` (uuid, PK): Unique identifier
- `user_id` (uuid, FK → auth.users): Owner user
- `title` (text): Itinerary title
- `description` (text): Itinerary description
- `start_date` (date): Start date
- `end_date` (date): End date
- `date` (timestamptz): Legacy date field
- `is_public` (boolean): Public visibility
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

**RLS Policies:**
- Users can view their own itineraries
- Anyone can view public itineraries
- Users can insert/update/delete their own itineraries

---

#### 7. **itinerary_items**
Attractions added to itineraries.

- `id` (uuid, PK): Unique identifier
- `itinerary_id` (uuid, FK → itineraries): Parent itinerary
- `attraction_id` (uuid, FK → attractions): Related attraction
- `order_index` (integer): Display order
- `notes` (text): User notes
- `scheduled_time` (timestamptz): Scheduled visit time
- `estimated_duration` (integer): Estimated duration in minutes
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

**RLS Policies:**
- Users can view items from their own itineraries
- Anyone can view items from public itineraries
- Users can insert/update/delete items in their own itineraries

---

#### 8. **favorites**
User favorite attractions.

- `id` (uuid, PK): Unique identifier
- `user_id` (uuid, FK → auth.users): User ID
- `attraction_id` (uuid, FK → attractions): Favorited attraction
- `created_at` (timestamptz): Creation timestamp

**Constraints:**
- Unique constraint on (user_id, attraction_id)

**RLS Policies:**
- Users can view their own favorites
- Users can insert/delete their own favorites

---

#### 9. **reviews**
User reviews for attractions.

- `id` (uuid, PK): Unique identifier
- `user_id` (uuid, FK → auth.users): Reviewer
- `attraction_id` (uuid, FK → attractions): Reviewed attraction
- `rating` (integer): Rating (1-5)
- `comment` (text): Review text
- `visit_date` (date): Visit date
- `helpful_count` (integer): Helpful votes
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

**Constraints:**
- Unique constraint on (user_id, attraction_id)
- Rating must be between 1 and 5

**RLS Policies:**
- Anyone can view reviews
- Users can insert/update/delete their own reviews

---

### Community Tables

#### 10. **posts**
Community posts and updates.

- `id` (uuid, PK): Unique identifier
- `user_id` (uuid, FK → profiles): Post author
- `content` (text): Post content
- `hashtags` (text[]): Array of hashtags
- `image_url` (text): Post image URL
- `park_id` (uuid, FK → parks): Related park
- `attraction_id` (uuid, FK → attractions): Related attraction
- `likes_count` (integer): Number of likes
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

**RLS Policies:**
- Anyone can view posts
- Users can insert/update/delete their own posts

---

## Services

### supabaseService.ts

Comprehensive service file with functions for:

- **Brands**: `getAllBrands()`, `getBrandBySlug()`
- **Parks**: `getAllParks()`, `getParksByBrand()`, `getParkBySlug()`, `getParkByApiEntityId()`
- **Attractions**: `getAttractionsByPark()`, `getAttractionById()`, `upsertAttraction()`, `bulkUpsertAttractions()`, `updateAttractionWaitTime()`
- **Wait Times**: `recordWaitTime()`, `getWaitTimeHistory()`
- **Profiles**: `getCurrentUserProfile()`, `updateProfile()`
- **Itineraries**: `getUserItineraries()`, `createItinerary()`, `updateItinerary()`, `deleteItinerary()`
- **Itinerary Items**: `addAttractionToItinerary()`, `removeAttractionFromItinerary()`, `reorderItineraryItems()`
- **Favorites**: `getUserFavorites()`, `addFavorite()`, `removeFavorite()`, `isAttractionFavorited()`
- **Reviews**: `getAttractionReviews()`, `createReview()`, `updateReview()`, `deleteReview()`
- **Posts**: `getAllPosts()`, `createPost()`, `deletePost()`
- **Authentication**: `signUp()`, `signIn()`, `signOut()`, `getCurrentUser()`, `resetPassword()`

### syncService.ts

Service for syncing data from ThemeParks API to Supabase:

- `syncParkAttractions()`: Sync a single park's attractions
- `syncAllParks()`: Sync all parks with API entity IDs
- `updateParkWaitTimes()`: Update wait times for a specific park
- `updateAllParkWaitTimes()`: Update wait times for all parks

---

## Initial Data

The database is pre-populated with:

### Brands
- Disney (4 parks)
- Universal (4 parks)
- SeaWorld Parks (3 parks)
- LEGOLAND (1 park)

### Parks
- **Disney**: Magic Kingdom, EPCOT, Hollywood Studios, Animal Kingdom
- **Universal**: Epic Universe, Universal Studios Florida, Islands of Adventure, Volcano Bay
- **SeaWorld**: SeaWorld Orlando, Aquatica, Busch Gardens Tampa
- **LEGOLAND**: LEGOLAND Florida

---

## Usage Examples

### Fetching Brands and Parks

```typescript
import { getAllBrands, getParksByBrand } from '@/services/supabaseService';

// Get all brands
const brands = await getAllBrands();

// Get parks for a specific brand
const disneyParks = await getParksByBrand(brands[0].id);
```

### Syncing Park Data

```typescript
import { syncParkAttractions, updateParkWaitTimes } from '@/services/syncService';

// Initial sync of park attractions
await syncParkAttractions(parkId, apiEntityId);

// Update wait times (should be called periodically)
await updateParkWaitTimes(parkId, apiEntityId);
```

### Managing Itineraries

```typescript
import {
  createItinerary,
  addAttractionToItinerary,
  getUserItineraries
} from '@/services/supabaseService';

// Create a new itinerary
const itinerary = await createItinerary({
  title: 'My Magic Kingdom Day',
  start_date: '2024-06-15',
  is_public: false
});

// Add attraction to itinerary
await addAttractionToItinerary(itinerary.id, attractionId);

// Get user's itineraries
const itineraries = await getUserItineraries();
```

### Working with Favorites

```typescript
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  isAttractionFavorited
} from '@/services/supabaseService';

// Add to favorites
await addFavorite(attractionId);

// Check if favorited
const isFavorited = await isAttractionFavorited(attractionId);

// Get all favorites
const favorites = await getUserFavorites();

// Remove from favorites
await removeFavorite(attractionId);
```

---

## Authentication

The app uses Supabase Auth with email/password authentication.

### Sign Up

```typescript
import { signUp } from '@/services/supabaseService';

const { user, session } = await signUp(
  'user@example.com',
  'password123',
  'John Doe'
);
```

**Note**: Users must verify their email before they can sign in. A verification email is sent automatically.

### Sign In

```typescript
import { signIn } from '@/services/supabaseService';

const { user, session } = await signIn('user@example.com', 'password123');
```

### Sign Out

```typescript
import { signOut } from '@/services/supabaseService';

await signOut();
```

---

## Automatic Triggers

### Profile Creation
When a user signs up, a profile is automatically created in the `profiles` table using the `handle_new_user()` trigger.

### Updated At Timestamps
All tables with an `updated_at` column automatically update this field when a row is modified using the `update_updated_at_column()` trigger.

---

## Security

All tables have Row Level Security (RLS) enabled with appropriate policies:

- **Public data** (brands, parks, attractions): Readable by everyone
- **User data** (profiles, itineraries, favorites): Only accessible by the owner
- **Public itineraries**: Readable by everyone when `is_public = true`
- **Reviews and posts**: Readable by everyone, modifiable only by the author

---

## Performance Optimizations

### Indexes
- All foreign keys have indexes
- Slug fields have unique indexes
- API entity IDs have indexes for fast lookups
- Timestamp fields have indexes for sorting

### Caching Strategy
- Brands and parks data can be cached (rarely changes)
- Attraction data should be refreshed periodically (wait times change)
- User-specific data should not be cached

---

## Next Steps

1. **Run Initial Sync**: Call `syncAllParks()` to populate attractions
2. **Set Up Periodic Updates**: Schedule `updateAllParkWaitTimes()` to run every 5-10 minutes
3. **Implement Real-time Subscriptions**: Use Supabase Realtime for live wait time updates
4. **Add Storage**: Configure Supabase Storage for user-uploaded images
5. **Implement Analytics**: Track popular attractions and peak times

---

## Troubleshooting

### No Attractions Showing
- Ensure parks have `api_entity_id` set
- Run `syncParkAttractions()` for the park
- Check console logs for API errors

### Wait Times Not Updating
- Verify ThemeParks API is accessible
- Check `last_updated` timestamp on attractions
- Ensure `updateParkWaitTimes()` is being called

### RLS Policy Errors
- Verify user is authenticated
- Check that user owns the resource they're trying to access
- Review RLS policies in Supabase dashboard

---

## Support

For issues or questions:
1. Check the Supabase dashboard for error logs
2. Review RLS policies
3. Check network requests in browser dev tools
4. Verify API keys are correct in `client.ts`
