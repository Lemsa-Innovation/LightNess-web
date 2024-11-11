import {useLanguage} from "@/contexts/language/LanguageContext";
import {Control} from "react-hook-form";
import {InputRadio} from "./InputRadio";

function InputGender({
    name,
    label,
    control,
    readOnly,
    withKids,
}: ({
    name?: string
    label?: string
    withKids?: boolean
    control: Control<any>
    readOnly?: boolean
})

) {
    const field = useLanguage().languageData?.inputs.commons.gender
    let values = [
        {label: field?.values.men, value: 'men'},
        {label: field?.values.women, value: 'women'},
    ];
    return (
        <InputRadio
            values={values}
            control={control}
            readOnly={readOnly}
            name={name ?? "gender"}
            orientation="horizontal"
            label={label ?? field?.label.unique}
        />
    );
}

export default InputGender;