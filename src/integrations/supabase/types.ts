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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_clicks: {
        Row: {
          contact_type: string
          created_at: string | null
          id: string
          installer_id: string | null
          ip_address: unknown | null
          page_url: string | null
          user_agent: string | null
        }
        Insert: {
          contact_type: string
          created_at?: string | null
          id?: string
          installer_id?: string | null
          ip_address?: unknown | null
          page_url?: string | null
          user_agent?: string | null
        }
        Update: {
          contact_type?: string
          created_at?: string | null
          id?: string
          installer_id?: string | null
          ip_address?: unknown | null
          page_url?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_clicks_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
        ]
      }
      installer_quotes: {
        Row: {
          accepted: boolean | null
          created_at: string | null
          id: string
          installer_id: string
          message: string | null
          proposed_cost: number
          proposed_timeline: string | null
          quote_id: string
        }
        Insert: {
          accepted?: boolean | null
          created_at?: string | null
          id?: string
          installer_id: string
          message?: string | null
          proposed_cost: number
          proposed_timeline?: string | null
          quote_id: string
        }
        Update: {
          accepted?: boolean | null
          created_at?: string | null
          id?: string
          installer_id?: string
          message?: string | null
          proposed_cost?: number
          proposed_timeline?: string | null
          quote_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "installer_quotes_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installer_quotes_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      installers: {
        Row: {
          address: string
          certifications: string[] | null
          company_name: string
          created_at: string | null
          description: string | null
          email: string
          energy_type: Database["public"]["Enums"]["energy_type"]
          experience_years: number | null
          id: string
          images: string[] | null
          languages: string[] | null
          latitude: number | null
          location: string
          logo_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          rating: number | null
          review_count: number | null
          service_areas: string[] | null
          specialties: string[] | null
          status: Database["public"]["Enums"]["installer_status"] | null
          updated_at: string | null
          verified: boolean | null
          website: string | null
        }
        Insert: {
          address: string
          certifications?: string[] | null
          company_name: string
          created_at?: string | null
          description?: string | null
          email: string
          energy_type: Database["public"]["Enums"]["energy_type"]
          experience_years?: number | null
          id?: string
          images?: string[] | null
          languages?: string[] | null
          latitude?: number | null
          location: string
          logo_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          service_areas?: string[] | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["installer_status"] | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          address?: string
          certifications?: string[] | null
          company_name?: string
          created_at?: string | null
          description?: string | null
          email?: string
          energy_type?: Database["public"]["Enums"]["energy_type"]
          experience_years?: number | null
          id?: string
          images?: string[] | null
          languages?: string[] | null
          latitude?: number | null
          location?: string
          logo_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          service_areas?: string[] | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["installer_status"] | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          additional_requirements: string | null
          assigned_installer_id: string | null
          budget_range: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          energy_type: Database["public"]["Enums"]["energy_type"]
          estimated_cost: number | null
          estimated_savings: number | null
          id: string
          location: string
          monthly_bill: number | null
          property_size: number | null
          property_type: string | null
          roof_age: number | null
          roof_type: string | null
          status: Database["public"]["Enums"]["quote_status"] | null
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          additional_requirements?: string | null
          assigned_installer_id?: string | null
          budget_range?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          energy_type: Database["public"]["Enums"]["energy_type"]
          estimated_cost?: number | null
          estimated_savings?: number | null
          id?: string
          location: string
          monthly_bill?: number | null
          property_size?: number | null
          property_type?: string | null
          roof_age?: number | null
          roof_type?: string | null
          status?: Database["public"]["Enums"]["quote_status"] | null
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          additional_requirements?: string | null
          assigned_installer_id?: string | null
          budget_range?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          energy_type?: Database["public"]["Enums"]["energy_type"]
          estimated_cost?: number | null
          estimated_savings?: number | null
          id?: string
          location?: string
          monthly_bill?: number | null
          property_size?: number | null
          property_type?: string | null
          roof_age?: number | null
          roof_type?: string | null
          status?: Database["public"]["Enums"]["quote_status"] | null
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_assigned_installer_id_fkey"
            columns: ["assigned_installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_email: string | null
          customer_name: string
          helpful_votes: number | null
          id: string
          installer_id: string
          project_cost: number | null
          project_size: string | null
          project_type: Database["public"]["Enums"]["energy_type"] | null
          rating: number
          title: string | null
          updated_at: string | null
          verified_purchase: boolean | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name: string
          helpful_votes?: number | null
          id?: string
          installer_id: string
          project_cost?: number | null
          project_size?: string | null
          project_type?: Database["public"]["Enums"]["energy_type"] | null
          rating: number
          title?: string | null
          updated_at?: string | null
          verified_purchase?: boolean | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string
          helpful_votes?: number | null
          id?: string
          installer_id?: string
          project_cost?: number | null
          project_size?: string | null
          project_type?: Database["public"]["Enums"]["energy_type"] | null
          rating?: number
          title?: string | null
          updated_at?: string | null
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      energy_type: "solar" | "wind" | "geothermal" | "battery"
      installer_status: "active" | "inactive" | "pending" | "suspended"
      quote_status: "pending" | "accepted" | "rejected" | "expired"
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
    Enums: {
      energy_type: ["solar", "wind", "geothermal", "battery"],
      installer_status: ["active", "inactive", "pending", "suspended"],
      quote_status: ["pending", "accepted", "rejected", "expired"],
    },
  },
} as const
