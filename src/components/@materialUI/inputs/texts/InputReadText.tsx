import { Input, InputVariantProps } from "@heroui/react";
import { ReactNode } from "react";
import { CopyButton } from "../../buttons";
import { Field } from "@/language/structure";

//-----------------------------------------------------------------------
type InputProps = {
  defaultValue?: any;
  size?: InputVariantProps["size"];
  isDisabled?: boolean;
  color?: InputVariantProps["color"];
  variant?: InputVariantProps["variant"];
  field?: Field;
  startContent?: ReactNode;
} & (
  | {
      allowCopy: true;
    }
  | {
      allowCopy?: false;
      endContent?: ReactNode;
    }
);

const InputReadText: React.FC<InputProps> = (props) => {
  const {
    defaultValue,
    color,
    variant,
    isDisabled,
    field,
    size,
    startContent,
  } = props;
  return (
    <Input
      isReadOnly
      color={color}
      label={field?.label}
      size={size ?? "md"}
      isDisabled={isDisabled}
      value={defaultValue || ""}
      startContent={startContent}
      variant={variant || "bordered"}
      endContent={
        props.allowCopy ? <CopyButton value={defaultValue} /> : props.endContent
      }
    />
  );
};

export default InputReadText;
