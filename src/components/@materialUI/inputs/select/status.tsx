import { useLanguage } from "@/contexts/language/LanguageContext";
import { Field, Status } from "@/language/structure";
import {
  InputProps,
  InputVariantProps,
  Select,
  Selection,
  SelectItem,
} from "@heroui/react";
import { ReactNode } from "react";
import { Control, useController } from "react-hook-form";
import { statusColor } from "../../chips/Status";

type Props = {
  name: string;
  size?: InputVariantProps["size"];
  control: Control<any>;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  status?: InputVariantProps["color"];
  variant?: InputVariantProps["variant"];
  handleKeyUp?: () => void;
  field?: Field;
  startContent?: ReactNode;
  endContent?: ReactNode;
  items: (keyof Status)[];
  inputMode?: InputProps["inputMode"];
};

function InputSelectStatus(props: Props) {
  const { languageData } = useLanguage();
  const allStatus = languageData?.commons.status;

  const {
    name,
    field,
    size,
    control,
    items,
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

  const onSelectionChange = (selection: Selection) => {
    const selectedKey = Array.from(selection).at(0);
    onChange(selectedKey);
  };

  return (
    <Select
      variant={variant}
      label={field?.label}
      selectionMode="single"
      selectedKeys={[value]}
      classNames={{
        label: "top-1",
      }}
      onSelectionChange={onSelectionChange}
    >
      {items.map((key) => (
        <SelectItem key={key} color={statusColor[key]}>
          {allStatus?.[key]}
        </SelectItem>
      ))}
    </Select>
  );
}

export default InputSelectStatus;
