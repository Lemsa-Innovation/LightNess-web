import { CancelButton, SubmitButton } from "@/components/@materialUI";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { deleteUser, User } from "@/firebase/firestore";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";

function DeleteUserModal({
  user,
  disclosureProps,
}: {
  user: User;
  disclosureProps: UseDisclosureReturn;
}) {
  const { languageData } = useLanguage();
  const { isOpen, onOpenChange, onClose } = disclosureProps;
  const action = languageData?.inputs.users.actions.deleteUser;

  const [handleDelete, isLoading] = useLoadingCallback(async () => {
    try {
      await deleteUser(user.uid);
      toast.success(action?.toast.success);
      onClose();
    } catch (error) {
      toast.error(action?.toast.error);
    }
  });
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      className="text-black "
    >
      <ModalContent>
        <ModalHeader>{action?.confirmation?.title}</ModalHeader>
        <ModalBody>
          <p className="text-sm font-light">{action?.confirmation?.message}</p>
        </ModalBody>
        <ModalFooter>
          <CancelButton onPress={onClose} />
          <SubmitButton isLoading={isLoading} onPress={handleDelete} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { DeleteUserModal };
