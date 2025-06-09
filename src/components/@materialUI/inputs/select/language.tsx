import { useLanguage } from "@/contexts/language/LanguageContext";
import { LanguageValidation } from "@/firebase/firestore/modules";
import { Select, SelectItem } from "@heroui/react";
import { Control, useController } from "react-hook-form";

function InputLanguage({ control }: { control: Control<any> }) {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name: "language",
  });
  const { languageData } = useLanguage();
  const languages = languageData?.commons.languages;
  const field = languageData?.inputs.blogs.fields.language;

  return (
    <Select
      label={field?.label}
      description={field?.description}
      selectionMode="single"
      selectedKeys={[value]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys).at(0);
        onChange(selected);
      }}
      items={Object.entries(languages || {})}
      classNames={{
        label: "top-1",
      }}
    >
      {([code, language]) => (
        <SelectItem key={code} textValue={language}>
          <p>{language}</p>
        </SelectItem>
      )}
    </Select>
  );
}

export { InputLanguage };
