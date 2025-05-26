import { Button } from "@heroui/react";
import { ChevronIcon } from "../icons";
import { useLanguage } from "@/contexts/language/LanguageContext";

interface Props {
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
}

const NextButton: React.FC<Props> = ({ onPress, isDisabled, isLoading }) => {
  const { languageData } = useLanguage();
  const btn = languageData?.commons.buttons.next;
  return (
    <Button
      isLoading={isLoading}
      isDisabled={isDisabled}
      onPress={onPress}
      endContent={<ChevronIcon right filled />}
    >
      {btn}
    </Button>
  );
};

export default NextButton;
