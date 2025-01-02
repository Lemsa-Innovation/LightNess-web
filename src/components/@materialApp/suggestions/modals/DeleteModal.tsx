import {CancelButton, SubmitButton} from "@/components/@materialUI/buttons";
import {UseDisclosureReturn} from "@/components/@materialUI/utils";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {deleteSuggestion} from "@/firebase/firestore/collections/suggestions/actions";
import {Suggestion} from "@/firebase/firestore/collections/suggestions/models";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useLoadingCallback} from "react-loading-hook";
import {toast} from "sonner";

function DeleteSuggestionModal({suggestion, disclosureProps}: {
  suggestion: Suggestion
  disclosureProps: UseDisclosureReturn
}) {
  const {languageData} = useLanguage()
  const {isOpen, onOpenChange, onClose} = disclosureProps
  const action = languageData?.inputs.suggestions.actions.delete[suggestion.type]

  const [handleDelete, isLoading] = useLoadingCallback(async () => {
    try {
      await deleteSuggestion(suggestion.ref.path)
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
      className="text-black "
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

export default DeleteSuggestionModal;