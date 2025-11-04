"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CalendarEntry } from "@/app/actions";
import { Edit, ExternalLink } from "lucide-react";
import Link from "next/link";

type StackViewProps = {
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

function getDayOfWeek(day: number): string {
  // 2024年12月1日は日曜日
  const date = new Date(2024, 11, day); // 月は0始まりなので11が12月
  const dayOfWeek = date.getDay();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[dayOfWeek];
}

export function StackView({
  entries,
  getEntryForDay,
  handleEditClick,
}: StackViewProps) {
  const daysInMonth = 25;

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
        const entry = getEntryForDay(day);
        const hasEntry = !!entry;
        const hasValidUrl = entry && isValidUrl(entry.url);

        return (
          <Card
            key={day}
            className={`
              relative overflow-hidden transition-all duration-200
              hover:shadow-lg
              ${
                hasEntry
                  ? "bg-christmas-red border-christmas-gold/30"
                  : "bg-card border-border hover:border-christmas-green/30"
              }
            `}
          >
            <div className="p-4 md:p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span
                    className={`text-2xl md:text-3xl font-bold shrink-0 ${
                      hasEntry ? "text-white" : "text-muted-foreground"
                    }`}
                  >
                    12/{day.toString().padStart(2, "0")}
                  </span>
                  {hasEntry && (
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <p className="text-sm md:text-base font-medium text-white/90 truncate">
                        {entry.name}
                      </p>
                      <p className="text-base md:text-lg font-semibold text-white leading-tight truncate">
                        {entry.title}
                      </p>
                    </div>
                  )}
                </div>
                <span
                  className={`text-sm md:text-base font-medium shrink-0 ${
                    hasEntry ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {getDayOfWeek(day)}
                </span>
              </div>

              {hasEntry ? (
                <div className="flex gap-2 mt-2">
                  {hasValidUrl && (
                    <Link
                      href={entry.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-9 px-4 text-sm text-white bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label={`12月${day}日の記事「${entry.title}」を開く（新しいタブ）`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      開く
                    </Link>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditClick(day)}
                    className={`flex-1 ${
                      hasValidUrl
                        ? "h-9 px-4 text-sm text-white hover:bg-white/20 hover:text-white"
                        : "h-9 px-4 text-sm text-white hover:bg-white/20 hover:text-white"
                    }`}
                    aria-label={`12月${day}日の記事を編集`}
                  >
                    <Edit className="w-4 h-4 mr-2" aria-hidden="true" />
                    編集
                  </Button>
                </div>
              ) : (
                <div className="mt-2 flex justify-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditClick(day)}
                    className="h-9 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                    aria-label={`12月${day}日の記事を登録`}
                  >
                    <Edit className="w-4 h-4 mr-2" aria-hidden="true" />
                    登録
                  </Button>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
