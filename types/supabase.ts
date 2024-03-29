export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      aggregation: {
        Row: {
          address: string | null
          id: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          id?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aggregation_address_fkey"
            columns: ["address"]
            isOneToOne: false
            referencedRelation: "aggregation_points"
            referencedColumns: ["address"]
          },
          {
            foreignKeyName: "aggregation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      aggregation_points: {
        Row: {
          address: string
          id: string
          list_incoming_package: string[] | null
          list_outgoing_package: string[] | null
          name: string | null
          phone: string | null
          zipcode: string | null
        }
        Insert: {
          address: string
          id?: string
          list_incoming_package?: string[] | null
          list_outgoing_package?: string[] | null
          name?: string | null
          phone?: string | null
          zipcode?: string | null
        }
        Update: {
          address?: string
          id?: string
          list_incoming_package?: string[] | null
          list_outgoing_package?: string[] | null
          name?: string | null
          phone?: string | null
          zipcode?: string | null
        }
        Relationships: []
      }
      packageDetails: {
        Row: {
          code: string | null
          created_at: string
          id: string
          notes: string | null
          package_info: string | null
          receiver_address: string
          receiver_name: string | null
          receiver_phone_no: string | null
          sender_address: string | null
          sender_name: string | null
          sender_phone_no: string | null
          totalCharge: number | null
          totalWeight: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id: string
          notes?: string | null
          package_info?: string | null
          receiver_address: string
          receiver_name?: string | null
          receiver_phone_no?: string | null
          sender_address?: string | null
          sender_name?: string | null
          sender_phone_no?: string | null
          totalCharge?: number | null
          totalWeight?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          package_info?: string | null
          receiver_address?: string
          receiver_name?: string | null
          receiver_phone_no?: string | null
          sender_address?: string | null
          sender_name?: string | null
          sender_phone_no?: string | null
          totalCharge?: number | null
          totalWeight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "packageDetails_code_fkey"
            columns: ["code"]
            isOneToOne: true
            referencedRelation: "packages"
            referencedColumns: ["code"]
          }
        ]
      }
      packages: {
        Row: {
          code: string | null
          created_at: string
          current_location: string | null
          id: string
          status: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          current_location?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          current_location?: string | null
          id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packages_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "status"
            referencedColumns: ["Status"]
          }
        ]
      }
      packageStatus: {
        Row: {
          code: string | null
          created_at: string
          current_location: string | null
          id: string
          status: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          current_location?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          current_location?: string | null
          id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packageStatus_code_fkey"
            columns: ["code"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "packageStatus_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "status"
            referencedColumns: ["Status"]
          }
        ]
      }
      roles: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      status: {
        Row: {
          created_at: string
          Status: string
        }
        Insert: {
          created_at?: string
          Status?: string
        }
        Update: {
          created_at?: string
          Status?: string
        }
        Relationships: []
      }
      transaction: {
        Row: {
          address: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_address_fkey"
            columns: ["address"]
            isOneToOne: false
            referencedRelation: "transaction_points"
            referencedColumns: ["address"]
          },
          {
            foreignKeyName: "transaction_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction_points: {
        Row: {
          address: string
          aggregation_address: string | null
          id: string
          name: string | null
          phone: string | null
          zipcode: string | null
        }
        Insert: {
          address: string
          aggregation_address?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          zipcode?: string | null
        }
        Update: {
          address?: string
          aggregation_address?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          zipcode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_points_aggregation_address_fkey"
            columns: ["aggregation_address"]
            isOneToOne: false
            referencedRelation: "aggregation_points"
            referencedColumns: ["address"]
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          id: string
          name: string | null
          phone: string | null
          role: string | null
        }
        Insert: {
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          role?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["name"]
          }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
