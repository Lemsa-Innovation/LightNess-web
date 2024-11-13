import {CancelButton, SubmitButton} from "@/components/@materialUI/buttons";
import {InputText} from "@/components/@materialUI/inputs/texts";
import {UseDisclosureReturn} from "@/components/@materialUI/utils";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {Suggestion} from "@/firebase/firestore/collections/suggestions/models";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {useLoadingCallback} from "react-loading-hook";
import {toast} from "sonner";

function UpdateSuggestionModal({suggestion, disclosureProps}: {
  suggestion: Suggestion
  disclosureProps: UseDisclosureReturn
}) {
  const {languageData} = useLanguage()
  const {isOpen, onOpenChange, onClose} = disclosureProps
  const action = languageData?.inputs.suggestions.actions.update

  const {back} = useRouter()

  const {control, } = useForm()

  const [handleUpdate, isLoading] = useLoadingCallback(async () => {
    try {
      toast.success(action?.toast.success)
      back()
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
          {action?.header}
        </ModalHeader>
        <ModalBody
        >
          <InputText
            name="name"
            control={control}
          />
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={isLoading}
            onClick={handleUpdate} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateSuggestionModal;