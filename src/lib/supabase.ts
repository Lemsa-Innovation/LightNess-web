import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  // Log minimal info to avoid leaking secrets
  console.log(
    "🔧 [supabase] Missing envs:",
    JSON.stringify({ hasUrl: !!supabaseUrl, hasAnon: !!supabaseAnonKey })
  );
}

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

console.log(
  "🔧 [supabase] Browser client created",
  JSON.stringify({
    urlDomain: supabaseUrl?.split("//")[1]?.split(".")?.slice(-2).join("."),
    hasAnon: !!supabaseAnonKey,
  })
);

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
  const start = performance.now?.() ?? Date.now();
  let users: any[] | null = null;
  let error: any = null;
  try {
    const result = (await Promise.race([
      supabase.from("users").select(
        `
      *,
      user_roles (
        role
      )
    `
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("getAllUsers timeout")), 10000)
      ),
    ])) as any;
    users = result?.data ?? null;
    error = result?.error ?? null;
  } catch (e) {
    error = e instanceof Error ? e : new Error("getAllUsers failed");
  }
  const durationMs = (performance.now?.() ?? Date.now()) - start;
  console.log(
    "⏱️ [getAllUsers] durationMs, hasError, count",
    JSON.stringify({ durationMs, hasError: !!error, count: users?.length || 0 })
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
  const start = performance.now?.() ?? Date.now();
  let user: any = null;
  let error: any = null;
  try {
    const result = (await Promise.race([
      supabase
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
        .single(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("getUserById timeout")), 8000)
      ),
    ])) as any;
    user = result?.data ?? null;
    error = result?.error ?? null;
  } catch (e) {
    error = e instanceof Error ? e : new Error("getUserById failed");
  }
  const durationMs = (performance.now?.() ?? Date.now()) - start;
  console.log(
    "⏱️ [getUserById] durationMs, hasError",
    JSON.stringify({ durationMs, hasError: !!error })
  );

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
