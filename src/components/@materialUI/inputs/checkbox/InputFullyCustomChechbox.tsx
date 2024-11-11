import { Checkbox } from "@nextui-org/react";
import { ReactNode } from "react";
import { Control, useController } from "react-hook-form";

function InputFullyCustomCheckbox({ id, name, isDisabled, control, children }: {
    id: string
    name: string
    isDisabled?: boolean
    control: Control<any>
    children: ReactNode
}) {
    const { field: { value, onChange }, fieldState: { error } } = useController({
        name,
        control,
        disabled: isDisabled
    })
    return (
        <Checkbox
            value={id}
            isDisabled={isDisabled}
            isSelected={value}
            onValueChange={onChange}
            classNames={{
                base: "max-w-full py-2 m-0 border-2 rounded-xl ",
                label: "flex flex-row gap-2 w-full "
            }}
        >
            {children}
        </Checkbox>
    )
}

export default InputFullyCustomCheckbox;