"use client";
import { useLanguage } from "@/contexts/language/LanguageContext";

function Page() {
  const { languageData } = useLanguage();
  const cemeteries = languageData?.inputs.cemeteries;
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <p className="text-2xl font-bold">{cemeteries?.labels.title}</p>
      <p className="text-sm font-light">{cemeteries?.labels.empty}</p>
    </div>
  );
}

export default Page;
