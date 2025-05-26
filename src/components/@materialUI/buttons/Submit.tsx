import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/language/LanguageContext";

interface Props {
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}
const SubmitButton: React.FC<Props> = (props) => {
  const { languageData } = useLanguage();
  const btn = languageData?.commons.buttons.submit;
  return (
    <Button color="primary" {...props}>
      {btn}
    </Button>
  );
};

export default SubmitButton;
