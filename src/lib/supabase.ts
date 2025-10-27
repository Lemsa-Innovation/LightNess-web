import { createClient } from "@/utils/supabase/client";

// Create a singleton instance for backward compatibility
export const supabase = createClient();

// Helper function to get user with role
export async function getUserWithRole(userId: string) {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) return { user: null, role: null, error: userError };

  const { data: roleRow, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  return {
    user,
    role: (roleRow as any)?.role || "user",
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
  const { data: users, error } = await supabase.from("users").select(
    `
      *,
      user_roles (
        role
      )
    `
  );

  if (error) {
    console.error("Error fetching users:", error);
    return { users: [], error };
  }

  return {
    users:
      users?.map((u) => {
        const base = u as Record<string, unknown>;
        return {
          ...base,
          role: (u as any)?.user_roles?.role || "user",
        } as any;
      }) || [],
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
      ? ({
          ...(user as Record<string, unknown>),
          role: (user as any)?.user_roles?.role || "user",
        } as any)
      : null,
    error: null,
  };
}
