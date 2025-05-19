import { Button } from "@heroui/react";
import { PlusIcon } from "../icons";

interface Props {
  isDisabled?: boolean;
  onPress: () => void;
}
const AddButton: React.FC<Props> = ({ onPress, isDisabled }) => {
  return (
    <Button
      isIconOnly
      isDisabled={isDisabled}
      onPress={onPress}
      startContent={<PlusIcon />}
    />
  );
};

export default AddButton;
