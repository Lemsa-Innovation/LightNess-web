import { useLanguage } from "@/contexts/language/LanguageContext";
import { useDeviceQuery } from "@/hooks";
import { Button, cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  label?: string;
}
const SaveButton: React.FC<Props> = ({
  label,
  onPress,
  className,
  isDisabled,
  isLoading,
}) => {
  const { languageData } = useLanguage();
  const btn = languageData?.commons.buttons.save;
  const { isMobile } = useDeviceQuery();

  return (
    <Button
      size="md"
      onPress={onPress}
      isLoading={isLoading}
      isDisabled={isDisabled}
      color="primary"
      variant="shadow"
      className={cn("font-semibold", className)}
      isIconOnly={isMobile}
      startContent={!isLoading && <Icon icon="mdi:save" />}
    >
      {!isMobile ? (label ?? btn) : undefined}
    </Button>
  );
};

export default SaveButton;
