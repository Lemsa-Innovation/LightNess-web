import {useLanguage} from "@/contexts/language/LanguageContext";
import {screens} from "@/utils/screen";
import {Button} from "@nextui-org/react"
import {Save} from "lucide-react";
import {useMediaQuery} from "react-responsive";

interface Props {
    onClick: () => void
    isDisabled?: boolean
    isLoading?: boolean
    className?: string
    label?: string
}
const SaveButton: React.FC<Props> = ({
    label, onClick, isDisabled, isLoading
}) => {
    const {languageData} = useLanguage()
    const btn = languageData?.commons.buttons.save
    const isMobile = useMediaQuery({maxWidth: screens.md});

    return (
        <Button
            size="md"
            onClick={onClick}
            isLoading={isLoading}
            isDisabled={isDisabled}
            color="primary"
            variant="shadow"
            className="font-semibold"
            isIconOnly={isMobile}
            startContent={!isLoading && <Save size={20} />}
        >
            {!isMobile ? (label ?? btn) : undefined}
        </Button>
    )
}

export default SaveButton