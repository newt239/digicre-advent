"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CalendarEntry } from "@/app/actions"
import { Edit } from "lucide-react"
import { useState } from "react"
import { EntryDialog } from "@/components/entry-dialog"

type CalendarProps = {
  entries: CalendarEntry[]
}

function isValidUrl(urlString: string): boolean {
  if (!urlString) return false
  try {
    const url = new URL(urlString)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function Calendar({ entries }: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const firstDayOfWeek = 0
  const daysInMonth = 25

  const weekdays = ["月", "火", "水", "木", "金", "土", "日"]

  const calendarDays: (number | null)[] = Array(firstDayOfWeek).fill(null)

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const getEntryForDay = (day: number) => {
    return entries.find((e) => e.day === day)
  }

  const handleCardClick = (day: number, entry: CalendarEntry | undefined) => {
    if (entry && isValidUrl(entry.url)) {
      // If valid URL exists, open it
      window.open(entry.url, "_blank", "noopener,noreferrer")
    } else {
      // Otherwise open edit dialog
      setSelectedDay(day)
      setIsEditing(!!entry)
    }
  }

  const handleEditClick = (e: React.MouseEvent, day: number) => {
    e.stopPropagation()
    setSelectedDay(day)
    setIsEditing(true)
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-7 gap-2 md:gap-3 mb-2">
          {weekdays.map((day) => (
            <div key={day} className="text-center font-bold text-sm md:text-base text-christmas-green py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const entry = getEntryForDay(day)
            const hasEntry = !!entry
            const hasValidUrl = entry && isValidUrl(entry.url)

            return (
              <Card
                key={day}
                onClick={() => handleCardClick(day, entry)}
                role="button"
                tabIndex={0}
                aria-label={
                  hasEntry
                    ? `12月${day}日: ${entry.name}による${entry.title}${hasValidUrl ? "。クリックして記事を開く" : ""}`
                    : `12月${day}日: 未登録。クリックして登録`
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleCardClick(day, entry)
                  }
                }}
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-200
                  hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-christmas-gold
                  ${hasEntry ? "bg-christmas-red border-christmas-gold/30" : "bg-card border-border hover:border-christmas-green/30"}
                `}
              >
                <div className="aspect-square p-2 md:p-3 flex flex-col">
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className={`text-lg md:text-2xl font-bold ${hasEntry ? "text-white" : "text-muted-foreground"}`}
                    >
                      {day}
                    </span>
                  </div>

                  {hasEntry ? (
                    <div className="flex-1 flex flex-col justify-between gap-0.5">
                      <div className="flex-1">
                        <p className="text-[10px] md:text-xs font-medium text-white/90 truncate">{entry.name}</p>
                        <p className="text-xs md:text-sm font-semibold text-white line-clamp-2 leading-tight">
                          {entry.title}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => handleEditClick(e, day)}
                        className="h-6 px-2 text-[10px] md:text-xs text-white hover:bg-white/20 hover:text-white mt-1 self-start"
                        aria-label={`12月${day}日の記事を編集`}
                      >
                        <Edit className="w-3 h-3 mr-1" aria-hidden="true" />
                        編集
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-end">
                      <p className="text-[10px] md:text-xs text-muted-foreground">クリックして登録</p>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <EntryDialog
        selectedDay={selectedDay}
        onClose={() => {
          setSelectedDay(null)
          setIsEditing(false)
        }}
        existingEntry={selectedDay ? getEntryForDay(selectedDay) : undefined}
      />
    </>
  )
}
