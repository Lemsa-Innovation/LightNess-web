"use client";
import { useLanguage } from "@/contexts/language/LanguageContext";

function Page() {
  const { languageData } = useLanguage();
  const washers = languageData?.inputs.washers;
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <p className="text-2xl font-bold">{washers?.labels.title}</p>
      <p className="text-sm font-light">{washers?.labels.empty}</p>
    </div>
  );
}

export default Page;
