import { CancelButton, EditIcon } from "@/components/@materialUI";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Washer } from "@/firebase/firestore";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment } from "react";

function UpdateWasherModal({ washer }: { washer: Washer }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { languageData } = useLanguage();
  const action = languageData?.inputs.washers.actions.updateWasher;
  return (
    <Fragment>
      <Button isIconOnly startContent={<EditIcon />} />
      <Modal>
        <ModalContent>
          <ModalHeader>{action?.header}</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <CancelButton onPress={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

export { UpdateWasherModal };
