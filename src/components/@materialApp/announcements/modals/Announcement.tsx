import {
  CancelButton,
  EditIcon,
  InputLanguage,
  PlusIcon,
  SubmitButton,
} from "@/components/@materialUI";
import { InputImageCard } from "@/components/@materialUI/inputs/images";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Announcement } from "@/types/database";
import {
  createAnnouncement,
  updateAnnouncement,
  uploadImageToStorage,
} from "@/hooks/useSupabaseAnnouncements";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";
import * as z from "zod";

// Validation schema for Supabase announcements
const announcementValidationSchema = z.object({
  image: z.union([z.string().min(1, "Image is required"), z.instanceof(File)]),
  full_image: z.union([z.string(), z.instanceof(File)]).optional(),
  language: z
    .enum(["fr", "ar", "en", "es", "de", "it", "pt", "ru", "zh"])
    .optional(),
});

type AnnouncementValidation = z.infer<typeof announcementValidationSchema>;

function AnnouncementModal({
  type,
  announcement,
  modalProps: { isOpen, onClose },
  onSuccess,
}: {
  type: "add" | "update";
  announcement?: Announcement;
  modalProps: UseDisclosureReturn;
  onSuccess?: () => void;
}) {
  const getDefaultValues = (): AnnouncementValidation => {
    if (type === "update" && announcement) {
      return {
        image: announcement.image,
        full_image: announcement.full_image || "",
        language: announcement.language,
      };
    }
    return {
      image: "",
      full_image: "",
      language: "fr",
    };
  };

  const { control, handleSubmit } = useForm<AnnouncementValidation>({
    resolver: zodResolver(announcementValidationSchema),
    defaultValues: getDefaultValues(),
  });

  const { languageData } = useLanguage();
  const announcements = languageData?.inputs.announcements;
  const action =
    announcements?.actions[
      type === "add" ? "addAnnouncement" : "updateAnnouncement"
    ];

  const [onSubmit, isLoading] = useLoadingCallback(
    async (data: AnnouncementValidation) => {
      try {
        // Handle image uploads if they are File objects
        let imageUrl = data.image;
        let fullImageUrl = data.full_image;

        if (data.image instanceof File) {
          const imagePath = `announcements/${Date.now()}_${data.image.name}`;
          imageUrl = await uploadImageToStorage(data.image, imagePath);
        }

        if (data.full_image instanceof File) {
          const fullImagePath = `announcements/${Date.now()}_full_${
            data.full_image.name
          }`;
          fullImageUrl = await uploadImageToStorage(
            data.full_image,
            fullImagePath
          );
        }

        if (type === "add") {
          await createAnnouncement({
            image: imageUrl as string,
            full_image: fullImageUrl as string,
            language: data.language,
          });
        } else if (type === "update" && announcement) {
          await updateAnnouncement(announcement.id, {
            image: imageUrl as string,
            full_image: fullImageUrl as string,
            language: data.language,
          });
        }

        toast.success(
          action?.toast.success || "Announcement saved successfully"
        );
        onClose();
        onSuccess?.();
      } catch (_error: unknown) {
        toast.error(action?.toast.error || "Failed to save announcement");
      }
    },
    [type, announcement, action, onClose, onSuccess]
  );
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalHeader>{action?.header}</ModalHeader>
        </ModalHeader>
        <ModalBody className="grid grid-cols-12 gap-4 ">
          <div className="col-span-full">
            <InputLanguage control={control} />
          </div>
          <div className="col-span-7">
            <InputImageCard
              name="image"
              control={control}
              field={{
                label: "Banner Image",
                placeholder: {
                  upload: "Upload banner image",
                  update: "Update banner image",
                },
                toastUploading: {
                  error: "Failed to upload banner image",
                  success: "Banner image uploaded successfully",
                },
                rules: {
                  isRequired: "Banner image is required",
                },
              }}
            />
          </div>
          <div className="col-span-5">
            <InputImageCard
              name="full_image"
              control={control}
              field={{
                label: "Full Image",
                placeholder: {
                  upload: "Upload full image (optional)",
                  update: "Update full image",
                },
                toastUploading: {
                  error: "Failed to upload full image",
                  success: "Full image uploaded successfully",
                },
                rules: {
                  isRequired: "Full image is optional",
                },
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <CancelButton onPress={onClose} />
          <SubmitButton
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const UpdateAnnouncementModal: React.FC<{
  announcement: Announcement;
  onSuccess?: () => void;
}> = ({ announcement, onSuccess }) => {
  const updateProps = useDisclosure();
  const { onOpen } = updateProps;
  return (
    <Fragment>
      <Button
        color="primary"
        isIconOnly
        startContent={<EditIcon className="size-5" />}
        onPress={onOpen}
      />
      <AnnouncementModal
        type="update"
        announcement={announcement}
        modalProps={updateProps}
        onSuccess={onSuccess}
      />
    </Fragment>
  );
};
const AddAnnouncementModal = ({ onSuccess }: { onSuccess?: () => void }) => {
  const modalProps = useDisclosure();
  const { languageData } = useLanguage();
  const announcements = languageData?.inputs.announcements;

  return (
    <Fragment>
      <Button
        variant="flat"
        color="primary"
        startContent={<PlusIcon className="w-6 h-6" />}
        onPress={modalProps.onOpen}
      >
        {announcements?.actions.addAnnouncement.label}
      </Button>
      <AnnouncementModal
        type="add"
        modalProps={modalProps}
        onSuccess={onSuccess}
      />
    </Fragment>
  );
};
export { AddAnnouncementModal, UpdateAnnouncementModal };
