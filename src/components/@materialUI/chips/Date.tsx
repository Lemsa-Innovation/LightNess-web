import { formatDate, formatTime } from "@/utils";
import { Timestamp } from "@firebase/firestore";
import { Chip, ChipProps } from "@heroui/react";
import { Icon } from "@iconify/react";

function DateChip({
  timestamp,
  variant,
  withIcon,
  withTime,
}: {
  timestamp: Timestamp;
  withTime?: boolean;
  withIcon?: boolean;
  variant?: ChipProps["variant"];
}) {
  return (
    <Chip
      variant={variant}
      startContent={
        withIcon && <Icon icon="mdi:calendar" className="stroke-primary" />
      }
    >
      <p className="text-bold text-small capitalize text-foreground-500">
        {withTime ? formatTime(timestamp) : formatDate(timestamp)}
      </p>
    </Chip>
  );
}

export default DateChip;
