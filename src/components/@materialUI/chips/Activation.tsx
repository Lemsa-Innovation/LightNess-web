import {useLanguage} from "@/contexts/language/LanguageContext";
import {Chip} from "@nextui-org/react";

function ActivationChip({isActive}: {
  isActive: boolean
}) {
  const {languageData} = useLanguage()
  const status = languageData?.commons.status
  return (
    <Chip
      variant="bordered"
      color={isActive ? "success" : "warning"}
    >
      {isActive ? status?.active : status?.disabled}
    </Chip>
  );
}

export default ActivationChip;