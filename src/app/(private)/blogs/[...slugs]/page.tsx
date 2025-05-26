"use client";
import "quill/dist/quill.core.css";
import { use, useMemo } from "react";
import { Blog, getBlogRef } from "@/firebase/firestore/collections/blogs";
import { useDocumentQuery } from "@/firebase/firestore/modules";
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
  const { data: blog } = useDocumentQuery<Blog>({
    docRef: getBlogRef(blogId),
    queryKey: ["blog", blogId],
  });
  if (!blog) return null;
  return <BlogForm type="update" blog={blog} />;
}
export default Page;
