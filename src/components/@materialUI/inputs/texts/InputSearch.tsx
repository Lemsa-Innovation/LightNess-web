import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
function InputSearch({
  isDisabled,
  onClear,
  onSearchChange,
}: {
  isDisabled?: boolean;
  onClear: () => void;
  onSearchChange: (value: string) => void;
}) {
  const search = {
    label: "Search",
    placeholder: "Search by name...",
  };
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
