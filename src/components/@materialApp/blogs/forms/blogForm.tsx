import { AddButton, BackButton } from "@/components/@materialUI/buttons";
import {
  InputCheckbox,
  InputText,
  SubmitButton,
  InputNumber,
  InputImageCard,
} from "@/components/@materialUI";
import {
  Blog,
  BlogValidation,
  blogValidations,
  createBlog,
  generateBlogPath,
  updateBlog,
} from "@/firebase/firestore";
import { uploadImageBucket } from "@/firebase/storage";
import { useClientSide } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";
import { Card, CardBody, Chip } from "@heroui/react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useRef } from "react";
import Quill from "quill";
import { QuillEditor } from "@/components/@materialUI/inputs/quill";

function BlogForm(
  props:
    | {
        type: "create";
      }
    | {
        type: "update";
        blog: Blog;
      }
) {
  const { type } = props;
  const { languageData } = useLanguage();
  const fields = languageData?.inputs.blogs.fields;
  const actions = languageData?.inputs.blogs.actions;
  const steps = languageData?.inputs.blogs.steps;
  const action = type === "create" ? actions?.addBlog : actions?.updateBlog;

  const getDefaultValue = (): Partial<BlogValidation> => {
    if (type === "update") {
      return {
        path: props.blog.ref.path,
        title: props.blog.title,
        isFeatured: props.blog.isFeatured,
        readTime: props.blog.readTime,
        coverImage: props.blog.coverImageUrl,
        content: props.blog.content,
        tags: props.blog.tags,
      };
    }
    return {
      path: generateBlogPath(),
      isFeatured: false,
      readTime: 10,
    };
  };
  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isDirty },
  } = useForm<BlogValidation>({
    mode: "onChange",
    resolver: zodResolver(blogValidations),
    defaultValues: getDefaultValue(),
  });
  const quillRef = useRef<Quill>(null);

  const { isClient } = useClientSide();
  const [onSubmit, isLoading] = useLoadingCallback(
    async (data: BlogValidation) => {
      try {
        const { coverImage, ...rest } = data;
        const uploadCoverImage = async () => {
          if (coverImage instanceof File) {
            const imagePath = await uploadImageBucket({
              imagePath: rest.path,
              image: coverImage,
            });
            return imagePath;
          }
        };

        const imagePath = await uploadCoverImage();

        if (type === "create") {
          await createBlog({
            ...rest,
            coverImage: imagePath,
          });
          reset({
            path: generateBlogPath(),
            isFeatured: false,
            readTime: 10,
          });
        } else {
          await updateBlog({
            ...rest,
            coverImage: imagePath,
          });
        }
        toast.success(action?.toast.success);
      } catch (error) {
        toast.error(action?.toast.error);
      }
    }
  );
  const { tag, tags } = watch();

  const onAddTag = (tag: string) => {
    setValue("tags", [...(tags ?? []), tag]);
    setValue("tag", "");
  };
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="w-full flex justify-between items-center">
        <BackButton />
        <SubmitButton
          isLoading={isLoading}
          isDisabled={!isDirty}
          onPress={handleSubmit(onSubmit)}
        />
      </div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-full lg:col-span-4 flex flex-col gap-2">
          <p className="text-lg font-semibold">{steps?.description?.title}</p>
          <p className="text-sm text-default-500 font-medium">
            {steps?.description?.description}
          </p>
        </div>
        <Card className="col-span-full md:col-span-6">
          <CardBody className="flex flex-col gap-4">
            <InputText control={control} name="title" field={fields?.title} />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <InputCheckbox
                  control={control}
                  name="isFeatured"
                  label={fields?.isFeatured.label}
                  description={fields?.isFeatured.description}
                />
              </div>
              <div className="col-span-6">
                <InputNumber
                  control={control}
                  name="readTime"
                  field={fields?.readTime}
                />
              </div>
            </div>
            {/* <InputText control={control} name="author" field={fields?.author} /> */}

            <InputText
              control={control}
              name="tag"
              field={fields?.tags}
              handleKeyUp={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                tag && onAddTag(tag);
              }}
              endContent={<AddButton onPress={() => tag && onAddTag(tag)} />}
            />
            <div className="flex flex-row gap-3 flex-wrap">
              {tags?.map((tag) => <Chip key={tag}>{tag}</Chip>)}
            </div>
          </CardBody>
        </Card>
        <div className="col-span-full lg:col-span-4 flex flex-col gap-2">
          <p className="text-lg font-semibold">{steps?.coverImage?.title}</p>
          <p className="text-sm text-default-500 font-medium">
            {steps?.coverImage?.description}
          </p>
        </div>
        <div className="col-span-full md:col-span-6  flex flex-col gap-4">
          <InputImageCard
            control={control}
            name="coverImage"
            field={fields?.coverImageUrl}
          />
        </div>
        <div className="col-span-full lg:col-span-4 flex flex-col gap-2">
          <p className="text-lg font-semibold">{steps?.content?.title}</p>
          <p className="text-sm text-default-500 font-medium">
            {steps?.content?.description}
          </p>
        </div>
        <Card className="col-span-full md:col-span-6  flex flex-col gap-4">
          {isClient && (
            <QuillEditor
              ref={quillRef}
              control={control}
              name="content"
              defaultValue={type === "update" ? props.blog?.content : ""}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export { BlogForm };
