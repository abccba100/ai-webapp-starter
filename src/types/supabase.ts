export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          name: string;
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ideas: {
        Row: {
          id: string;
          project_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          content?: string;
          created_at?: string;
        };
      };
      specifications: {
        Row: {
          id: string;
          idea_id: string;
          specs: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          idea_id: string;
          specs: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          idea_id?: string;
          specs?: Json;
          created_at?: string;
        };
      };
      specs: {
        Row: {
          id: string;
          project_id: string;
          raw_input: string;
          ai_output: Json;
          revision_count: number;
          design_locked: boolean;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          raw_input: string;
          ai_output: Json;
          revision_count?: number;
          design_locked?: boolean;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          raw_input?: string;
          ai_output?: Json;
          revision_count?: number;
          design_locked?: boolean;
          approved?: boolean;
          created_at?: string;
        };
      };
    };
  };
}
