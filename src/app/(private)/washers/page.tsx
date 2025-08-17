"use client";
import { WashersTable } from "@/components/@materialApp/washers";
import { useLanguage } from "@/contexts/language/LanguageContext";

function Page() {
  const { languageData } = useLanguage();
  const washers = languageData?.inputs.washers;

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <p className="text-2xl font-bold">{washers?.labels.title}</p>
      <WashersTable />
    </div>
  );
}

export default Page;
