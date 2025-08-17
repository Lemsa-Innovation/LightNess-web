import { AddButton, BackButton } from "@/components/@materialUI/buttons";
import {
  InputCheckbox,
  InputText,
  SubmitButton,
  InputNumber,
  InputImageCard,
  InputLanguage,
} from "@/components/@materialUI";
import { Blog } from "@/types/database";
import {
  createBlog,
  updateBlog,
  uploadBlogImageToStorage,
} from "@/hooks/useSupabaseBlogs";
import { useClientSide } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";
import { Card, CardBody, Chip, Select } from "@heroui/react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useRef } from "react";
import Quill from "quill";
import { QuillEditor } from "@/components/@materialUI/inputs/quill";
import * as z from "zod";

// Validation schema for Supabase blogs
const blogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  cover_image: z
    .union([z.string(), z.instanceof(File)])
    .nullable()
    .optional(),
  published: z.boolean().nullable().optional(),
  read_time: z.number().min(1, "Read time must be at least 1 minute"),
  is_featured: z.boolean().nullable().optional(),
  count_of_views: z.number().nullable().optional(),
  language: z
    .enum(["fr", "ar", "en", "es", "de", "it", "pt", "ru", "zh"])
    .nullable()
    .optional(),
  tag: z.string().optional(), // For adding new tags
});

type BlogValidation = z.infer<typeof blogValidationSchema>;

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
        language: props.blog.language,
        title: props.blog.title,
        is_featured: props.blog.is_featured,
        read_time: props.blog.read_time,
        cover_image: props.blog.cover_image_url,
        content: props.blog.content,
        tags: props.blog.tags,
        published: props.blog.published,
        author: props.blog.author,
      };
    }
    return {
      is_featured: false,
      read_time: 10,
      published: false,
      tags: [],
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
    resolver: zodResolver(blogValidationSchema),
    defaultValues: getDefaultValue(),
  });
  const quillRef = useRef<Quill>(null);

  const { isClient } = useClientSide();
  const [onSubmit, isLoading] = useLoadingCallback(
    async (data: BlogValidation) => {
      try {
        // Handle image upload if it's a File object
        let coverImageUrl = data.cover_image;

        if (data.cover_image instanceof File) {
          const imagePath = `blogs/${Date.now()}_${data.cover_image.name}`;
          coverImageUrl = await uploadBlogImageToStorage(
            data.cover_image,
            imagePath
          );
        }

        const blogData = {
          title: data.title,
          content: data.content,
          author: data.author,
          tags: data.tags,
          cover_image_url: coverImageUrl as string,
          published: data.published,
          read_time: data.read_time,
          is_featured: data.is_featured,
          count_of_views: data.count_of_views,
          language: data.language,
        };

        if (type === "create") {
          await createBlog(blogData);
          reset({
            is_featured: false,
            read_time: 10,
            published: false,
            tags: [],
          });
        } else {
          await updateBlog(props.blog.id, blogData);
        }
        toast.success(action?.toast.success || "Blog saved successfully");
      } catch (error) {
        toast.error(action?.toast.error || "Failed to save blog");
      }
    },
    [type, action]
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
                  name="is_featured"
                  label={fields?.isFeatured?.label || "Featured"}
                  description={
                    fields?.isFeatured?.description || "Mark as featured blog"
                  }
                />
              </div>
              <div className="col-span-6">
                <InputNumber
                  control={control}
                  name="read_time"
                  field={fields?.readTime}
                />
              </div>
            </div>
            <InputText control={control} name="author" field={fields?.author} />
            <InputLanguage control={control} />
            <div className="flex gap-2">
              <InputText
                control={control}
                name="tag"
                field={fields?.tags}
                handleKeyUp={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  tag && onAddTag(tag);
                }}
              />
              <AddButton onPress={() => tag && onAddTag(tag)} />
            </div>
            <div className="flex flex-row gap-3 flex-wrap">
              {tags?.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
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
            name="cover_image"
            field={{
              label: fields?.coverImageUrl?.label || "Cover Image",
              placeholder: {
                upload:
                  fields?.coverImageUrl?.placeholder?.upload ||
                  "Upload cover image",
                update:
                  fields?.coverImageUrl?.placeholder?.update ||
                  "Update cover image",
              },
              toastUploading: {
                error:
                  fields?.coverImageUrl?.toastUploading?.error ||
                  "Failed to upload cover image",
                success:
                  fields?.coverImageUrl?.toastUploading?.success ||
                  "Cover image uploaded successfully",
              },
              rules: {
                isRequired:
                  fields?.coverImageUrl?.rules?.isRequired ||
                  "Cover image is optional",
              },
            }}
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
