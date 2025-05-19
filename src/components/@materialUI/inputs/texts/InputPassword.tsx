import { useState } from "react";
import { Input } from "@heroui/react";
import { Control, useController } from "react-hook-form";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../icons";
import { useLanguage } from "@/contexts/language/LanguageContext";

const InputPassword: React.FC<{
  name?: string;
  control: Control<any>;
  isRequired?: boolean;
}> = ({ name, control, isRequired }) => {
  const { languageData } = useLanguage();
  const password = languageData?.inputs.users.fields.password;
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: name ?? "password",
    //defaultValue: value,
  });
  return (
    <Input
      {...field}
      label={password?.label}
      placeholder={password?.placeholder}
      size="md"
      variant="bordered"
      isRequired={isRequired}
      type={isVisible ? "text" : "password"}
      color={error ? "danger" : "default"}
      classNames={{
        label: "top-1",
      }}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
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
};

export default InputPassword;
