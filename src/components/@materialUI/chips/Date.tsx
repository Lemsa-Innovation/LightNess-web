import {formatDate, formatTime} from "@/utils/fDate";
import {Timestamp} from "@firebase/firestore";
import {Chip, ChipProps} from "@nextui-org/react";
import {Calendar} from "iconsax-react";

function DateChip({timestamp, variant, withIcon, withTime}: {
    timestamp: Timestamp
    withTime?: boolean
    withIcon?: boolean
    variant?: ChipProps["variant"]
}) {
    return (
        <Chip
            variant={variant}
            startContent={withIcon && <Calendar size="20" className="stroke-primary" />}
        >
            <p className="text-bold text-small capitalize text-foreground-500">
                {withTime ? formatTime(timestamp) : formatDate(timestamp)}
            </p>
        </Chip>
    );
}

export default DateChip;