import { ReactNode } from "react";
import { InputVariantProps } from "@heroui/react";
import { Control, useController } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Props = {
  control: Control<any>;
  isRequired?: boolean;
  isReadOnly?: boolean;
  name?: string;
  status?: InputVariantProps["color"];
  endContent?: ReactNode;
  handleKeyUp?: () => void;
  field?: {
    label?: string;
    placeholder?: string;
  };
};

function InputPhoneNumber({
  control,
  name,
  isRequired,
  isReadOnly,
  field,
}: Props) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: name ?? "phoneNumber",
  });

  const errorMessage = error?.message;

  const handlePhoneChange = (phoneValue: string | undefined) => {
    if (phoneValue) {
      // Store the E.164 format for the component, but format for display
      onChange(phoneValue);
    } else {
      onChange(phoneValue);
    }
  };

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-foreground mb-3 block">
        {field?.label || "Phone Number"}
        {isRequired && <span className="text-danger ml-1">*</span>}
      </label>
      <div className="mt-2">
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="DZ"
          value={value}
          onChange={handlePhoneChange}
          placeholder={field?.placeholder || "Enter your phone number"}
          disabled={isReadOnly}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            error ? "border-danger" : "border-default-300"
          }`}
        />
      </div>
      {errorMessage && (
        <p className="text-sm text-danger mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

export default InputPhoneNumber;
