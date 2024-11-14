import {CancelButton, SubmitButton} from "@/components/@materialUI/buttons";
import {UseDisclosureReturn} from "@/components/@materialUI/utils";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {deleteUser} from "@/firebase/firestore/collections/users/actions";
import {User} from "@/firebase/firestore/collections/users/models";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useLoadingCallback} from "react-loading-hook";
import {toast} from "sonner";

function DeleteUserModal({user, disclosureProps}: {
  user: User<"client">
  disclosureProps: UseDisclosureReturn
}) {
  const {languageData} = useLanguage()
  const {isOpen, onOpenChange, onClose} = disclosureProps
  const action = languageData?.inputs.users.actions.deleteUser

  const [handleDelete, isLoading] = useLoadingCallback(async () => {
    try {
      await deleteUser(user.uid)
      toast.success(action?.toast.success)
      onClose()
    } catch (error) {
      toast.error(action?.toast.error)
    }
  })
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      className="text-black dark:text-white"
    >
      <ModalContent>
        <ModalHeader>
          {action?.confirmation?.title}
        </ModalHeader>
        <ModalBody
        >
          <p className="text-sm font-light">{action?.confirmation?.message}</p>
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={isLoading}
            onClick={handleDelete} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteUserModal;