import { ReactNode } from "react";
import { Select, SelectItem, SelectVariantProps } from "@heroui/react";
import { Control, useController } from "react-hook-form";

type Props = {
  control: Control<any>;
  isRequired?: boolean;
  isReadOnly?: boolean;
  name?: string;
  status?: SelectVariantProps["color"];
  endContent?: ReactNode;
  handleKeyUp?: () => void;
  field?: {
    label?: string;
    placeholder?: string;
  };
};

function InputGender({
  control,
  name,
  isRequired,
  isReadOnly,
  endContent,
  status,
  handleKeyUp,
  field,
}: Props) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: name ?? "gender",
  });

  const errorMessage = error?.message;

  return (
    <Select
      label={field?.label || "Gender"}
      placeholder={field?.placeholder || "Select your gender"}
      selectedKeys={value ? [value] : ["men"]}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0] as string;
        onChange(selectedKey);
      }}
      isInvalid={!!errorMessage}
      errorMessage={errorMessage}
      color={error ? "danger" : status}
      isRequired={isRequired}
      isDisabled={isReadOnly}
      variant="bordered"
      size="md"
      classNames={{
        label: "text-sm font-medium text-foreground mb-3",
        trigger: "mt-2",
      }}
    >
      <SelectItem key="men">Men</SelectItem>
      <SelectItem key="women">Women</SelectItem>
    </Select>
  );
}

export default InputGender;
