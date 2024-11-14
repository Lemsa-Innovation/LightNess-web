import {CancelButton, SubmitButton} from "@/components/@materialUI/buttons";
import {InputSwitch} from "@/components/@materialUI/inputs/switch";
import {InputText} from "@/components/@materialUI/inputs/texts";
import {UseDisclosureReturn} from "@/components/@materialUI/utils";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {updateSuggestion} from "@/firebase/firestore/collections/suggestions/actions";
import {Suggestion} from "@/firebase/firestore/collections/suggestions/models";
import {suggestionFormSchema, SuggestionUpdateForm} from "@/firebase/firestore/collections/suggestions/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
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

  const {control, handleSubmit, formState: {dirtyFields}} = useForm<SuggestionUpdateForm>({
    mode: "onChange",
    resolver: zodResolver(suggestionFormSchema),
    defaultValues: {
      isActive: suggestion.isActive,
      name: suggestion.name
    }
  })

  const [handleUpdate, isLoading] = useLoadingCallback(async (data: SuggestionUpdateForm) => {
    try {
      const {name, isActive} = data
      await updateSuggestion({
        data: {
          name: dirtyFields.name ? name : undefined,
          isActive: dirtyFields.isActive ? isActive : undefined,
        },
        path: suggestion.ref.path,
      })
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
          {action?.header}
        </ModalHeader>
        <ModalBody
        >
          <InputText
            name="name"
            field={languageData?.inputs.commons.name}
            control={control}
          />
          <div className="flex flex-row gap-2 items-center">
            <p>{languageData?.inputs.commons.isActive.label}</p>
            <InputSwitch
              name="isActive"
              control={control}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={isLoading}
            onClick={handleSubmit(handleUpdate)} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateSuggestionModal;