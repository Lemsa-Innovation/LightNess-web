"use client";
import {
  UpdateWasherModal,
  WashersTable,
} from "@/components/@materialApp/washers";
import { DisplayAvatar, EditIcon } from "@/components/@materialUI";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useWashers } from "@/firebase/firestore/collections/washers";
import { Listbox, ListboxItem } from "@heroui/react";

function Page() {
  const { languageData } = useLanguage();
  const washers = languageData?.inputs.washers;
  const { data, isLoading, error } = useWashers();

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <p className="text-2xl font-bold">{washers?.labels.title}</p>
      <WashersTable />
    </div>
  );
}

export default Page;
