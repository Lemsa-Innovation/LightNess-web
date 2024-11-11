import {useLanguage} from "@/contexts/language/LanguageContext";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "lucide-react";

function InputSearch({isDisabled, onClear, onSearchChange}: {
    isDisabled?: boolean
    onClear: () => void
    onSearchChange: (value: string) => void
}) {
    const {languageData} = useLanguage()
    return (
        <Input
            isClearable
            size="md"
            isDisabled={isDisabled}
            variant="bordered"
            className="w-full sm:max-w-[44%] rounded-xl"
            placeholder={languageData?.inputs.commons.searchByName.label}
            startContent={<SearchIcon />}
            onClear={onClear}
            onValueChange={onSearchChange}
        />
    )
}

export default InputSearch