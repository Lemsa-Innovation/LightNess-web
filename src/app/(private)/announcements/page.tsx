"use client";
import {
  AnnouncementCard,
  AnnouncementModal,
} from "@/components/@materialApp/announcements";
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

  return (
    <div className="flex flex-col items-start gap-4">
      <AnnouncementModal />
      <div className="grid grid-cols-12 gap-4">
        {data?.map((announcement) => (
          <AnnouncementCard
            key={announcement.ref.id}
            announcement={announcement}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
