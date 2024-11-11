import {useState} from "react";
import {Input} from "@nextui-org/react";
import {Control, useController} from 'react-hook-form';
import {useLanguage} from "@/contexts/language/LanguageContext";
import {EyeFilledIcon, EyeSlashFilledIcon} from "../../icons";

const InputPassword: React.FC<{
    name?: string
    control: Control<any>
    isRequired?: boolean
}> = ({
    name,
    control,
    isRequired
}) => {
        const password = useLanguage().languageData?.inputs.users.fields.password
        const [isVisible, setIsVisible] = useState(false);
        const toggleVisibility = () => setIsVisible(!isVisible);

        const {field, fieldState: {error}} = useController({
            control,
            name: name ?? 'password',
            //defaultValue: value,
        })
        return (
            <Input
                {...field}
                label={password?.label}
                placeholder={password?.placeholder}
                size="md"
                variant="bordered"
                isRequired={isRequired}
                type={isVisible ? "text" : "password"}
                color={error ? 'danger' : 'default'}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                errorMessage={error?.message}
            />
        );
    }

export default InputPassword;