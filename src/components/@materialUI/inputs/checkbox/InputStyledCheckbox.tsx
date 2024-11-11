import { useLanguage } from "@/contexts/language/LanguageContext";
import { Field } from "@/language/structure/inputs";
import { getRuleErrors } from "@/modules/validations/helpers";
import { Checkbox, CheckboxGroup, cn } from "@nextui-org/react";
import { ReactNode } from "react";
import { Control, useController } from "react-hook-form";

function InputStyledCheckbox({ control, name, label, field, isDefaultText, isBordered, description, align, isDisabled }: {
    name: string
    field?: Field
    label?: ReactNode
    description?: string
    control: Control<any>
    isBordered?: boolean
    align?: AlignSetting
    isDefaultText?: boolean
    isDisabled?: boolean
}) {
    const { languageData } = useLanguage()
    const { field: { value, onChange }, fieldState: { error } } = useController({
        name,
        control
    })

    const errorMessage = error?.message && getRuleErrors({
        errorMessage: error.message,
        rules: languageData?.rules
    })    
    return (
        <CheckboxGroup
            isDisabled={isDisabled}
            className="col-span-full"
            errorMessage={errorMessage} 
            isInvalid ={!!errorMessage}
            classNames={{
                errorMessage: "text-xs"
            }}
            value={value ? ["default"] : undefined}
        >
            <Checkbox
                color={error ? "danger" : "primary"}
                value={'default'}
                onValueChange={onChange}
                classNames={{
                    base: cn(
                        'm-0 col-span-full min-w-full flex',
                        isBordered && "border-2 rounded-xl border-foreground-200 hover:border-foreground-400",
                        align === "start" && "items-start"
                    )

                }}
            >
                <p
                    className={cn(isDefaultText && "text-foreground-500", "text-base ")}
                >
                    {label ?? field?.label}
                </p>
                <p className="text-foreground-500 text-sm">
                    {description ?? field?.description}
                </p>
            </Checkbox>
        </CheckboxGroup>

    )
}

export default InputStyledCheckbox;