import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Announcement } from "@/types/database";

export function useSupabaseAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(new Error(fetchError.message));
      } else {
        setAnnouncements(data || []);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch announcements")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return { announcements, isLoading, error, refetch: fetchAnnouncements };
}

export async function createAnnouncement(announcementData: {
  image: string;
  full_image?: string;
  language?: Announcement["language"];
}) {
  const insertPayload: Partial<Announcement> = {
    image: announcementData.image,
    full_image: announcementData.full_image,
    language: announcementData.language,
  };
  const client = supabase as any;
  const { data, error } = await client
    .from("announcements")
    .insert([insertPayload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Announcement;
}

export async function uploadImageToStorage(file: File, path: string) {
  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Authentication required for file upload");
  }

  // Upload the file
  const { data, error } = await supabase.storage
    .from("storage")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from("storage")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

export async function updateAnnouncement(
  id: string,
  announcementData: {
    image?: string;
    full_image?: string;
    language?: Announcement["language"];
  }
) {
  const updatePayload: Partial<Announcement> = {
    image: announcementData.image,
    full_image: announcementData.full_image,
    language: announcementData.language,
  };
  const client = supabase as any;
  const { data, error } = await client
    .from("announcements")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Announcement;
}

export async function deleteAnnouncement(id: string) {
  const { error } = await supabase.from("announcements").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
