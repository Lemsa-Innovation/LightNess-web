import {useLanguage} from "@/contexts/language/LanguageContext";
import {Button} from "@nextui-org/react";

interface Props {
    onClick: () => void
}
const CancelButton: React.FC<Props> = (props) => {
    const {languageData} = useLanguage()
    const btn = languageData?.commons.buttons.cancel
    return (
        <Button
            color="danger"
            {...props}
        >
            {btn}
        </Button>
    )
}

export default CancelButton;