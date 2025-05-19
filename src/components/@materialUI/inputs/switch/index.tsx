import {Switch} from "@heroui/react";
import {Control, useController} from "react-hook-form";

function InputSwitch({control, name}: {
  name: string
  control: Control<any>
}) {
  const {field: {value, onChange}} = useController({
    control,
    name
  })
  return (
    <Switch isSelected={!!value} onValueChange={onChange} />
  )
}

export {
  InputSwitch
};