import { createClient } from "@/utils/supabase/client";

// Retry wrapper for Supabase calls to handle intermittent timeouts
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries}`);
      const result = await operation();
      console.log(`✅ Success on attempt ${attempt}`);
      return result;
    } catch (error) {
      lastError = error as Error;
      console.log(`❌ Attempt ${attempt} failed:`, error);

      // Don't retry on certain errors
      if (error instanceof Error) {
        if (
          error.message.includes("permission denied") ||
          error.message.includes("invalid credentials") ||
          error.message.includes("not found")
        ) {
          throw error; // Don't retry auth/permission errors
        }
      }

      if (attempt < maxRetries) {
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
  }

  throw lastError!;
}

// Example usage in your hooks:
export async function fetchUsersWithRetry() {
  const supabase = createClient();

  return withRetry(async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, first_name, last_name")
      .limit(5);

    if (error) throw error;
    return data;
  });
}

