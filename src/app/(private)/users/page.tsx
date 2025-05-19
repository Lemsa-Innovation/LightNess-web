"use client";

import { UsersTable } from "@/components/@materialApp/users";
import { useLanguage } from "@/contexts/language/LanguageContext";

function Page() {
  const { languageData } = useLanguage();
  const users = languageData?.inputs.users;
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <p className="text-2xl font-bold">{users?.labels.title}</p>
      <UsersTable />
    </div>
  );
}

export default Page;
