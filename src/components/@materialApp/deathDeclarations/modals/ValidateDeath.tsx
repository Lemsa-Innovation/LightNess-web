import { CancelButton, SubmitButton } from "@/components/@materialUI/buttons";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { markUserAsDeath } from "@/firebase/firestore/collections/deathDeclarations/actions";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";

function ValidateDeathModal({
  matchedUid,
  docPaths,
  disclosureProps,
}: {
  matchedUid: string;
  docPaths: string[];
  disclosureProps: UseDisclosureReturn;
}) {
  const { languageData } = useLanguage();
  const { isOpen, onOpenChange, onClose } = disclosureProps;
  const action =
    languageData?.inputs.deathDeclarations.actions.validateDeclaration;

  const [onSubmit, isLoading] = useLoadingCallback(async () => {
    try {
      await markUserAsDeath({
        matchedUid,
        declaredDeathsPath: docPaths,
      });
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
          <SubmitButton isLoading={isLoading} onPress={onSubmit} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { ValidateDeathModal };
