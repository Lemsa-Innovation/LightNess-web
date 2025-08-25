import { ReactNode } from "react";
import { Input, InputVariantProps } from "@heroui/react";
import { Control, useController } from "react-hook-form";

type Props = {
  control: Control<any>;
  isRequired?: boolean;
  isReadOnly?: boolean;
  name?: string;
  status?: InputVariantProps["color"];
  endContent?: ReactNode;
  handleKeyUp?: () => void;
};

function InputPhoneNumber({
  control,
  name,
  isRequired,
  isReadOnly,
  endContent,
  status,
  handleKeyUp,
}: Props) {
  const field = {
    label: "Phone Number",
    placeholder: "Enter your phone number",
  };
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: name ?? "phoneNumber",
  });

  const errorMessage = error?.message;
  return (
    <Input
      size="md"
      value={value ?? ""}
      inputMode="tel"
      type="phone"
      variant="bordered"
      onValueChange={onChange}
      label={field?.label}
      classNames={{
        label: "top-1",
        errorMessage: "text-sm text-danger",
      }}
      isInvalid={!!errorMessage}
      errorMessage={errorMessage}
      placeholder={field?.placeholder}
      color={error ? "danger" : status}
      // startContent={<p className="text-sm">+213</p>}
      endContent={endContent}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      {...(handleKeyUp
        ? {
            onKeyUp: (event) => {
              if (event.code === "Enter" || event.code === "NumpadEnter") {
                handleKeyUp();
              }
            },
          }
        : {})}
    />
  );
}

export default InputPhoneNumber;
