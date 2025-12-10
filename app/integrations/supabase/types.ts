export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attractions: {
        Row: {
          accessible: boolean | null
          api_entity_id: string | null
          attraction_types: string[] | null
          created_at: string | null
          description: string | null
          entity_type: string | null
          external_id: string | null
          id: string
          image_url: string | null
          intensity: string | null
          last_updated: string | null
          min_age: number | null
          min_height: number | null
          name: string
          park_id: string | null
          queue_status: string | null
          status: string | null
          updated_at: string | null
          wait_time: number | null
        }
        Insert: {
          accessible?: boolean | null
          api_entity_id?: string | null
          attraction_types?: string[] | null
          created_at?: string | null
          description?: string | null
          entity_type?: string | null
          external_id?: string | null
          id?: string
          image_url?: string | null
          intensity?: string | null
          last_updated?: string | null
          min_age?: number | null
          min_height?: number | null
          name: string
          park_id?: string | null
          queue_status?: string | null
          status?: string | null
          updated_at?: string | null
          wait_time?: number | null
        }
        Update: {
          accessible?: boolean | null
          api_entity_id?: string | null
          attraction_types?: string[] | null
          created_at?: string | null
          description?: string | null
          entity_type?: string | null
          external_id?: string | null
          id?: string
          image_url?: string | null
          intensity?: string | null
          last_updated?: string | null
          min_age?: number | null
          min_height?: number | null
          name?: string
          park_id?: string | null
          queue_status?: string | null
          status?: string | null
          updated_at?: string | null
          wait_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attractions_park_id_fkey"
            columns: ["park_id"]
            isOneToOne: false
            referencedRelation: "parks"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          color: string
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          color?: string
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          attraction_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          attraction_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          attraction_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
        ]
      }
      itineraries: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          end_date: string | null
          id: string
          is_public: boolean | null
          start_date: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_public?: boolean | null
          start_date?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_public?: boolean | null
          start_date?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      itinerary_items: {
        Row: {
          attraction_id: string
          created_at: string | null
          estimated_duration: number | null
          id: string
          itinerary_id: string
          notes: string | null
          order_index: number
          scheduled_time: string | null
          updated_at: string | null
        }
        Insert: {
          attraction_id: string
          created_at?: string | null
          estimated_duration?: number | null
          id?: string
          itinerary_id: string
          notes?: string | null
          order_index?: number
          scheduled_time?: string | null
          updated_at?: string | null
        }
        Update: {
          attraction_id?: string
          created_at?: string | null
          estimated_duration?: number | null
          id?: string
          itinerary_id?: string
          notes?: string | null
          order_index?: number
          scheduled_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_items_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_items_itinerary_id_fkey"
            columns: ["itinerary_id"]
            isOneToOne: false
            referencedRelation: "itineraries"
            referencedColumns: ["id"]
          },
        ]
      }
      parks: {
        Row: {
          api_entity_id: string | null
          brand_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          location_lat: number | null
          location_lng: number | null
          name: string
          short_name: string
          slug: string
          status: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          api_entity_id?: string | null
          brand_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location_lat?: number | null
          location_lng?: number | null
          name: string
          short_name: string
          slug: string
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          api_entity_id?: string | null
          brand_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location_lat?: number | null
          location_lng?: number | null
          name?: string
          short_name?: string
          slug?: string
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parks_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          attraction_id: string | null
          content: string
          created_at: string | null
          hashtags: string[] | null
          id: string
          image_url: string | null
          likes_count: number | null
          park_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          attraction_id?: string | null
          content: string
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          park_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          attraction_id?: string | null
          content?: string
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          park_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_park_id_fkey"
            columns: ["park_id"]
            isOneToOne: false
            referencedRelation: "parks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          preferences: Json | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          preferences?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          attraction_id: string
          comment: string | null
          created_at: string | null
          helpful_count: number | null
          id: string
          rating: number
          updated_at: string | null
          user_id: string
          visit_date: string | null
        }
        Insert: {
          attraction_id: string
          comment?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          rating: number
          updated_at?: string | null
          user_id: string
          visit_date?: string | null
        }
        Update: {
          attraction_id?: string
          comment?: string | null
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          rating?: number
          updated_at?: string | null
          user_id?: string
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
        ]
      }
      wait_time_history: {
        Row: {
          attraction_id: string
          id: string
          recorded_at: string | null
          status: string | null
          wait_time: number
        }
        Insert: {
          attraction_id: string
          id?: string
          recorded_at?: string | null
          status?: string | null
          wait_time: number
        }
        Update: {
          attraction_id?: string
          id?: string
          recorded_at?: string | null
          status?: string | null
          wait_time?: number
        }
        Relationships: [
          {
            foreignKeyName: "wait_time_history_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
