import { useLanguage } from "@/contexts/language/LanguageContext";
import { Field } from "@/language/structure/inputs";
import { getRuleErrors } from "@/modules/validations/helpers";
import { Button, Input, InputVariantProps } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { ReactNode } from "react";
import { Control, useController } from "react-hook-form";

type Props = {
    name: string
    field?: Field
    className?: string
    control: Control<any>
    isDisabled?: boolean
    isRequired?: boolean
    isReadOnly?: boolean
    endContent?: ReactNode
    startContent?: ReactNode
    size?: InputVariantProps['size']
    status?: InputVariantProps["color"]
    variant?: InputVariantProps['variant']
    handleKeyUp?: () => void
    min? : string | number
    max? : string | number
}
const InputIntegerNumber: React.FC<Props> = ({
    control, className,max,min,
    name, handleKeyUp, field, endContent, startContent,
    size, isReadOnly, isDisabled, isRequired, status, variant
}) => {
    const { languageData } = useLanguage()

    const { field: { onChange, value }, fieldState: { error } } = useController({
        name,
        control
    })

    const errorMessage = error?.message && getRuleErrors({
        rules: languageData?.rules,
        errorMessage: error?.message,
    })

    return (
        <Input
            {...field}
            type="number"
            min={min}
            max={max}
            className={className}
            value={isNaN(value) ? "" : value}
            inputMode="numeric"
            size={size ?? "md"}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isClearable={!isReadOnly}
            endContent={endContent}
            isInvalid={!!error}
            startContent={startContent}
            variant={variant ?? "bordered"}
            color={error ? 'danger' : status}
            onClear={!isReadOnly ? (() => onChange(undefined)) : undefined}
            errorMessage={errorMessage}
            isReadOnly={isReadOnly}

            onValueChange={(value) => {
                const reformattedValue = parseFloat(value)
                if (!isNaN(reformattedValue)) {
                    onChange(reformattedValue)
                }
                else onChange("")
            }}
            {...(handleKeyUp ? {
                onKeyUp: (event) => {
                    if (event.code === "Enter" || event.code === "NumpadEnter") {
                        handleKeyUp()
                    }
                }
            } : {})}
        />

    )
}

export default InputIntegerNumber;