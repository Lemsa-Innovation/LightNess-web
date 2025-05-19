"use client";
import { Button } from "@heroui/react";
import { ChevronIcon } from "../icons";
import { useRouter } from "next/navigation";

function BackButton({ handleClick }: { handleClick?: () => void }) {
  const { back } = useRouter();
  return (
    <Button
      onPress={handleClick ?? back}
      size="sm"
      isIconOnly
      className="rounded-full"
      startContent={<ChevronIcon left filled />}
    />
  );
}

export default BackButton;
