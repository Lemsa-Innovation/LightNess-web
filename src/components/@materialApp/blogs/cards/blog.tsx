import { DisplayImage } from "@/components/@materialUI/images";
import { Blog } from "@/firebase/firestore";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { formatDate } from "date-fns";
import { useRouter } from "next/navigation";

function BlogCard({
  blog: { createdAt, readTime, title, ref, coverImageUrl },
}: {
  blog: Blog;
}) {
  const { push } = useRouter();
  return (
    <Card
      isPressable
      key={ref.id}
      className="col-span-4"
      onPress={() => push(`/blogs/${ref.id}`)}
    >
      <CardHeader className="text-start absolute z-10 top-1 font-semibold">
        {title}
      </CardHeader>
      {coverImageUrl && <DisplayImage className="z-0" src={coverImageUrl} />}
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
