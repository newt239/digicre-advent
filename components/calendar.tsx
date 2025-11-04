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
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [isMounted, setIsMounted] = useState(false);

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
    return entries.find((e) => e.day === day);
  };

  const handleEditClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <>
      {isMounted && (
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex justify-center">
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
                <span className="inline">カレンダー</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="stack"
                aria-label="リスト表示"
                className="gap-2"
              >
                <List className="w-4 h-4" />
                <span className="inline">リスト</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
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
        onClose={() => {
          setSelectedDay(null);
        }}
        existingEntry={selectedDay ? getEntryForDay(selectedDay) : undefined}
      />
    </>
  );
}
