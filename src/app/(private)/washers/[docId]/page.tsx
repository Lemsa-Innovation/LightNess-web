"use client"

import {SuggestionView} from "@/components/@materialApp/suggestions/custom";


function Page({params: {docId}}: {
  params: {
    docId: string
  }
}) {
  return (
    <div className="flex w-full h-full">
      <SuggestionView docId={docId} />
    </div>
  );
}

export default Page;