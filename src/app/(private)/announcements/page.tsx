"use client";
import {
  AnnouncementCard,
  AnnouncementModal,
} from "@/components/@materialApp/announcements";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Announcement } from "@/firebase/firestore";
import {
  getCollectionRef,
  useCollectionSnapshots,
} from "@/firebase/firestore/modules";
import { collectionIds } from "@shared/modules";
import { useMemo } from "react";

function Page() {
  const dataRef = useMemo(
    () => getCollectionRef(collectionIds.announcements),
    []
  );
  const { data } = useCollectionSnapshots<Announcement>(dataRef);
  const { languageData } = useLanguage();
  const announcements = languageData?.inputs.announcements;
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-bold">{announcements?.labels.title}</p>
        <AnnouncementModal />
      </div>

      {data?.length === 0 ? (
        <p className="text-sm font-light">{announcements?.labels.empty}</p>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {data?.map((announcement) => (
            <AnnouncementCard
              key={announcement.ref.id}
              announcement={announcement}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
