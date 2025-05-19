"use client";
import clsx from "clsx";
import { useState } from "react";
import { ChevronIcon } from "../icons";
import NavSection from "./NavSection";

function Sidebar() {
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const onCollapseClick = () => {
    setCollapsed(!isCollapsed);
  };
  const className = clsx(
    "hidden border-r-1 border-dashed space-y-2 md:flex md:flex-col",
    isCollapsed
      ? "md:w-[7rem] md:min-w-[7rem] "
      : "md:w-[18rem] md:min-w-[18rem]"
  );

  return (
    <div className={className}>
      <div className="flex flex-row w-full justify-end z-10 ">
        <button
          onClick={onCollapseClick}
          className=" translate-x-3 translate-y-3 z-10  rounded-full bg-content1 p-0 border-1  w-6 h-6 "
        >
          <ChevronIcon
            filled
            left={!isCollapsed}
            right={isCollapsed}
            size={20}
          />
        </button>
      </div>
      <NavSection isCollapsed={isCollapsed} />
    </div>
  );
}

export { Sidebar };
