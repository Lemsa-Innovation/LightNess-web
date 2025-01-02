import {CancelButton, SubmitButton} from "@/components/@materialUI/buttons";
import {UseDisclosureReturn} from "@/components/@materialUI/utils";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {rejectDeadDeclarations} from "@/firebase/firestore/collections/deathDeclarations/actions";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useLoadingCallback} from "react-loading-hook";
import {toast} from "sonner";

function RejectDeadModal({matchedUid, docPaths, disclosureProps}: {
  matchedUid: string
  docPaths: string[]
  disclosureProps: UseDisclosureReturn
}) {
  const {languageData} = useLanguage()
  const {isOpen, onOpenChange, onClose} = disclosureProps
  const action = languageData?.inputs.deathDeclarations.actions.rejectDeclaration

  const [onSubmit, isLoading] = useLoadingCallback(async () => {
    try {
      await rejectDeadDeclarations({
        matchedUid,
        declaredDeathsPath: docPaths
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
            onClick={onSubmit} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RejectDeadModal;