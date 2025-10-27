import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Blog } from "@/types/database";

export function useSupabaseBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(new Error(fetchError.message));
      } else {
        setBlogs(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch blogs"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { blogs, isLoading, error, refetch: fetchBlogs };
}

export async function createBlog(blogData: {
  title: string;
  content: string;
  author?: string | null;
  tags?: string[] | null;
  cover_image_url?: string | null;
  published?: boolean | null;
  read_time?: number | null;
  is_featured?: boolean | null;
  count_of_views?: number | null;
  language?: Blog["language"];
}) {
  const insertPayload: Partial<Blog> = {
    title: blogData.title,
    content: blogData.content,
    author: blogData.author ?? null,
    tags: blogData.tags ?? null,
    cover_image_url: blogData.cover_image_url ?? null,
    published: blogData.published ?? null,
    read_time: blogData.read_time ?? null,
    is_featured: blogData.is_featured ?? null,
    count_of_views: blogData.count_of_views ?? null,
    language: blogData.language ?? null,
  };
  const client = supabase as any;
  const { data, error } = await client
    .from("blogs")
    .insert([insertPayload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Blog;
}

export async function updateBlog(
  id: string,
  blogData: {
    title?: string;
    content?: string;
    author?: string | null;
    tags?: string[] | null;
    cover_image_url?: string | null;
    published?: boolean | null;
    read_time?: number | null;
    is_featured?: boolean | null;
    count_of_views?: number | null;
    language?: Blog["language"];
  }
) {
  const updatePayload: Partial<Blog> = {
    title: blogData.title,
    content: blogData.content,
    author: blogData.author,
    tags: blogData.tags,
    cover_image_url: blogData.cover_image_url,
    published: blogData.published,
    read_time: blogData.read_time,
    is_featured: blogData.is_featured,
    count_of_views: blogData.count_of_views,
    language: blogData.language ?? null,
  };
  const client = supabase as any;
  const { data, error } = await client
    .from("blogs")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Blog;
}

export async function deleteBlog(id: string) {
  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getBlogById(id: string): Promise<Blog> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Blog;
}

export async function uploadBlogImageToStorage(file: File, path: string) {
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
