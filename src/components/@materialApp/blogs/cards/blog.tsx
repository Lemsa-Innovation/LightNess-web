import { ConfirmModal, TrashIcon } from "@/components/@materialUI";
import { DisplayImage } from "@/components/@materialUI/images";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Blog, deleteBlog } from "@/firebase/firestore";
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

function BlogCard({
  blog: { createdAt, readTime, title, ref, coverImageUrl },
}: {
  blog: Blog;
}) {
  const { push } = useRouter();
  const deletModalProps = useDisclosure();

  const { languageData } = useLanguage();
  const action = languageData?.inputs.blogs.actions.deleteBlog;

  const [handleConfirmDelete, isLoading] = useLoadingCallback(async () => {
    await deleteBlog(ref.id);
  }, []);

  return (
    <Card
      isPressable
      key={ref.id}
      className="col-span-4"
      onPress={() => push(`/blogs/${ref.id}`)}
    >
      <CardHeader className="flex justify-between text-start absolute z-10 top-1 font-semibold">
        {title}
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
        <DisplayImage className="z-0" src={coverImageUrl} />
      </div>
      <CardFooter>
        <p className="text-primary">
          {formatDate(createdAt.toDate(), "MMM dd")}
          <span> - {readTime} min de lecture</span>
        </p>
      </CardFooter>
    </Card>
  );
}

export { BlogCard };
