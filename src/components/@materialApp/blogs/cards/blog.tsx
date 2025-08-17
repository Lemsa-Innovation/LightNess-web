import { ConfirmModal, TrashIcon } from "@/components/@materialUI";
import { DisplayImage } from "@/components/@materialUI/images";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Blog } from "@/types/database";
import { deleteBlog } from "@/hooks/useSupabaseBlogs";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { formatDate } from "date-fns";
import { useRouter } from "next/navigation";
import { useLoadingCallback } from "react-loading-hook";

function BlogCard({ blog, onSuccess }: { blog: Blog; onSuccess?: () => void }) {
  const { push } = useRouter();
  const deletModalProps = useDisclosure();

  const { languageData } = useLanguage();
  const action = languageData?.inputs.blogs.actions.deleteBlog;

  const [handleConfirmDelete, isLoading] = useLoadingCallback(async () => {
    await deleteBlog(blog.id);
    onSuccess?.();
  }, [blog.id, onSuccess]);

  return (
    <Card
      isPressable
      key={blog.id}
      className="col-span-4"
      onPress={() => push(`/blogs/${blog.id}`)}
    >
      <CardHeader className="flex justify-between text-start absolute z-10 top-1 font-semibold">
        {blog.title}
        <div>
          <Button
            color="danger"
            isIconOnly
            startContent={<TrashIcon />}
            onPress={deletModalProps.onOpen}
          />
          <ConfirmModal
            action={action}
            modalProps={deletModalProps}
            isLoading={isLoading}
            handleConfirm={handleConfirmDelete}
          />
        </div>
      </CardHeader>
      <div className="w-full min-h-60">
        <DisplayImage className="z-0" src={blog.cover_image_url} />
      </div>
      <CardFooter>
        <p className="text-primary">
          {blog.created_at
            ? formatDate(new Date(blog.created_at), "MMM dd")
            : ""}
          <span> - {blog.read_time || 0} min de lecture</span>
        </p>
      </CardFooter>
    </Card>
  );
}

export { BlogCard };
