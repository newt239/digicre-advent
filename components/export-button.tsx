"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { CalendarEntry } from "@/app/actions"
import { useState } from "react"

type ExportButtonProps = {
  entries: CalendarEntry[];
};

function generateCSV(entries: CalendarEntry[]): string {
  // CSV header in English
  const header = "Day,Page,Name,Title,URL,Created At,Updated At\n";

  // CSV rows
  const rows = entries
    .map((entry) => {
      const day = entry.day;
      const page = entry.page;
      const name = `"${entry.name.replace(/"/g, '""')}"`;
      const title = `"${entry.title.replace(/"/g, '""')}"`;
      const url = entry.url ? `"${entry.url.replace(/"/g, '""')}"` : '""';
      const createdAt = entry.created_at || "";
      const updatedAt = entry.updated_at || "";

      return `${day},${page},${name},${title},${url},${createdAt},${updatedAt}`;
    })
    .join("\n");

  return header + rows;
}

export function ExportButton({ entries }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    try {
      const csvContent = generateCSV(entries)

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `advent-calendar-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Export failed:", error)
      alert("CSVエクスポートに失敗しました")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      className="gap-2 bg-transparent"
      aria-label="カレンダーデータをCSVファイルとしてエクスポート"
    >
      <Download className="w-4 h-4" aria-hidden="true" />
      {isExporting ? "エクスポート中..." : "CSVエクスポート"}
    </Button>
  )
}
