import {InputVariantProps, Radio, RadioGroup} from '@nextui-org/react';
import {ReactNode} from 'react';
import {Control, useController} from 'react-hook-form';
import {RadioOption} from '.';
import {useLanguage} from '@/contexts/language/LanguageContext';
export type InputRadioProps = {
    name: string;
    values: RadioOption[];
    orientation: "horizontal" | "vertical";
    control: Control<any>;
    label?: string;
    text?: any;
    readOnly?: boolean;
    isRequired?: boolean;
    description?: ReactNode
    asBoolean?: boolean
}

const InputRadio: React.FC<InputRadioProps> = ({
    name,
    orientation,
    control,
    label,
    readOnly,
    values,
    isRequired,
    description,
    asBoolean
}) => {
    const {field: {onChange, value}, fieldState: {error}} = useController({
        control,
        name,
    })

    const getColor = (value: string): InputVariantProps['color'] => {
        switch (value) {
            case "women":
                return "danger"
            case "men":
                return "secondary"
            default:
                return 'primary'
        }
    }


    function getValue() {
        if (typeof value === "boolean") {
            return value.toString()
        }
        return value
    }

    const handleValueChange = (value: string) => {
        if (asBoolean) {
            onChange(value === "true")
        }
        else {
            onChange(value)
        }
    }
    return (
        <RadioGroup
            value={getValue()}
            label={label}
            className='w-full'
            isRequired={isRequired}
            isReadOnly={readOnly}
            orientation={orientation}
            errorMessage={error?.message}
            defaultValue="primary"
            onValueChange={handleValueChange}
            description={description}
        >
            {values.map(({value, label}) => (
                <Radio key={value} value={value} color={getColor(value)}>
                    {label}
                </Radio>
            ))}
        </RadioGroup>
    )
}

const InputBooleanRadio: React.FC<Omit<InputRadioProps, 'values'>> = (props) => {
    const choice = useLanguage().languageData?.inputs.commons.choice
    return (
        <InputRadio
            {...props}
            asBoolean
            values={[
                {value: "true", label: choice?.yes},
                {value: "false", label: choice?.no},
            ]}
        />
    )
}

export {InputRadio, InputBooleanRadio}