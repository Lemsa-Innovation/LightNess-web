"use client";

import { PrivateHeader, Sidebar } from "@/components/@materialUI";
import { ScrollShadow } from "@heroui/react";
import { ReactElement } from "react";
function AdminLayout({ children }: { children: ReactElement }) {
  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden">
      <Sidebar />
      <div className="z-0 flex-grow h-full w-full flex flex-col">
        <PrivateHeader />
        <ScrollShadow className="flex flex-col gap-4 p-4 h-full w-full overflow-auto">
          {children}
        </ScrollShadow>
      </div>
    </div>
  );
}
export default AdminLayout;
