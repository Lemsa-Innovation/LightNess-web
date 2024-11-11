import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";

interface Props {
    isDisabled?: boolean
    onClick: () => void
}
const AddButton: React.FC<Props> = ({ onClick, isDisabled }) => {
    return (
        <Button
            isIconOnly
            isDisabled={isDisabled}
            onClick={onClick}
            startContent={<Plus />}
        />
    )
}

export default AddButton;