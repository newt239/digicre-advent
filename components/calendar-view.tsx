"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CalendarEntry } from "@/app/actions";
import { Edit, ExternalLink } from "lucide-react";
import Link from "next/link";

type CalendarViewProps = {
  entries: CalendarEntry[];
  getEntryForDay: (day: number) => CalendarEntry | undefined;
  handleEditClick: (day: number) => void;
};

function isValidUrl(urlString: string): boolean {
  if (!urlString) return false;
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function CalendarView({
  entries,
  getEntryForDay,
  handleEditClick,
}: CalendarViewProps) {
  const firstDayOfWeek = 0;
  const daysInMonth = 25;

  const weekdays = ["月", "火", "水", "木", "金", "土", "日"];

  const calendarDays: (number | null)[] = Array(firstDayOfWeek).fill(null);

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-7 gap-2 md:gap-3 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center font-bold text-sm md:text-base text-christmas-green py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {calendarDays.map((day) => {
          if (day === null) {
            return <div key={`empty-${day}`} className="aspect-square" />;
          }

          const entry = getEntryForDay(day);
          const hasEntry = !!entry;
          const hasValidUrl = entry && isValidUrl(entry.url);

          return (
            <Card
              key={day}
              className={`
                relative overflow-hidden transition-all duration-200
                hover:scale-105 hover:shadow-lg
                ${
                  hasEntry
                    ? "bg-christmas-red border-christmas-gold/30"
                    : "bg-card border-border hover:border-christmas-green/30"
                }
              `}
            >
              <div className="aspect-square p-2 md:p-3 flex flex-col">
                <div className="flex items-start justify-between mb-1">
                  <span
                    className={`text-lg md:text-2xl font-bold ${
                      hasEntry ? "text-white" : "text-muted-foreground"
                    }`}
                  >
                    {day}
                  </span>
                </div>

                {hasEntry ? (
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-[10px] md:text-xs font-medium text-white/90 truncate">
                        {entry.name}
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-white line-clamp-2 leading-tight">
                        {entry.title}
                      </p>
                    </div>
                    <div className="flex gap-1.5 mt-auto">
                      {hasValidUrl && (
                        <Link
                          href={entry.url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 h-6 px-2 text-[10px] md:text-xs text-white bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                          aria-label={`12月${day}日の記事「${entry.title}」を開く（新しいタブ）`}
                        >
                          <ExternalLink
                            className="w-3 h-3"
                            aria-hidden="true"
                          />
                          開く
                        </Link>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditClick(day)}
                        className={`${
                          hasValidUrl
                            ? "h-6 px-2 text-[10px] md:text-xs text-white hover:bg-white/20 hover:text-white shrink-0"
                            : "h-8 px-3 text-xs md:text-sm text-muted-foreground hover:text-foreground hover:bg-muted w-full"
                        }`}
                        aria-label={`12月${day}日の記事を編集`}
                      >
                        <Edit
                          className={`w-3 h-3 ${!hasValidUrl ? "mr-1" : ""}`}
                          aria-hidden="true"
                        />
                        {!hasValidUrl && "編集"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditClick(day)}
                      className="h-8 px-3 text-xs md:text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                      aria-label={`12月${day}日の記事を登録`}
                    >
                      <Edit className="w-3 h-3 mr-1" aria-hidden="true" />
                      登録
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
