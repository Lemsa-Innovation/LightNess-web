import {
  CancelButton,
  InputImageCard,
  PlusIcon,
  SubmitButton,
} from "@/components/@materialUI";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { firestoreDb } from "@/firebase/app";
import { addAnnouncement } from "@/firebase/firestore/collections/announcements/actions";
import {
  addAnnouncementValidation,
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
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { collectionIds } from "@shared/modules";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";

function AnnouncementModal() {
  const { control, handleSubmit } = useForm<AnnouncementValidation>({
    resolver: zodResolver(addAnnouncementValidation),
    defaultValues: {
      path: doc(collection(firestoreDb, collectionIds.announcements)).path,
    },
  });
  const { languageData } = useLanguage();
  const announcements = languageData?.inputs.announcements;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [onSubmit, isLoading] = useLoadingCallback(
    async ({ image, fullImage, path }: AnnouncementValidation) => {
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
      const imagePath = await uploadCoverImage(image, "banner");
      const fullImagePath = await uploadCoverImage(fullImage, "full");
      await addAnnouncement({
        path,
        image: imagePath,
        fullImage: fullImagePath,
      });
    },
    []
  );
  return (
    <Fragment>
      <Button
        variant="flat"
        color="primary"
        startContent={<PlusIcon className="w-6 h-6" />}
        onPress={onOpen}
      >
        {announcements?.actions.addAnnouncement.label}
      </Button>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <ModalHeader>
              {announcements?.actions.addAnnouncement.header}
            </ModalHeader>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 ">
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
    </Fragment>
  );
}

export { AnnouncementModal };
