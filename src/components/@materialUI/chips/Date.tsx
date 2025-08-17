import { formatDate, formatTime } from "@/utils";
import { Timestamp } from "@firebase/firestore";
import { Chip, ChipProps } from "@heroui/react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";

function DateChip({
  timestamp,
  variant,
  withIcon,
  withTime,
}: {
  timestamp: Timestamp | string | Date;
  withTime?: boolean;
  withIcon?: boolean;
  variant?: ChipProps["variant"];
}) {
  const formatDateValue = (timestamp: Timestamp | string | Date) => {
    try {
      if (typeof timestamp === "string") {
        // Handle Supabase date string
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
          return "Invalid date";
        }
        return format(date, "dd-MM-yyyy");
      } else if (timestamp instanceof Date) {
        // Handle Date object
        return format(timestamp, "dd-MM-yyyy");
      } else if (timestamp && typeof timestamp.toDate === "function") {
        // Handle Firebase Timestamp
        return formatDate(timestamp);
      } else {
        return "Invalid date";
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const formatTimeValue = (timestamp: Timestamp | string | Date) => {
    try {
      if (typeof timestamp === "string") {
        // Handle Supabase date string
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
          return "Invalid date";
        }
        return format(date, "dd-MM-yyyy HH:mm:ss");
      } else if (timestamp instanceof Date) {
        // Handle Date object
        return format(timestamp, "dd-MM-yyyy HH:mm:ss");
      } else if (timestamp && typeof timestamp.toDate === "function") {
        // Handle Firebase Timestamp
        return formatTime(timestamp);
      } else {
        return "Invalid date";
      }
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid date";
    }
  };

  return (
    <Chip
      variant={variant}
      startContent={
        withIcon && <Icon icon="mdi:calendar" className="stroke-primary" />
      }
    >
      <p className="text-bold text-small capitalize text-foreground-500">
        {withTime ? formatTimeValue(timestamp) : formatDateValue(timestamp)}
      </p>
    </Chip>
  );
}

export default DateChip;
