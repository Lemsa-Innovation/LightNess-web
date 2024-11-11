import {useLanguage} from "@/contexts/language/LanguageContext";
import {Status} from "@/language/structure/commons";
import {Chip, InputProps} from "@nextui-org/react";

export const statusColor: Record<keyof Status, InputProps['color']> = {
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
    completed: "success"
}
function StatusChip({statusKey}: {
    statusKey: keyof Status
}) {
    const {languageData} = useLanguage()
    return (
        <Chip
            variant="bordered"
            color={statusColor[statusKey]}
        >
            {languageData?.commons.status[statusKey]}
        </Chip>
    );
}

export default StatusChip;