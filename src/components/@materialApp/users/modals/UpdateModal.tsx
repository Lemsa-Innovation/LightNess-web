import {CancelButton, SubmitButton} from "@/components/@materialUI/buttons";
import {InputDate} from "@/components/@materialUI/inputs/date";
import {InputGender} from "@/components/@materialUI/inputs/radio";
import {InputSwitch} from "@/components/@materialUI/inputs/switch";
import {InputText} from "@/components/@materialUI/inputs/texts";
import {UseDisclosureReturn} from "@/components/@materialUI/utils";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {updateUser} from "@/firebase/firestore/collections/users/actions";
import {User} from "@/firebase/firestore/collections/users/models";
import {
  UpdateUserSchema,
  updateUserSchema,
} from "@/firebase/firestore/collections/users/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {useLoadingCallback} from "react-loading-hook";
import {toast} from "sonner";

function UpdateSuggestionModal({
  user,
  disclosureProps,
}: {
  user: User<"client">;
  disclosureProps: UseDisclosureReturn;
}) {
  const {languageData} = useLanguage();
  const users = languageData?.inputs.users;

  const {isOpen, onOpenChange, onClose} = disclosureProps;
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
    formState: {dirtyFields},
  } = useForm<UpdateUserSchema>({
    mode: "onChange",
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      uid,
      firstName,
      lastName,
      email,
      gender,
      phoneNumber,
      isActive: accountStatus === "active"
      // birthday: birthday?.toDate(),
    },
  });

  const [handleUpdate, isLoading] = useLoadingCallback(
    async (data: UpdateUserSchema) => {
      try {
        const {uid, email, firstName, isActive, gender, lastName, birthday, phoneNumber} = data
        await updateUser({
          uid,
          isActive: dirtyFields.isActive ? isActive : undefined,
          birthday: dirtyFields.birthday ? birthday : undefined,
          email: dirtyFields.email ? email : undefined,
          gender: dirtyFields.gender ? gender : undefined,
          firstName: dirtyFields.firstName ? firstName : undefined,
          lastName: dirtyFields.lastName ? lastName : undefined,
          phoneNumber: dirtyFields.phoneNumber ? phoneNumber : undefined
        })
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
      className="text-black dark:text-white"
    >
      <ModalContent>
        <ModalHeader>{action?.header}</ModalHeader>
        <ModalBody
          className="grid grid-cols-12"
        >
          <div className="col-span-full">
            <InputText
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
          <div className="col-span-full md:col-span-4">
            <InputDate
              control={control}
              name="birthday"
              checkAdult
              label={users?.fields.birthday.label}
            />
          </div>
          <div className="col-span-full md:col-span-8">
            <InputText
              control={control}
              name={"phoneNumber"}
              field={users?.fields.phoneNumber}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <InputGender control={control} />
          </div>
          <div className="col-span-full md:col-span-6 flex flex-row gap-2 items-center">
            <p>{languageData?.inputs.commons.isActive.label}</p>
            <InputSwitch name="isActive" control={control} />
          </div>
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={onClose} />
          <SubmitButton
            isLoading={isLoading}
            onClick={handleSubmit(handleUpdate)}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateSuggestionModal;