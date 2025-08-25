import { ReactNode } from "react";
import { Select, SelectItem, SelectVariantProps } from "@heroui/react";
import { Control, useController } from "react-hook-form";

type Props = {
  control: Control<any>;
  isRequired?: boolean;
  isReadOnly?: boolean;
  name?: string;
  status?: SelectVariantProps["color"];
  endContent?: ReactNode;
  handleKeyUp?: () => void;
  field?: {
    label?: string;
    placeholder?: string;
  };
};

const countries = [
  { code: "DZ", name: "Algeria" },
  { code: "FR", name: "France" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "SI", name: "Slovenia" },
  { code: "SK", name: "Slovakia" },
  { code: "LT", name: "Lithuania" },
  { code: "LV", name: "Latvia" },
  { code: "EE", name: "Estonia" },
  { code: "IE", name: "Ireland" },
  { code: "PT", name: "Portugal" },
  { code: "GR", name: "Greece" },
  { code: "CY", name: "Cyprus" },
  { code: "MT", name: "Malta" },
  { code: "LU", name: "Luxembourg" },
  { code: "IS", name: "Iceland" },
  { code: "LI", name: "Liechtenstein" },
  { code: "MC", name: "Monaco" },
  { code: "SM", name: "San Marino" },
  { code: "VA", name: "Vatican City" },
  { code: "AD", name: "Andorra" },
  { code: "MA", name: "Morocco" },
  { code: "TN", name: "Tunisia" },
  { code: "LY", name: "Libya" },
  { code: "EG", name: "Egypt" },
  { code: "SD", name: "Sudan" },
  { code: "TD", name: "Chad" },
  { code: "NE", name: "Niger" },
  { code: "ML", name: "Mali" },
  { code: "BF", name: "Burkina Faso" },
  { code: "MR", name: "Mauritania" },
  { code: "SN", name: "Senegal" },
  { code: "GM", name: "Gambia" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "SL", name: "Sierra Leone" },
  { code: "LR", name: "Liberia" },
  { code: "CI", name: "Ivory Coast" },
  { code: "GH", name: "Ghana" },
  { code: "TG", name: "Togo" },
  { code: "BJ", name: "Benin" },
  { code: "NG", name: "Nigeria" },
  { code: "CM", name: "Cameroon" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "GA", name: "Gabon" },
  { code: "CG", name: "Republic of the Congo" },
  { code: "CD", name: "Democratic Republic of the Congo" },
  { code: "CF", name: "Central African Republic" },
  { code: "SS", name: "South Sudan" },
  { code: "ET", name: "Ethiopia" },
  { code: "ER", name: "Eritrea" },
  { code: "DJ", name: "Djibouti" },
  { code: "SO", name: "Somalia" },
  { code: "KE", name: "Kenya" },
  { code: "UG", name: "Uganda" },
  { code: "RW", name: "Rwanda" },
  { code: "BI", name: "Burundi" },
  { code: "TZ", name: "Tanzania" },
  { code: "MZ", name: "Mozambique" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "ZM", name: "Zambia" },
  { code: "MW", name: "Malawi" },
  { code: "AO", name: "Angola" },
  { code: "NA", name: "Namibia" },
  { code: "BW", name: "Botswana" },
  { code: "LS", name: "Lesotho" },
  { code: "SZ", name: "Eswatini" },
  { code: "ZA", name: "South Africa" },
  { code: "MG", name: "Madagascar" },
  { code: "MU", name: "Mauritius" },
  { code: "SC", name: "Seychelles" },
  { code: "KM", name: "Comoros" },
  { code: "YT", name: "Mayotte" },
  { code: "RE", name: "Réunion" },
  { code: "ST", name: "São Tomé and Príncipe" },
  { code: "CV", name: "Cape Verde" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "SL", name: "Sierra Leone" },
  { code: "LR", name: "Liberia" },
  { code: "CI", name: "Ivory Coast" },
  { code: "GH", name: "Ghana" },
  { code: "TG", name: "Togo" },
  { code: "BJ", name: "Benin" },
  { code: "NG", name: "Nigeria" },
  { code: "CM", name: "Cameroon" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "GA", name: "Gabon" },
  { code: "CG", name: "Republic of the Congo" },
  { code: "CD", name: "Democratic Republic of the Congo" },
  { code: "CF", name: "Central African Republic" },
  { code: "SS", name: "South Sudan" },
  { code: "ET", name: "Ethiopia" },
  { code: "ER", name: "Eritrea" },
  { code: "DJ", name: "Djibouti" },
  { code: "SO", name: "Somalia" },
  { code: "KE", name: "Kenya" },
  { code: "UG", name: "Uganda" },
  { code: "RW", name: "Rwanda" },
  { code: "BI", name: "Burundi" },
  { code: "TZ", name: "Tanzania" },
  { code: "MZ", name: "Mozambique" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "ZM", name: "Zambia" },
  { code: "MW", name: "Malawi" },
  { code: "AO", name: "Angola" },
  { code: "NA", name: "Namibia" },
  { code: "BW", name: "Botswana" },
  { code: "LS", name: "Lesotho" },
  { code: "SZ", name: "Eswatini" },
  { code: "ZA", name: "South Africa" },
  { code: "MG", name: "Madagascar" },
  { code: "MU", name: "Mauritius" },
  { code: "SC", name: "Seychelles" },
  { code: "KM", name: "Comoros" },
  { code: "YT", name: "Mayotte" },
  { code: "RE", name: "Réunion" },
  { code: "ST", name: "São Tomé and Príncipe" },
  { code: "CV", name: "Cape Verde" },
];

function InputCountry({
  control,
  name,
  isRequired,
  isReadOnly,
  status,
  field,
}: Props) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: name ?? "country",
  });

  const errorMessage = error?.message;

  return (
    <Select
      label={field?.label || "Country"}
      placeholder={field?.placeholder || "Select your country"}
      selectedKeys={value ? [value] : []}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0] as string;
        onChange(selectedKey);
      }}
      isInvalid={!!errorMessage}
      errorMessage={errorMessage}
      color={error ? "danger" : status}
      isRequired={isRequired}
      isDisabled={isReadOnly}
      variant="bordered"
      size="md"
      classNames={{
        label: "text-sm font-medium text-foreground mb-3",
        trigger: "mt-2",
      }}
    >
      {countries.map((country) => (
        <SelectItem key={country.code}>{country.name}</SelectItem>
      ))}
    </Select>
  );
}

export default InputCountry;
