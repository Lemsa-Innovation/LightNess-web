import { useLanguage } from "@/contexts/language/LanguageContext";
import { getRuleErrors } from "@/modules/validations/helpers";
import { Field } from "@/language/structure/inputs";
import { Textarea } from "@nextui-org/react"
import { Control, useController } from "react-hook-form";

const InputTextArea: React.FC<{
    control: Control<any>
    name: string
    field: Field | undefined
}> = ({ control, name, field }) => {

    const { languageData } = useLanguage()
    const rules = languageData?.rules
    const { field: { onChange, value }, fieldState: { error } } = useController({
        control,
        name
    })
    return (
        <Textarea
            {...field}
            rows={5}
            value={value}
            variant="bordered"
            onChange={onChange}
            isInvalid={!!error}
            className="w-full dark:text-white"
            color={error ? "danger" : "default"}
            errorMessage={error?.message && getRuleErrors({ errorMessage: error?.message, rules })}
        />
    )
}
export default InputTextArea