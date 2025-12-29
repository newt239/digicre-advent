"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { exportToCSV } from "@/app/actions"
import { useState } from "react"

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const csvContent = await exportToCSV()

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
