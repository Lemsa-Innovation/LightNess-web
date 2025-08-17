"use client";
import { BlogCard } from "@/components/@materialApp/blogs/cards";
import { PlusIcon } from "@/components/@materialUI/icons/iconify";
import { useLanguage } from "@/contexts/language/LanguageContext";

import { useSupabaseBlogs } from "@/hooks/useSupabaseBlogs";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

function Page() {
  const { blogs, isLoading, error, refetch } = useSupabaseBlogs();
  const { languageData } = useLanguage();
  const blogsData = languageData?.inputs.blogs;
  const action = languageData?.inputs.blogs.actions.addBlog;
  const { push } = useRouter();

  const onCreateBlog = () => {
    push("/blogs/create");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-2xl font-bold">{blogsData?.labels.title}</p>
        </div>
        <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-2xl font-bold">{blogsData?.labels.title}</p>
        </div>
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Error loading blogs: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-bold">{blogsData?.labels.title}</p>
        <Button
          variant="flat"
          color="primary"
          startContent={<PlusIcon className="w-6 h-6" />}
          onPress={onCreateBlog}
        >
          {action?.label}
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {blogs.length === 0 ? (
          <p className="text-sm font-light">{blogsData?.labels.empty}</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onSuccess={refetch} />
          ))
        )}
      </div>
    </div>
  );
}

export default Page;
