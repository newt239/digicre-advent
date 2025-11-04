"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { CalendarEntry } from "@/app/actions";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { useState, useEffect } from "react";
import { EntryDialog } from "@/components/entry-dialog";
import { CalendarView } from "@/components/calendar-view";
import { StackView } from "@/components/stack-view";

type CalendarProps = {
  entries: CalendarEntry[];
};

type ViewMode = "calendar" | "stack";

export function Calendar({ entries }: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedPage, setSelectedPage] = useState<1 | 2>(1);
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
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

  const handleEditClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <>
      {isMounted && (
        <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
          {registeredCount > 15 ? (
            <ToggleGroup
              type="single"
              value={selectedPage.toString()}
              onValueChange={(value) => {
                if (value === "1" || value === "2")
                  setSelectedPage(Number(value) as 1 | 2);
              }}
              className="bg-muted"
            >
              <ToggleGroupItem value="1" aria-label="Page 1" className="gap-2">
                <span className="inline">Page 1</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="2" aria-label="Page 2" className="gap-2">
                <span className="inline">Page 2</span>
              </ToggleGroupItem>
            </ToggleGroup>
          ) : (
            <div />
          )}

          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => {
              if (value) setViewMode(value as ViewMode);
            }}
            className="bg-muted"
          >
            <ToggleGroupItem
              value="calendar"
              aria-label="カレンダー表示"
              className="gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden md:inline">カレンダー</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="stack"
              aria-label="リスト表示"
              className="gap-2"
            >
              <List className="w-4 h-4" />
              <span className="hidden md:inline">リスト</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      )}

      {viewMode === "calendar" ? (
        <CalendarView
          getEntryForDay={getEntryForDay}
          handleEditClick={handleEditClick}
        />
      ) : (
        <StackView
          getEntryForDay={getEntryForDay}
          handleEditClick={handleEditClick}
        />
      )}

      <EntryDialog
        selectedDay={selectedDay}
        selectedPage={selectedPage}
        onClose={() => {
          setSelectedDay(null);
        }}
        existingEntry={selectedDay ? getEntryForDay(selectedDay) : undefined}
      />
    </>
  );
}
