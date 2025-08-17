"use client";
import {
  AnnouncementCard,
  AddAnnouncementModal,
} from "@/components/@materialApp/announcements";
import { useLanguage } from "@/contexts/language/LanguageContext";

import { useSupabaseAnnouncements } from "@/hooks/useSupabaseAnnouncements";

function Page() {
  const { announcements, isLoading, error, refetch } =
    useSupabaseAnnouncements();
  const { languageData } = useLanguage();
  const announcementsData = languageData?.inputs.announcements;

  if (isLoading) {
    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-2xl font-bold">
            {announcementsData?.labels.title}
          </p>
        </div>
        <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">Loading announcements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-2xl font-bold">
            {announcementsData?.labels.title}
          </p>
        </div>
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">
            Error loading announcements: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-bold">{announcementsData?.labels.title}</p>
        <AddAnnouncementModal onSuccess={refetch} />
      </div>

      {announcements.length === 0 ? (
        <p className="text-sm font-light">{announcementsData?.labels.empty}</p>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onSuccess={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
