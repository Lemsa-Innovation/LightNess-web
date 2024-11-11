import { Button } from "@nextui-org/react";
import { MouseEventHandler } from "react";

const SendButton = ({ children ,onClick}: { children: React.ReactNode ,onClick: MouseEventHandler<HTMLButtonElement> | undefined}) => {
  return (
    <Button
      isIconOnly
      onClick={onClick}
      className="bg-primary"
    >
      {children}
    </Button>
  )
}

export default SendButton