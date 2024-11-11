import { Checkbox } from "@nextui-org/react";
import { Control, useController } from "react-hook-form";

type Props = {
    name: string
    label?: string
    onClick?: () => void
    control: Control<any>
}
const InputCheckbox: React.FC<Props> = ({ control, label, name , onClick}) => {
    const { field: { value, onChange } } = useController({
        control,
        name
    })
    return (
        <Checkbox
            isSelected={value}
            onValueChange={(isSelected) => {
                onChange(isSelected)
            }}
        >
            {label}
        </Checkbox>
    );
}

export default InputCheckbox;