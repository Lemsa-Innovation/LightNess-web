import { CancelButton, SubmitButton } from "@/components/@materialUI";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { SupabaseUser } from "@/hooks/useSupabaseUsers";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { toast } from "sonner";

function DeleteUserModal({
  user,
  disclosureProps,
}: {
  user: SupabaseUser;
  disclosureProps: UseDisclosureReturn;
}) {
  const { languageData } = useLanguage();
  const { isOpen, onOpenChange, onClose } = disclosureProps;
  const action = languageData?.inputs.users.actions.deleteUser;

  const handleDelete = async () => {
    try {
      // TODO: Implement Supabase user deletion
      toast.info("User deletion functionality coming soon");
      onClose();
    } catch (error) {
      toast.error(action?.toast.error || "Failed to delete user");
    }
  };
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
          <SubmitButton onPress={handleDelete} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { DeleteUserModal };
