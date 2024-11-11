import { Input, InputVariantProps } from "@nextui-org/react";
import { ReactNode } from "react";
import { CopyButton } from "../../buttons"; 
import { Field } from "@/language/structure/inputs";

//-----------------------------------------------------------------------
type InputProps = {
    defaultValue?: any
    size?: InputVariantProps['size']
    isDisabled?: boolean
    color?: InputVariantProps["color"]
    variant?: InputVariantProps['variant']
    field?: Field
    startContent?: ReactNode
} & ({
    allowCopy: true
} | {
    allowCopy?: false
    endContent?: ReactNode
})



const InputReadText: React.FC<InputProps> = (props) => {
    const { defaultValue, color, variant, isDisabled, field, size, startContent } = props

    return (
        <Input
            label={field?.label}
            isReadOnly
            size={size ?? "md"}
            variant={variant || "bordered"}
            value={defaultValue || ""}
            color={color}
            isDisabled={isDisabled}
            startContent={startContent}
            endContent={props.allowCopy ?  <CopyButton value={defaultValue} /> : props.endContent}
        />
    );
}

export default InputReadText;