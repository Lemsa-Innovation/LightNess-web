import {useLanguage} from "@/contexts/language/LanguageContext";
import {Button} from "@nextui-org/react";
import {ChevronIcon} from "../icons";

interface Props {
    isLoading?: boolean
    isDisabled?: boolean
    onClick: () => void
}

const NextButton: React.FC<Props> = ({onClick, isDisabled, isLoading}) => {
    const {languageData} = useLanguage()
    const btn = languageData?.commons.buttons.next
    return (
        <Button
            isLoading={isLoading}
            isDisabled={isDisabled}
            onClick={onClick}
            endContent={<ChevronIcon right filled />}
        >
            {btn}
        </Button>
    )
}

export default NextButton;