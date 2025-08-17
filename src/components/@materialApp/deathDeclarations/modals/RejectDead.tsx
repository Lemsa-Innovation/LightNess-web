import { CancelButton, SubmitButton } from "@/components/@materialUI/buttons";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { rejectDeathDeclaration } from "@/lib/supabase-death-declarations";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";

function RejectDeadModal({
  matchedUid,
  declarationUids,
  disclosureProps,
  onSuccess,
}: {
  matchedUid: string;
  declarationUids: string[];
  disclosureProps: UseDisclosureReturn;
  onSuccess?: () => void;
}) {
  const { languageData } = useLanguage();
  const { isOpen, onOpenChange, onClose } = disclosureProps;
  const action =
    languageData?.inputs.deathDeclarations.actions.rejectDeclaration;

  const [onSubmit, isLoading] = useLoadingCallback(async () => {
    try {
      const { error } = await rejectDeathDeclaration(declarationUids);
      if (error) {
        throw error;
      }
      toast.success(action?.toast.success);
      onClose();
      // Refresh the data to show updated status
      onSuccess?.();
    } catch (_error) {
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
          <SubmitButton isLoading={isLoading} onPress={onSubmit} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { RejectDeadModal };
