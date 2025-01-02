import {useLanguage} from "@/contexts/language/LanguageContext";
import {Field} from "@/language/structure/inputs";
import {getRuleErrors} from "@/modules/validations/helpers";
import {cn, Input, InputProps, InputVariantProps} from "@nextui-org/react";
import {ReactNode, RefObject} from "react";
import {Control, useController} from "react-hook-form";

//-----------------------------------------------------------------------
type Props = {
    name: string
    size?: InputVariantProps['size']
    control: Control<any>
    isDisabled?: boolean
    isRequired?: boolean
    isReadOnly?: boolean
    ref?: RefObject<HTMLInputElement>
    status?: InputVariantProps["color"]
    variant?: InputVariantProps['variant']
    handleKeyUp?: () => void
    field?: Field
    startContent?: ReactNode
    endContent?: ReactNode
    inputMode?: InputProps['inputMode']
}


const InputText: React.FC<Props> = (props) => {
    const {languageData} = useLanguage()
    const {
        name, ref, field, size, control, status, isReadOnly, variant, handleKeyUp, ...restProps} = props
    const {field: {onChange, value}, fieldState: {error}} = useController({
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
            {...restProps}
            ref={ref}
            size={size ?? "md"}
            variant={variant ?? "bordered"}
            className={cn(
                "text-black",
            )}
            //defaultValue={value}
            value={value ?? ""}
            onValueChange={(value) => {
                onChange(value.length > 0 ? value : undefined)
            }}
            color={error ? 'danger' : status}
            isClearable={!isReadOnly}
            onClear={!isReadOnly ? (() => onChange(undefined)) : undefined}
            isInvalid={!!errorMessage}
            errorMessage={errorMessage}
            isReadOnly={isReadOnly}
            {...(handleKeyUp ? {
                onKeyUp: (event) => {
                    if (event.code === "Enter" || event.code === "NumpadEnter") {
                        handleKeyUp()
                    }
                }
            } : {})}
        />
    );
}

export default InputText;