import {
  TrashIcon,
  DisplayImage,
  ConfirmModal,
} from "@/components/@materialUI";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Announcement, deleteAnnouncement } from "@/firebase/firestore";
import { Button, Card, CardHeader, useDisclosure } from "@heroui/react";
import { useLoadingCallback } from "react-loading-hook";
import { UpdateAnnouncementModal } from "../modals";

const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
  const modalProps = useDisclosure();
  const { languageData } = useLanguage();
  const action = languageData?.inputs.announcements.actions.deleteAnnouncement;
  const [handleConfirm, isLoading] = useLoadingCallback(async () => {
    await deleteAnnouncement(announcement.ref.id);
  }, []);
  return (
    <Card key={announcement.ref.id} className="col-span-4">
      <CardHeader className="absolute z-10 top-1 flex gap-2 justify-end">
        <Button
          color="danger"
          isIconOnly
          startContent={<TrashIcon />}
          onPress={modalProps.onOpen}
        />
        <UpdateAnnouncementModal announcement={announcement} />
        <ConfirmModal
          action={action}
          modalProps={modalProps}
          isLoading={isLoading}
          handleConfirm={handleConfirm}
        />
      </CardHeader>
      <div className="min-w-60 min-h-60 relative">
        <DisplayImage src={announcement.image} className="z-0" />
      </div>
    </Card>
  );
};

export { AnnouncementCard };
