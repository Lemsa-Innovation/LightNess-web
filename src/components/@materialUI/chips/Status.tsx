import { Chip, InputProps } from "@heroui/react";
import { Status } from "@/language/structure";
import { useLanguage } from "@/contexts/language/LanguageContext";

export const statusColor: Record<keyof Status, InputProps["color"]> = {
  open: "success",
  preOpen: "secondary",
  active: "success",
  approved: "success",
  disabled: "danger",
  rejected: "danger",
  inReview: "secondary",
  pending: "warning",
  unverified: "danger",
  busy: "warning",
  closed: "danger",
  paused: "danger",
  available: "success",
  offline: "danger",
  completed: "success",
  removed: "danger",
  inactive: "danger",
};
function StatusChip({ statusKey }: { statusKey: keyof Status }) {
  const { languageData } = useLanguage();
  return (
    <Chip
      variant={statusKey === "removed" ? "bordered" : "dot"}
      color={statusColor[statusKey]}
    >
      {languageData?.commons.status[statusKey]}
    </Chip>
  );
}

export default StatusChip;
