"use client"
import { Button } from "@nextui-org/react";
import { ChevronIcon } from "../icons"; 
import { useRouter } from "next/navigation";

function BackButton({handleClick}:{
    handleClick? : () => void
}) {
    const { back } = useRouter()
    return (
        <Button
            onClick={handleClick ?? back}
            size="sm"
            className="rounded-full"
            isIconOnly
            startContent={<ChevronIcon left filled />}
        />
    );
}

export default BackButton;