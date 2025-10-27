import { Button, ButtonProps } from "@heroui/react";
import { useLanguage } from "@/contexts/language/LanguageContext";

interface Props {
  onPress: () => void;
  isDisabled?: boolean;
}
const CancelButton: React.FC<Props> = (props) => {
  const { languageData } = useLanguage();
  const btn = languageData?.commons.buttons.cancel;
  return (
    <Button color="danger" {...props}>
      {btn}
    </Button>
  );
};

export default CancelButton;
