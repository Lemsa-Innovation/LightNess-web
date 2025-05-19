import { NumberInput, InputVariantProps } from "@heroui/react";
import { getRuleErrors } from "@/utils/rules";
import { Field } from "@/language/structure";
import { ReactNode } from "react";
import { Control, useController } from "react-hook-form";
import { useLanguage } from "@/contexts/language/LanguageContext";
type Props = {
  name: string;
  field?: Field;
  className?: string;
  control: Control<any>;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  endContent?: ReactNode;
  startContent?: ReactNode;
  size?: InputVariantProps["size"];
  status?: InputVariantProps["color"];
  variant?: InputVariantProps["variant"];
  handleKeyUp?: () => void;
};
const InputNumber: React.FC<Props> = ({
  control,
  className,
  name,
  handleKeyUp,
  field,
  endContent,
  startContent,
  size,
  isReadOnly,
  isDisabled,
  isRequired,
  status,
  variant,
}) => {
  const { languageData } = useLanguage();

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

  const displayValue = value as number | undefined;

  return (
    <NumberInput
      {...field}
      className={className}
      value={displayValue}
      size={size ?? "md"}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isClearable={!isReadOnly}
      endContent={endContent}
      isInvalid={!!error}
      startContent={startContent}
      variant={variant ?? "bordered"}
      color={error ? "danger" : status}
      onClear={!isReadOnly ? () => onChange(undefined) : undefined}
      errorMessage={errorMessage}
      isReadOnly={isReadOnly}
      classNames={{
        label: "top-1",
      }}
      onValueChange={onChange}
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
};

export default InputNumber;
