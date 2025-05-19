import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { CancelButton, SubmitButton } from "../buttons";
import { ReactNode } from "react";
import { Action } from "@/language/structure";
import { UseDisclosureReturn } from "@/components/types";

function ConfirmModal({
  action,
  content,
  modalProps,
  isLoading,
  handleConfirm,
}: {
  action: Action | undefined;
  isLoading: boolean;
  handleConfirm: () => void;
  modalProps: UseDisclosureReturn;
  content?: ReactNode;
}) {
  const { onClose, isOpen } = modalProps;
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader>{action?.confirmation?.title}</ModalHeader>
        <ModalBody>
          {content ?? (
            <p className="text-sm font-light">
              {action?.confirmation?.message}
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <CancelButton onPress={onClose} />
          <SubmitButton isLoading={isLoading} onPress={handleConfirm} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { ConfirmModal };
