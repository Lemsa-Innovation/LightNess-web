import { cn, Input, InputProps, InputVariantProps } from "@heroui/react";
import { ReactNode, RefObject } from "react";
import { Control, useController } from "react-hook-form";
import { Field } from "@/language/structure";
import { getRuleErrors } from "@/utils/rules";
import { CopyButton } from "../../buttons";
import { useLanguage } from "@/contexts/language/LanguageContext";
//-----------------------------------------------------------------------
type Props = {
  name: string;
  size?: InputVariantProps["size"];
  control: Control<any>;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  ref?: RefObject<HTMLInputElement>;
  status?: InputVariantProps["color"];
  variant?: InputVariantProps["variant"];
  handleKeyUp?: () => void;
  field?: Field;
  startContent?: ReactNode;
  inputMode?: InputProps["inputMode"];
} & (
  | {
      allowCopy: true;
    }
  | {
      allowCopy?: false;
      endContent?: ReactNode;
    }
);

const InputText: React.FC<Props> = (props) => {
  const { languageData } = useLanguage();
  const {
    name,
    ref,
    field,
    allowCopy,
    size,
    control,
    status,
    isReadOnly,
    variant,
    handleKeyUp,
    ...restProps
  } = props;

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const errorMessage =
    error?.message &&
    getRuleErrors({
      rules: languageData?.rules,
      errorMessage: error?.message,
    });

  return (
    <Input
      {...field}
      {...restProps}
      ref={ref}
      size={size ?? "md"}
      variant={variant ?? "bordered"}
      classNames={{
        label: "top-1",
      }}
      //defaultValue={value}
      value={value ?? ""}
      onValueChange={(value) => {
        onChange(value.length > 0 ? value : "");
      }}
      color={error ? "danger" : status}
      isClearable={!isReadOnly}
      onClear={!isReadOnly ? () => onChange(undefined) : undefined}
      isInvalid={!!errorMessage}
      errorMessage={errorMessage}
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
      endContent={allowCopy ? <CopyButton value={value} /> : props.endContent}
    />
  );
};

export default InputText;
