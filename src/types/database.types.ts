export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          id: string;
          name: string;
          code: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          description?: string | null;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string; // references auth.users.id
          role: "super_admin" | "departemen" | "user";
          department_id: string | null;
          full_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: "super_admin" | "departemen" | "user";
          department_id?: string | null;
          full_name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          role?: "super_admin" | "departemen" | "user";
          department_id?: string | null;
          full_name?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      monthly_cash_targets: {
        Row: {
          id: string;
          department_id: string;
          month: number; // 1-12
          year: number;
          target_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          department_id: string;
          month: number;
          year: number;
          target_amount: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          target_amount?: number;
          updated_at?: string;
        };
      };
      cash_transactions: {
        Row: {
          id: string;
          department_id: string;
          amount: number;
          month: number;
          year: number;
          proof_image_url: string; // Cloudinary secure URL
          description: string;
          submitted_by: string;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          department_id: string;
          amount: number;
          month: number;
          year: number;
          proof_image_url: string;
          description: string;
          submitted_by: string;
          is_approved?: boolean;
          created_at?: string;
        };
        Update: {
          amount?: number;
          description?: string;
          is_approved?: boolean;
        };
      };
      events: {
        Row: {
          id: string;
          department_id: string;
          title: string;
          description: string | null;
          event_date: string;
          location: string;
          status: "scheduled" | "completed" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          department_id: string;
          title: string;
          description?: string | null;
          event_date: string;
          location: string;
          status?: "scheduled" | "completed" | "cancelled";
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          event_date?: string;
          location?: string;
          status?: "scheduled" | "completed" | "cancelled";
        };
      };
      lpj_submissions: {
        Row: {
          id: string;
          department_id: string;
          event_id: string | null;
          title: string;
          file_url: string; // Cloudinary URL
          status: "pending" | "approved" | "revision";
          feedback: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          department_id: string;
          event_id?: string | null;
          title: string;
          file_url: string;
          status?: "pending" | "approved" | "revision";
          feedback?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          file_url?: string;
          status?: "pending" | "approved" | "revision";
          feedback?: string | null;
          updated_at?: string;
        };
      };
      performance_records: {
        Row: {
          id: string;
          department_id: string;
          month: number;
          year: number;
          score: number;
          cash_percentage: number;
          lpj_score: number;
          event_score: number;
          best_cadre_name: string | null;
          best_cadre_photo_url: string | null; // Cloudinary URL
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          department_id: string;
          month: number;
          year: number;
          score?: number;
          cash_percentage?: number;
          lpj_score?: number;
          event_score?: number;
          best_cadre_name?: string | null;
          best_cadre_photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          score?: number;
          cash_percentage?: number;
          lpj_score?: number;
          event_score?: number;
          best_cadre_name?: string | null;
          best_cadre_photo_url?: string | null;
          updated_at?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          module: string;
          details: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          module: string;
          details?: Json | null;
          created_at?: string;
        };
      };
    };
  };
}
