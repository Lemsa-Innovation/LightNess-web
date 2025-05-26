import { Textarea } from "@heroui/react";
import { getRuleErrors } from "@/utils/rules";
import { Field } from "@/language/structure";
import { Control, useController } from "react-hook-form";
import { useLanguage } from "@/contexts/language/LanguageContext";

const InputTextArea: React.FC<{
  control: Control<any>;
  name: string;
  field: Field | undefined;
}> = ({ control, name, field }) => {
  const { languageData } = useLanguage();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  return (
    <Textarea
      {...field}
      rows={5}
      value={value}
      variant="bordered"
      onChange={onChange}
      isInvalid={!!error}
      className="w-full dark:text-white"
      color={error ? "danger" : "default"}
      errorMessage={
        error?.message &&
        getRuleErrors({
          errorMessage: error?.message,
          rules: languageData?.rules,
        })
      }
    />
  );
};
export default InputTextArea;
