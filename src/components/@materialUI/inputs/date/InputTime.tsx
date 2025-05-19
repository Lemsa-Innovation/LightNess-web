import { Select, Selection, SelectItem } from "@heroui/react";
import { Control, useController } from "react-hook-form";

const generateTimeOptions = () => {
  const options: Record<number, string> = {};
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute}`;
      const totalMinutes = hour * 60 + minute;
      options[totalMinutes] = time;
    }
  }
  return Object.entries(options);
};

type Props = {
  name: string;
  label?: string;
  control: Control<any>;
};
const InputTime: React.FC<Props> = ({ name, label, control }) => {
  const items = generateTimeOptions();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  const timeValue = value as number | undefined;

  const handleSelectTime = (keys: Selection) => {
    const key = Array.from(keys).at(0);
    const selectedTime = key ? parseInt(key.toString()) : undefined;

    if (selectedTime !== undefined) {
      onChange(selectedTime);
    }
  };
  return (
    <Select
      onSelectionChange={handleSelectTime}
      selectedKeys={timeValue ? [timeValue.toString()] : undefined}
      variant="bordered"
      selectionMode="single"
      label={label}
      items={items}
      classNames={{
        label: "top-1",
        popoverContent: "text-foreground",
      }}
    >
      {([key, value]) => <SelectItem key={key}>{value}</SelectItem>}
    </Select>
  );
};

export default InputTime;
