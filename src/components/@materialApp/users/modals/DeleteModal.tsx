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
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const supabase = createClient();

      // Delete from user_roles table first
      const { error: roleError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", user.id as any);

      if (roleError) {
        throw roleError;
      }

      // Delete from users table
      const { error: userError } = await supabase
        .from("users")
        .delete()
        .eq("id", user.id as any);

      if (userError) {
        throw userError;
      }

      toast.success(action?.toast.success || "User deleted successfully");
      onClose();

      // Refresh the page to update the user list
      window.location.reload();
    } catch (error) {
      toast.error(action?.toast.error || "Failed to delete user");
    } finally {
      setIsDeleting(false);
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
          <CancelButton onPress={onClose} isDisabled={isDeleting} />
          <SubmitButton onPress={handleDelete} isLoading={isDeleting} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { DeleteUserModal };
