import { Chip, InputProps } from "@heroui/react";
import { Status } from "@/language/structure";
import { useLanguage } from "@/contexts/language/LanguageContext";

export const statusColor: Record<keyof Status, InputProps["color"]> = {
  active: "success",
  inactive: "danger",
};
function StatusChip({ statusKey }: { statusKey: keyof Status }) {
  const { languageData } = useLanguage();
  return (
    <Chip variant="dot" color={statusColor[statusKey]}>
      {languageData?.commons.status[statusKey]}
    </Chip>
  );
}

export default StatusChip;
