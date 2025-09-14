import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Helper function to get user with role
export async function getUserWithRole(userId: string) {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) return { user: null, role: null, error: userError };

  const { data: role, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  return {
    user,
    role: role?.role || "user",
    error: roleError,
  };
}

// Helper function to check if user is admin
export function isAdmin(role?: string): boolean {
  return role === "admin" || role === "super_admin";
}

// Helper function to check if user is super admin
export function isSuperAdmin(role?: string): boolean {
  return role === "super_admin";
}

// Helper function to get all users with their roles
export async function getAllUsers() {
  const { data: users, error } = await supabase.from("users").select(`
      *,
      user_roles (
        role
      )
    `);

  if (error) {
    console.error("Error fetching users:", error);
    return { users: [], error };
  }

  return {
    users:
      users?.map((user) => ({
        ...user,
        role: user.user_roles?.role || "user",
      })) || [],
    error: null,
  };
}

// Helper function to get a single user by ID
export async function getUserById(userId: string) {
  const { data: user, error } = await supabase
    .from("users")
    .select(
      `
      *,
      user_roles (
        role
      )
    `
    )
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return { user: null, error };
  }

  return {
    user: user
      ? {
          ...user,
          role: user.user_roles?.role || "user",
        }
      : null,
    error: null,
  };
}
