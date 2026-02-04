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
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categorie: {
        Row: {
          id: string
          nom: string
          svg: string | null
        }
        Insert: {
          id?: string
          nom: string
          svg?: string | null
        }
        Update: {
          id?: string
          nom?: string
          svg?: string | null
        }
        Relationships: []
      }
      exo: {
        Row: {
          id: string
          nom: string
          svg: string | null
        }
        Insert: {
          id?: string
          nom: string
          svg?: string | null
        }
        Update: {
          id?: string
          nom?: string
          svg?: string | null
        }
        Relationships: []
      }
      exo_categorie: {
        Row: {
          id: string
          id_categorie: string | null
          id_exo: string | null
        }
        Insert: {
          id?: string
          id_categorie?: string | null
          id_exo?: string | null
        }
        Update: {
          id?: string
          id_categorie?: string | null
          id_exo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exo_categorie_id_categorie_fkey"
            columns: ["id_categorie"]
            isOneToOne: false
            referencedRelation: "categorie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exo_categorie_id_exo_fkey"
            columns: ["id_exo"]
            isOneToOne: false
            referencedRelation: "exo"
            referencedColumns: ["id"]
          },
        ]
      }
      historique_poids: {
        Row: {
          date: string
          id: string
          user_id: string | null
          valeur: number
        }
        Insert: {
          date: string
          id?: string
          user_id?: string | null
          valeur: number
        }
        Update: {
          date?: string
          id?: string
          user_id?: string | null
          valeur?: number
        }
        Relationships: [
          {
            foreignKeyName: "historique_poids_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profil"
            referencedColumns: ["id"]
          },
        ]
      }
      profil: {
        Row: {
          created_at: string | null
          id: string
          nom: string | null
          photo_url: string | null
          poids: number | null
          prenom: string | null
          pseudo: string | null
          taille: number | null
        }
        Insert: {
          created_at?: string | null
          id: string
          nom?: string | null
          photo_url?: string | null
          poids?: number | null
          prenom?: string | null
          pseudo?: string | null
          taille?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nom?: string | null
          photo_url?: string | null
          poids?: number | null
          prenom?: string | null
          pseudo?: string | null
          taille?: number | null
        }
        Relationships: []
      }
      rep: {
        Row: {
          charge: number | null
          id: string
          id_serie: string | null
          repetitions: number
        }
        Insert: {
          charge?: number | null
          id?: string
          id_serie?: string | null
          repetitions: number
        }
        Update: {
          charge?: number | null
          id?: string
          id_serie?: string | null
          repetitions?: number
        }
        Relationships: [
          {
            foreignKeyName: "rep_id_serie_fkey"
            columns: ["id_serie"]
            isOneToOne: false
            referencedRelation: "serie"
            referencedColumns: ["id"]
          },
        ]
      }
      serie: {
        Row: {
          id: string
          id_workout_line: string | null
          ordre: number
        }
        Insert: {
          id?: string
          id_workout_line?: string | null
          ordre: number
        }
        Update: {
          id?: string
          id_workout_line?: string | null
          ordre?: number
        }
        Relationships: [
          {
            foreignKeyName: "serie_id_workout_line_fkey"
            columns: ["id_workout_line"]
            isOneToOne: false
            referencedRelation: "workout_line"
            referencedColumns: ["id"]
          },
        ]
      }
      user_exo_preference: {
        Row: {
          created_at: string | null
          id: string
          id_exo: string | null
          is_hidden: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          id_exo?: string | null
          is_hidden?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          id_exo?: string | null
          is_hidden?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_exo_preference_id_exo_fkey"
            columns: ["id_exo"]
            isOneToOne: false
            referencedRelation: "exo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_exo_preference_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profil"
            referencedColumns: ["id"]
          },
        ]
      }
      user_ui_preference: {
        Row: {
          color_mode: string
          theme: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          color_mode?: string
          theme?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          color_mode?: string
          theme?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_ui_preference_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profil"
            referencedColumns: ["id"]
          },
        ]
      }
      workout: {
        Row: {
          date: string
          id: string
          id_categorie: string | null
          user_id: string | null
        }
        Insert: {
          date: string
          id?: string
          id_categorie?: string | null
          user_id?: string | null
        }
        Update: {
          date?: string
          id?: string
          id_categorie?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_id_categorie_fkey"
            columns: ["id_categorie"]
            isOneToOne: false
            referencedRelation: "categorie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profil"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_line: {
        Row: {
          id: string
          id_exo: string | null
          id_workout: string | null
        }
        Insert: {
          id?: string
          id_exo?: string | null
          id_workout?: string | null
        }
        Update: {
          id?: string
          id_exo?: string | null
          id_workout?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_line_id_exo_fkey"
            columns: ["id_exo"]
            isOneToOne: false
            referencedRelation: "exo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_line_id_workout_fkey"
            columns: ["id_workout"]
            isOneToOne: false
            referencedRelation: "workout"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
