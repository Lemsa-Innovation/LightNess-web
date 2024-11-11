import { DatePicker, DateValue } from "@nextui-org/react";
import { formatISO, startOfDay, subYears } from "date-fns";
import { Control, useController } from "react-hook-form";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { getRuleErrors } from "@/modules/validations/helpers";


const currentDate = new Date();
const minDate = subYears(currentDate, 100); // 100 years ago from the current date
const maxDate = subYears(currentDate, 18); // 18 years ago from the current date

// Calculate the exact minimum date by setting the time to the beginning of the day
const minDateExact = startOfDay(minDate);

// Format the dates to match the input format (YYYY-MM-DD)
const minDateString = formatISO(minDateExact, { representation: 'date' });
const maxDateString = formatISO(maxDate, { representation: 'date' });

type InputProps = {
    name: string
    label?: string
    isDisabled?: boolean
    isRequired?: boolean
    isReadOnly?: boolean
    checkAdult?: boolean
    control: Control<any>
    minValue?: Date
    maxValue?: Date
}

const InputDate: React.FC<InputProps> = ({ label, maxValue, minValue, control, name, isDisabled, isReadOnly, isRequired, checkAdult }) => {
    const { languageData } = useLanguage()

    const { field: { onChange, value }, fieldState: { error } } = useController({
        name,
        control
    })
    const currentDateValue = value as Date | undefined
    const dateValue = currentDateValue ? parseDate(formatISO(currentDateValue, { representation: 'date' })) : undefined
    const handleChange = (value: DateValue) => {
        onChange(value.toDate(getLocalTimeZone()))
    }

    const errorMessage = error?.message ? getRuleErrors({
        errorMessage: error.message,
        rules: languageData?.rules
    }) : undefined
    
    return (
        <DatePicker
            {...(checkAdult ? {
                minValue: parseDate(minDateString),
                maxValue: parseDate(maxDateString)
            } : {})}
            errorMessage={errorMessage}
            value={dateValue}
            isReadOnly={isReadOnly}
            onChange={handleChange}
            variant="bordered"
            label={label}
            isInvalid={!!errorMessage}
            isRequired={isRequired}
            isDisabled={isDisabled}
            minValue={minValue ? parseDate(formatISO(minValue, { representation: 'date' })) : undefined}
            maxValue={maxValue ? parseDate(formatISO(maxValue, { representation: 'date' })) : undefined}
        />
    )
}

export default InputDate;