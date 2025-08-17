export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          uid: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          phone_number: string | null;
          secondary_phone_numbers: string[] | null;
          secondary_email: string | null;
          country_code: string | null;
          country_id: string | null;
          birthday: string | null;
          gender: "women" | "men" | null;
          photo_url: string | null;
          avatar_image: string | null;
          estimated_survival_time: number | null;
          invited_by: string | null;
          is_dead: boolean;
          is_washer: boolean;
          has_funeral_profile: boolean;
          account_status:
            | "pending_verification"
            | "active"
            | "suspended"
            | "deleted";
          language: "fr" | "en" | "ar";
          place_of_death_country_of_residence: string[] | null;
          place_of_death_abroad: string[] | null;
          burial_exceptions_local: string[] | null;
          ritual_washing: string[] | null;
          janaza_prayer_location: string[] | null;
          choice_by_another: string[] | null;
          favorite_washers: string[];
          favorite_funeral_companies: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          uid: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          phone_number?: string | null;
          secondary_phone_numbers?: string[] | null;
          secondary_email?: string | null;
          country_code?: string | null;
          country_id?: string | null;
          birthday?: string | null;
          gender?: "women" | "men" | null;
          photo_url?: string | null;
          avatar_image?: string | null;
          estimated_survival_time?: number | null;
          invited_by?: string | null;
          is_dead?: boolean;
          is_washer?: boolean;
          has_funeral_profile?: boolean;
          account_status?:
            | "pending_verification"
            | "active"
            | "suspended"
            | "deleted";
          language?: "fr" | "en" | "ar";
          place_of_death_country_of_residence?: string[] | null;
          place_of_death_abroad?: string[] | null;
          burial_exceptions_local?: string[] | null;
          ritual_washing?: string[] | null;
          janaza_prayer_location?: string[] | null;
          choice_by_another?: string[] | null;
          favorite_washers?: string[];
          favorite_funeral_companies?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          uid?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          phone_number?: string | null;
          secondary_phone_numbers?: string[] | null;
          secondary_email?: string | null;
          country_code?: string | null;
          country_id?: string | null;
          birthday?: string | null;
          gender?: "women" | "men" | null;
          photo_url?: string | null;
          avatar_image?: string | null;
          estimated_survival_time?: number | null;
          invited_by?: string | null;
          is_dead?: boolean;
          is_washer?: boolean;
          has_funeral_profile?: boolean;
          account_status?:
            | "pending_verification"
            | "active"
            | "suspended"
            | "deleted";
          language?: "fr" | "en" | "ar";
          place_of_death_country_of_residence?: string[] | null;
          place_of_death_abroad?: string[] | null;
          burial_exceptions_local?: string[] | null;
          ritual_washing?: string[] | null;
          janaza_prayer_location?: string[] | null;
          choice_by_another?: string[] | null;
          favorite_washers?: string[];
          favorite_funeral_companies?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          role?: string;
          created_at?: string;
        };
      };
      washer_profiles: {
        Row: {
          uid: string;
          user_id: string;
          email: string | null;
          image: string | null;
          fullname: string;
          address: string;
          region: string;
          available: boolean;
          status: "active" | "inactive" | "suspended";
          latitude: number | null;
          longitude: number | null;
          phone_number: string;
          secondary_phone_numbers: string[] | null;
          gender: "women" | "men";
          attachment_path: string | null;
          is_validated_identity: boolean;
          is_validated_certification: boolean;
          witnesses: Json | null;
          total_reviews: number;
          average_reviews: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          uid?: string;
          user_id: string;
          email?: string | null;
          image?: string | null;
          fullname: string;
          address: string;
          region: string;
          available?: boolean;
          status?: "active" | "inactive" | "suspended";
          latitude?: number | null;
          longitude?: number | null;
          phone_number: string;
          secondary_phone_numbers?: string[] | null;
          gender: "women" | "men";
          attachment_path?: string | null;
          is_validated_identity?: boolean;
          is_validated_certification?: boolean;
          witnesses?: Json | null;
          total_reviews?: number;
          average_reviews?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          uid?: string;
          user_id?: string;
          email?: string | null;
          image?: string | null;
          fullname?: string;
          address?: string;
          region?: string;
          available?: boolean;
          status?: "active" | "inactive" | "suspended";
          latitude?: number | null;
          longitude?: number | null;
          phone_number?: string;
          secondary_phone_numbers?: string[] | null;
          gender?: "women" | "men";
          attachment_path?: string | null;
          is_validated_identity?: boolean;
          is_validated_certification?: boolean;
          witnesses?: Json | null;
          total_reviews?: number;
          average_reviews?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      funeral_company_profiles: {
        Row: {
          uid: string;
          user_id: string;
          image: string | null;
          company_name: string;
          email: string;
          phone_number: string;
          address: string;
          website: string | null;
          secondary_phone_numbers: string[] | null;
          operating_hours: string | null;
          services: string | null;
          available: boolean;
          region: string;
          status: "active" | "inactive" | "suspended";
          latitude: number | null;
          longitude: number | null;
          attachment_path: string | null;
          is_validated_identity: boolean;
          is_validated_certification: boolean;
          witnesses: Json | null;
          total_reviews: number;
          average_reviews: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          uid?: string;
          user_id: string;
          image?: string | null;
          company_name: string;
          email: string;
          phone_number: string;
          address: string;
          website?: string | null;
          secondary_phone_numbers?: string[] | null;
          operating_hours?: string | null;
          services?: string | null;
          available?: boolean;
          region: string;
          status?: "active" | "inactive" | "suspended";
          latitude?: number | null;
          longitude?: number | null;
          attachment_path?: string | null;
          is_validated_identity?: boolean;
          is_validated_certification?: boolean;
          witnesses?: Json | null;
          total_reviews?: number;
          average_reviews?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          uid?: string;
          user_id?: string;
          image?: string | null;
          company_name?: string;
          email?: string;
          phone_number?: string;
          address?: string;
          website?: string | null;
          secondary_phone_numbers?: string[] | null;
          operating_hours?: string | null;
          services?: string | null;
          available?: boolean;
          region?: string;
          status?: "active" | "inactive" | "suspended";
          latitude?: number | null;
          longitude?: number | null;
          attachment_path?: string | null;
          is_validated_identity?: boolean;
          is_validated_certification?: boolean;
          witnesses?: Json | null;
          total_reviews?: number;
          average_reviews?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          reviewer_id: string;
          entity_id: string;
          entity_type: string;
          full_name: string;
          rating: number | null;
          comment: string | null;
          contact: string | null;
          questions: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          reviewer_id: string;
          entity_id: string;
          entity_type: string;
          full_name: string;
          rating?: number | null;
          comment?: string | null;
          contact?: string | null;
          questions?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          reviewer_id?: string;
          entity_id?: string;
          entity_type?: string;
          full_name?: string;
          rating?: number | null;
          comment?: string | null;
          contact?: string | null;
          questions?: Json | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          body: string;
          type: string;
          data: Json | null;
          is_read: boolean;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          body: string;
          type: string;
          data?: Json | null;
          is_read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          body?: string;
          type?: string;
          data?: Json | null;
          is_read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          image: string;
          full_image: string | null;
          language:
            | "fr"
            | "ar"
            | "en"
            | "es"
            | "de"
            | "it"
            | "pt"
            | "ru"
            | "zh";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image: string;
          full_image?: string | null;
          language?:
            | "fr"
            | "ar"
            | "en"
            | "es"
            | "de"
            | "it"
            | "pt"
            | "ru"
            | "zh";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image?: string;
          full_image?: string | null;
          language?:
            | "fr"
            | "ar"
            | "en"
            | "es"
            | "de"
            | "it"
            | "pt"
            | "ru"
            | "zh";
          created_at?: string;
          updated_at?: string;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          content: string;
          author: string | null;
          tags: string[] | null;
          cover_image_url: string | null;
          published: boolean | null;
          read_time: number | null;
          is_featured: boolean | null;
          count_of_views: number | null;
          language:
            | "fr"
            | "ar"
            | "en"
            | "es"
            | "de"
            | "it"
            | "pt"
            | "ru"
            | "zh"
            | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author?: string | null;
          tags?: string[] | null;
          cover_image_url?: string | null;
          published?: boolean | null;
          read_time?: number | null;
          is_featured?: boolean | null;
          count_of_views?: number | null;
          language?:
            | "fr"
            | "ar"
            | "en"
            | "es"
            | "de"
            | "it"
            | "pt"
            | "ru"
            | "zh"
            | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          author?: string | null;
          tags?: string[] | null;
          cover_image_url?: string | null;
          published?: boolean | null;
          read_time?: number | null;
          is_featured?: boolean | null;
          count_of_views?: number | null;
          language?:
            | "fr"
            | "ar"
            | "en"
            | "es"
            | "de"
            | "it"
            | "pt"
            | "ru"
            | "zh"
            | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
};

// Type aliases for easier use
export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export type UserRole = Database["public"]["Tables"]["user_roles"]["Row"];
export type UserRoleInsert =
  Database["public"]["Tables"]["user_roles"]["Insert"];
export type UserRoleUpdate =
  Database["public"]["Tables"]["user_roles"]["Update"];

export type WasherProfile =
  Database["public"]["Tables"]["washer_profiles"]["Row"];
export type FuneralCompanyProfile =
  Database["public"]["Tables"]["funeral_company_profiles"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type Announcement = Database["public"]["Tables"]["announcements"]["Row"];
export type AnnouncementInsert =
  Database["public"]["Tables"]["announcements"]["Insert"];
export type AnnouncementUpdate =
  Database["public"]["Tables"]["announcements"]["Update"];

export type Blog = Database["public"]["Tables"]["blogs"]["Row"];
export type BlogInsert = Database["public"]["Tables"]["blogs"]["Insert"];
export type BlogUpdate = Database["public"]["Tables"]["blogs"]["Update"];

// Extended user type with role information
export type UserWithRole = User & {
  role?: string;
};

// Admin types
export type AdminRole = "admin" | "super_admin";
export type AdminUser = UserWithRole & {
  role: AdminRole;
};
