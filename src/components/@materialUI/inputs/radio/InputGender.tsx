import { Control } from "react-hook-form";
import { InputRadio } from "./InputRadio";

function InputGender({
  name,
  label,
  control,
  readOnly,
  withKids,
}: {
  name?: string;
  label?: string;
  withKids?: boolean;
  control: Control<any>;
  readOnly?: boolean;
}) {
  const values = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
  ];
  return (
    <InputRadio
      values={values}
      control={control}
      readOnly={readOnly}
      name={name ?? "gender"}
      orientation="horizontal"
      label={label ?? "Gender"}
    />
  );
}

export default InputGender;
