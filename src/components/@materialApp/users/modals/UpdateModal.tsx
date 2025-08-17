import {
  InputText,
  CancelButton,
  SubmitButton,
} from "@/components/@materialUI";
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

function UpdateUserModal({
  user,
  disclosureProps,
}: {
  user: SupabaseUser;
  disclosureProps: UseDisclosureReturn;
}) {
  const { languageData } = useLanguage();
  const users = languageData?.inputs.users;

  const { isOpen, onOpenChange, onClose } = disclosureProps;
  const action = languageData?.inputs.suggestions.actions.update;

  const handleUpdate = async () => {
    try {
      // TODO: Implement Supabase user update
      toast.info("User update functionality coming soon");
      onClose();
    } catch (error) {
      toast.error(action?.toast.error || "Failed to update user");
    }
  };
  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      className="text-black"
    >
      <ModalContent>
        <ModalHeader>{action?.header}</ModalHeader>
        <ModalBody>
          <p className="text-sm font-light">
            User update functionality is coming soon. This will allow you to
            modify user information.
          </p>
        </ModalBody>
        <ModalFooter>
          <CancelButton onPress={onClose} />
          <SubmitButton onPress={handleUpdate} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { UpdateUserModal };
