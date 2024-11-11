import InputGender from "./InputGender";
import { InputRadio ,InputBooleanRadio} from "./InputRadio";
import InputRadioGroup from "./InputRadioGroup";

export interface RadioOption {
    value: string;
    label?: string;
}

export {
    InputRadio,
    InputGender,
    InputRadioGroup,
    InputBooleanRadio
}