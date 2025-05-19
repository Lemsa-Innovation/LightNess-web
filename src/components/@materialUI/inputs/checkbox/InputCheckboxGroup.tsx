import { Checkbox, CheckboxGroup } from "@heroui/react";
import { FieldWithValues } from "@/language/structure";
import { Control, useController } from "react-hook-form";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { getRuleErrors } from "@/utils/rules";
function InputCheckboxGroup({
  control,
  name,
  field,
}: {
  control: Control<any>;
  name: string;
  field: FieldWithValues | undefined;
}) {
  const { languageData } = useLanguage();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <CheckboxGroup
      onValueChange={onChange}
      label={field?.label}
      className="col-span-full"
      errorMessage={
        error?.message
          ? getRuleErrors({
              errorMessage: error.message,
              rules: languageData?.rules,
            })
          : undefined
      }
      classNames={{
        errorMessage: "text-xs",
      }}
    >
      {Object.entries(field?.values || []).map(([key, value]) => (
        <Checkbox key={key} value={key}>
          {value}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}

export default InputCheckboxGroup;
