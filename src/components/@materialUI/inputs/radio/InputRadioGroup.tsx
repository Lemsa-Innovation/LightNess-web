import { Control, useController } from "react-hook-form";
import { cn, Radio, RadioGroup } from "@heroui/react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { getRuleErrors } from "@/utils/rules";
type Props = {
  name: string;
  label?: string;
  description?: string;
  control: Control<any>;
  values: Record<string, { title: string; description?: string }> | undefined;
};

const InputRadioGroup: React.FC<Props> = ({
  label,
  description,
  control,
  name,
  values,
}) => {
  const { languageData } = useLanguage();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleSelect = (value: string) => {
    onChange(value);
  };

  const errorMessage = error?.message
    ? getRuleErrors({
        errorMessage: error.message,
        rules: languageData?.rules,
      })
    : undefined;

  return (
    <RadioGroup
      value={value}
      label={label}
      isInvalid={!!errorMessage}
      errorMessage={errorMessage}
      onValueChange={handleSelect}
      classNames={{
        wrapper: "flex flex-row gap-2",
        base: "flex flex-col gap-2",
      }}
      description={description}
    >
      {Object.entries(values || {}).map(([value, { title, description }]) => (
        <Radio
          key={value}
          value={value}
          classNames={{
            base: cn(
              "inline-flex m-0 bg-foreground-100 hover:bg-foreground-50 items-center justify-between",
              "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
          }}
        >
          {title}
          {description && <p className="text-foreground-500">{description}</p>}
        </Radio>
      ))}
    </RadioGroup>
  );
};
export default InputRadioGroup;
