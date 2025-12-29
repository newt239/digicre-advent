"use client";

import type { CalendarEntry } from "@/app/actions";
import { useEffect, useState } from "react";
import { CalendarView } from "@/components/calendar-view";
import { StackView } from "@/components/stack-view";
import Menu from "@/components/menu";

type ContentProps = {
  entries: CalendarEntry[];
};

export function Content({ entries }: ContentProps) {
  const [selectedPage, setSelectedPage] = useState<1 | 2>(1);
  const [viewMode, setViewMode] = useState<"calendar" | "stack">("calendar");
  const [isMounted, setIsMounted] = useState(false);
  const registeredCount = entries.length;

  // スマートフォンではStack、デスクトップではCalendarをデフォルト表示
  useEffect(() => {
    setIsMounted(true);
    const checkViewport = () => {
      if (window.innerWidth < 768) {
        setViewMode("stack");
      } else {
        setViewMode("calendar");
      }
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const getEntryForDay = (day: number) => {
    return entries.find((e) => e.day === day && e.page === selectedPage);
  };

  return (
    <>
      <Menu
        registeredCount={registeredCount}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isMounted={isMounted}
      />

      <div className="flex-1 overflow-y-scroll h-screen">
        {viewMode === "calendar" ? (
          <CalendarView getEntryForDay={getEntryForDay} />
        ) : (
          <StackView getEntryForDay={getEntryForDay} />
        )}
      </div>
    </>
  );
}
