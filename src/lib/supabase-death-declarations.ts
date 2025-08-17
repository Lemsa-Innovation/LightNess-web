import { supabase } from "./supabase";

// Validate death declaration (approve)
export async function validateDeathDeclaration(
  declarationUids: string[],
  matchedUid: string
) {
  const { data, error } = await supabase
    .from("death_declarations")
    .update({
      status: "approved",
    })
    .in("uid", declarationUids);

  if (error) {
    console.error("Error validating death declarations:", error);
    return { data: null, error };
  }
  // Get the current session for authentication
  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    // Use Supabase client's function invocation which handles CORS automatically
    const response = await supabase.functions.invoke(
      "death_declaration_notification",
      {
        body: { matched_uid: matchedUid },
      }
    );

    if (response.error) {
      console.error("Notification error:", response.error);
    } else {
      console.log("Notification response:", response.data);
    }
  } catch (error) {
    console.error("Failed to send death declaration notification:", error);
    console.warn("Continuing despite notification error");
  }

  return { data, error: null };
}

// Reject death declaration
export async function rejectDeathDeclaration(declarationUids: string[]) {
  const { data, error } = await supabase
    .from("death_declarations")
    .update({
      status: "rejected",
    })
    .in("uid", declarationUids);

  if (error) {
    console.error("Error rejecting death declarations:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

// Mark user as dead (update user table)
export async function markUserAsDead(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .update({
      is_dead: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    console.error("Error marking user as dead:", error);
    return { data: null, error };
  }

  return { data, error: null };
}
