import {
  InputGender,
  InputText,
  CancelButton,
  SubmitButton,
} from "@/components/@materialUI";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import {
  updateUser,
  updateUserSchema,
  UpdateUserSchema,
  User,
} from "@/firebase/firestore";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { toast } from "sonner";

function UpdateUserModal({
  user,
  disclosureProps,
}: {
  user: User;
  disclosureProps: UseDisclosureReturn;
}) {
  const { languageData } = useLanguage();
  const users = languageData?.inputs.users;

  const { isOpen, onOpenChange, onClose } = disclosureProps;
  const action = languageData?.inputs.suggestions.actions.update;
  const {
    firstName,
    lastName,
    birthday,
    email,
    gender,
    accountStatus,
    uid,
    phoneNumber,
  } = user;
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<UpdateUserSchema>({
    mode: "onChange",
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      uid,
      firstName,
      lastName,
      email,
      ...(gender && { gender }),
      ...(phoneNumber && { phoneNumber }),
      // birthday: ,
    },
  });

  const [handleUpdate, isLoading] = useLoadingCallback(
    async (data: UpdateUserSchema) => {
      try {
        const {
          uid,
          email,
          firstName,
          gender,
          lastName,
          birthday,
          phoneNumber,
        } = data;
        await updateUser({
          uid,
          birthday: dirtyFields.birthday ? birthday : undefined,
          gender: dirtyFields.gender ? gender : undefined,
          firstName: dirtyFields.firstName ? firstName : undefined,
          lastName: dirtyFields.lastName ? lastName : undefined,
          phoneNumber: dirtyFields.phoneNumber ? phoneNumber : undefined,
        });
        toast.success(action?.toast.success);
        onClose();
      } catch (error) {
        toast.error(action?.toast.error);
      }
    }
  );
  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      className="text-black"
    >
      <ModalContent>
        <ModalHeader>{action?.header}</ModalHeader>
        <ModalBody className="grid grid-cols-12">
          <div className="col-span-full">
            <InputText
              isReadOnly
              name={"email"}
              control={control}
              field={users?.fields.email}
              status={
                user.verificationSteps?.email?.verified ? "success" : "warning"
              }
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <InputText
              control={control}
              name={"firstName"}
              field={users?.fields.firstName}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <InputText
              control={control}
              name={"lastName"}
              field={users?.fields.lastName}
            />
          </div>
          <div className="col-span-full md:col-span-8">
            <InputText
              control={control}
              name={"phoneNumber"}
              field={users?.fields.phoneNumber}
            />
          </div>
          {/* <div className="col-span-full md:col-span-">
            <InputDate
              control={control}
              name="birthday"
              checkAdult
              label={users?.fields.birthday.label}
            />
          </div> */}

          <div className="col-span-full md:col-span-4">
            <InputGender control={control} />
          </div>
        </ModalBody>
        <ModalFooter>
          <CancelButton onPress={onClose} />
          <SubmitButton
            isLoading={isLoading}
            onPress={handleSubmit(handleUpdate)}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { UpdateUserModal };
