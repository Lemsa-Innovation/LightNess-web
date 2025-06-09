import {
  CancelButton,
  EditIcon,
  InputImageCard,
  InputLanguage,
  PlusIcon,
  SubmitButton,
} from "@/components/@materialUI";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { firestoreDb } from "@/firebase/app";
import { Announcement } from "@/firebase/firestore";
import { setAnnouncement } from "@/firebase/firestore/collections/announcements/actions";
import {
  announcementValidation,
  AnnouncementValidation,
} from "@/firebase/firestore/collections/announcements/validations";
import { uploadImageBucket } from "@/firebase/storage";
import { collection, doc } from "@firebase/firestore";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  UseDisclosureProps,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { collectionIds } from "@shared/modules";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";

function AnnouncementModal({
  type,
  announcement,
  modalProps: { isOpen, onClose },
}: {
  type: "add" | "update";
  announcement?: Announcement;
  modalProps: UseDisclosureReturn;
}) {
  const getDefaultValues = (): AnnouncementValidation => {
    if (type === "update" && announcement) {
      return {
        type: "update",
        language: announcement.language,
        path: announcement.ref.path,
        image: announcement.image,
        fullImage: announcement.fullImage,
      };
    }
    return {
      type: "add",
      path: doc(collection(firestoreDb, collectionIds.announcements)).path,
    };
  };
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<AnnouncementValidation>({
    resolver: zodResolver(announcementValidation("client", type)),
    defaultValues: getDefaultValues(),
  });
  const { languageData } = useLanguage();
  const announcements = languageData?.inputs.announcements;
  const action =
    announcements?.actions[
      type === "add" ? "addAnnouncement" : "updateAnnouncement"
    ];
  const [onSubmit, isLoading] = useLoadingCallback(
    async ({
      image,
      fullImage,
      path,
      type,
      language,
    }: AnnouncementValidation) => {
      try {
        const uploadCoverImage = async (
          image: unknown,
          type: "banner" | "full"
        ) => {
          if (image instanceof File) {
            const imagePath = await uploadImageBucket({
              image,
              imagePath: `${path}/${type}`,
            });
            return imagePath;
          }
        };
        const imagePath = dirtyFields.image
          ? await uploadCoverImage(image, "banner")
          : undefined;
        const fullImagePath = dirtyFields.fullImage
          ? await uploadCoverImage(fullImage, "full")
          : undefined;

        await setAnnouncement(
          {
            path,
            type,
            language,
            image: imagePath,
            fullImage: fullImagePath,
          },
          type
        );
        toast.success(action?.toast.success);
        onClose();
      } catch (error) {
        toast.error(action?.toast.error);
      }
    },
    [dirtyFields]
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
              field={announcements?.fields.bannerImage}
            />
          </div>
          <div className="col-span-5">
            <InputImageCard
              name="fullImage"
              control={control}
              field={announcements?.fields.fullImage}
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
}> = ({ announcement }) => {
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
      />
    </Fragment>
  );
};
const AddAnnouncementModal = () => {
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
      <AnnouncementModal type="add" modalProps={modalProps} />
    </Fragment>
  );
};
export { AddAnnouncementModal, UpdateAnnouncementModal };
