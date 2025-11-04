import { Calendar } from "@/components/calendar"
import { getEntries } from "@/app/actions"
import { ExportButton } from "@/components/export-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function Home() {
  let entries = []
  let hasError = false

  try {
    entries = await getEntries()
  } catch (error) {
    console.error("[v0] Failed to fetch entries:", error)
    hasError = true
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-christmas-red mb-2 text-balance">Advent Calendar</h1>
          <p className="text-xl md:text-2xl font-semibold text-christmas-green mb-3">芝浦工業大学 デジクリ</p>
          <p className="text-muted-foreground text-base md:text-lg">12月25日まで、1日1本の記事をみんなで投稿</p>
        </header>

        {hasError && (
          <Alert variant="destructive" className="mb-6 max-w-3xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>データベースのセットアップが必要です</AlertTitle>
            <AlertDescription>
              画面右側の「Scripts」セクションで{" "}
              <code className="bg-black/10 px-1 rounded">001_create_advent_calendar_table.sql</code>{" "}
              を実行してください。
            </AlertDescription>
          </Alert>
        )}

        <Calendar entries={entries} />

        <div className="mt-8 md:mt-12 text-center">
          <ExportButton />
        </div>
      </div>
    </main>
  )
}
