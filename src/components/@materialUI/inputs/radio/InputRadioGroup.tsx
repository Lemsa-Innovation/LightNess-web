import { Control, useController } from "react-hook-form"
import { RadioOption } from "."
import { cn, Radio, RadioGroup } from "@nextui-org/react"
import InputCustomRadio from "./InputCustomRadio"
import { Field } from "@/language/structure/inputs"
import { getRuleErrors } from "@/modules/validations/helpers"
import { useLanguage } from "@/contexts/language/LanguageContext"
type Props = {
    name: string
    field?: Field
    values: RadioOption[]
    control: Control<any>
}
const InputRadioGroup: React.FC<Props> = ({ field, values, control, name }) => {
    const { languageData } = useLanguage()
    const { field: { onChange, value }, fieldState: { error } } = useController({
        control,
        name
    })

    const handleSelect = (value: string) => {
        onChange(value)
    }

    const errorMessage = error?.message ? getRuleErrors({
        errorMessage: error.message,
        rules: languageData?.rules
    }) : undefined


    return (
        <RadioGroup
            value={value}
            label={field?.label}
            isInvalid={!!errorMessage}
            errorMessage={errorMessage}
            onValueChange={handleSelect}
            classNames={{
                wrapper: "flex flex-row gap-2",
                base: "flex flex-col gap-2"
            }}
            description={field?.description}
        >
            {values.map(({ value, label }) =>
                <Radio
                    key={value}
                    value={value}
                    content={label}
                    classNames={{
                        base: cn(
                            "inline-flex m-0 bg-content2 hover:bg-content2 items-center justify-between",
                            "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                            "data-[selected=true]:border-primary"
                        ),
                    }}
                >
                    {label}
                </Radio>
            )}
        </RadioGroup>
    )
}
export default InputRadioGroup