import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/contexts/language/LanguageContext";
function InputSearch({
  isDisabled,
  onClear,
  onSearchChange,
}: {
  isDisabled?: boolean;
  onClear: () => void;
  onSearchChange: (value: string) => void;
}) {
  const { languageData } = useLanguage();
  const search = languageData?.inputs.commons.searchByName;
  return (
    <Input
      isClearable
      size="md"
      isDisabled={isDisabled}
      variant="bordered"
      className="w-full sm:max-w-[44%] rounded-xl"
      placeholder={search?.label}
      startContent={<Icon icon="mdi:search" />}
      onClear={onClear}
      onValueChange={onSearchChange}
    />
  );
}

export default InputSearch;
