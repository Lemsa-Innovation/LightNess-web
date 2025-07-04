"use client";
import { BlogCard } from "@/components/@materialApp/blogs/cards";
import { PlusIcon } from "@/components/@materialUI/icons/iconify";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Blog } from "@/firebase/firestore";
import {
  getCollectionRef,
  useCollectionSnapshots,
} from "@/firebase/firestore/modules";
import { Button } from "@heroui/react";
import { collectionIds } from "@shared/modules";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
function Page() {
  const { languageData } = useLanguage();
  const blogs = languageData?.inputs.blogs;
  const action = languageData?.inputs.blogs.actions.addBlog;
  const dataRef = useMemo(() => getCollectionRef(collectionIds.blogs), []);
  const { data } = useCollectionSnapshots<Blog>(dataRef);
  const { push } = useRouter();
  const onCreateBlog = () => {
    push("/blogs/create");
  };
  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-bold">{blogs?.labels.title}</p>
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
        {data?.length === 0 ? (
          <p className="text-sm font-light">{blogs?.labels.empty}</p>
        ) : (
          data?.map((blog) => <BlogCard key={blog.ref.id} blog={blog} />)
        )}
      </div>
    </div>
  );
}

export default Page;
