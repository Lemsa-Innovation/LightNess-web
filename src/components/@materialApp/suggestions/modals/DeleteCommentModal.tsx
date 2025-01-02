import {CancelButton, SubmitButton} from "@/components/@materialUI/buttons";
import {UseDisclosureReturn} from "@/components/@materialUI/utils";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {deleteComment, deleteSuggestion} from "@/firebase/firestore/collections/suggestions/actions";
import {Suggestion} from "@/firebase/firestore/collections/suggestions/models";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Trash} from "iconsax-react";
import {Fragment} from "react";
import {useLoadingCallback} from "react-loading-hook";
import {toast} from "sonner";

function DeleteCommentModal({commentId, suggestionPath}: {
  commentId: string
  suggestionPath: string
}) {
  const {languageData} = useLanguage()
  const {isOpen, onOpenChange, onClose} = useDisclosure()
  const action = languageData?.inputs.suggestions.actions.delete.comment

  const [handleDelete, isLoading] = useLoadingCallback(async () => {
    try {
      await deleteComment({
        commentId,
        suggestionPath
      })
      toast.success(action?.toast.success)
      onClose()
    } catch (error) {
      toast.error(action?.toast.error)
    }
  })
  return (
    <Fragment>
      <Button
        isIconOnly
        color="danger"
        startContent={<Trash />}
        onPress={onOpenChange}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        className="text-black"
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

export default DeleteCommentModal;