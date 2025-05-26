import {
  CancelButton,
  SubmitButton,
  InputPassword,
  InputText,
} from "@/components/@materialUI";

import { useAuth } from "@/contexts/auth/AuthContext";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";
import { authFormSchema, AuthSchema } from "@/firebase/auth";
import { createAdmin } from "@/firebase/firestore";

function CreateUserModal() {
  const { currentUser, tenant } = useAuth();
  const { languageData } = useLanguage();
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const action = languageData?.inputs.users.actions.createAdmin;
  const fields = languageData?.inputs.users.fields;
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<AuthSchema>({
    resolver: zodResolver(authFormSchema),
    mode: "onChange",
  });
  const [handleCreate, isLoading] = useLoadingCallback(
    async (data: AuthSchema) => {
      try {
        await createAdmin(data);
        toast.success(action?.toast.success);
        onClose();
      } catch (error) {
        toast.error(action?.toast.error);
      }
    }
  );

  if (
    tenant?.customClaims.role === "admin" &&
    tenant.customClaims.position === "super"
  )
    return (
      <Fragment>
        <Button color="primary" onPress={onOpenChange}>
          {action?.label}
        </Button>
        <Modal
          size="xl"
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          className="text-black"
        >
          <ModalContent>
            <ModalHeader>{action?.header}</ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <InputText control={control} name="email" field={fields?.email} />
              <InputPassword control={control} />
            </ModalBody>
            <ModalFooter>
              <CancelButton onPress={onClose} />
              <SubmitButton
                isDisabled={!isValid}
                isLoading={isLoading}
                onPress={handleSubmit(handleCreate)}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Fragment>
    );
}

export { CreateUserModal };
