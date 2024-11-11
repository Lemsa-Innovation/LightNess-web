"use client"
import AdminHeader from "@/components/@materialUI/header/Header";
import {Sidebar} from "@/components/@materialUI/sidebar";
import {ScrollShadow} from "@nextui-org/react";
import {ReactElement} from "react";

function AdminLayout({children}: {children: ReactElement}) {
    // useEffect(() => {
    //     return getAllRequests()
    // }, [])

    return (
        <div className="h-screen w-screen flex flex-row overflow-hidden" >
            <Sidebar />
            <div className="z-0 flex-grow h-full w-full flex flex-col">
                <AdminHeader />
                <ScrollShadow className="flex flex-col gap-4 p-4 h-full w-full overflow-auto">
                    {children}
                </ScrollShadow >
            </div>
        </div>
    )
}
export default AdminLayout