"use client";
import "quill/dist/quill.core.css";
import { use, useMemo, useState, useEffect } from "react";
import { Blog } from "@/types/database";
import { getBlogById } from "@/hooks/useSupabaseBlogs";
import { BlogForm } from "@/components/@materialApp/blogs/forms/blogForm";

function Page({ params }: { params: Promise<{ slugs: string[] }> }) {
  const { slugs } = use(params);
  const blogId = slugs.at(0);
  const type = blogId === "create" ? "create" : "update";

  const renderContent = useMemo(() => {
    if (type === "create") {
      return <BlogForm type="create" />;
    } else if (blogId) {
      return <UpdateBlogForm blogId={blogId} />;
    }
  }, [type, blogId]);

  return <>{renderContent}</>;
}

function UpdateBlogForm({ blogId }: { blogId: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const blogData = await getBlogById(blogId);
        setBlog(blogData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch blog")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-4">
        <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 py-4">
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Error loading blog: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col gap-4 py-4">
        <div className="w-full p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">Blog not found</p>
        </div>
      </div>
    );
  }

  return <BlogForm type="update" blog={blog} />;
}

export default Page;
