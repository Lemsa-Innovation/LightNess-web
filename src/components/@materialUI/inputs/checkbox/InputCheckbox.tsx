import { Checkbox } from "@heroui/react";
import { Control, useController } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  onPress?: () => void;
  control: Control<any>;
  description?: string;
};
const InputCheckbox: React.FC<Props> = ({
  control,
  label,
  name,
  onPress,
  description,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  });
  return (
    <Checkbox
      isSelected={value}
      onValueChange={(isSelected) => {
        onChange(isSelected);
      }}
      className="w-full"
      classNames={{
        base: "border-2 border-foreground rounded-xl w-full m-0 p-2",
      }}
    >
      {label}
      {description && (
        <p className="text-sm text-foreground-500">{description}</p>
      )}
    </Checkbox>
  );
};

export default InputCheckbox;
