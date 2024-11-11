import {CancelButton, SubmitButton} from "@/components/@materialUI/buttons";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {deleteSuggestion} from "@/firebase/firestore/collections/suggestions/actions";
import {Suggestion} from "@/firebase/firestore/collections/suggestions/models";
import {User} from "@/firebase/firestore/collections/users/models";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Trash} from "iconsax-react";
import {useRouter} from "next/navigation";
import {Fragment} from "react";
import {useLoadingCallback} from "react-loading-hook";
import {toast} from "sonner";

function DeleteSuggestionModal({suggestion}: {
  suggestion: Suggestion
}) {
  const {languageData} = useLanguage()
  const {isOpen, onClose, onOpenChange} = useDisclosure()
  const action = languageData?.inputs.suggestions.actions.delete[suggestion.type]

  const {back} = useRouter()
  const [handleDelete, isLoading] = useLoadingCallback(async () => {
    try {
      await deleteSuggestion(suggestion.ref.path)
      toast.success(action?.toast.success)
      back()
    } catch (error) {
      toast.error(action?.toast.error)
    }
  })
  return (
    <Fragment>
      <Button
        isIconOnly
        onClick={onOpenChange}
        startContent={<Trash size={20} className="stroke-danger" />}
      />
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
    </Fragment>
  )
}

export default DeleteSuggestionModal;