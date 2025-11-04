import { Calendar } from "@/components/calendar";
import { getEntries } from "@/app/actions";
import { ExportButton } from "@/components/export-button";

export default async function Home() {
  const entries = await getEntries();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-christmas-red mb-2 text-balance">
            Advent Calendar
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-christmas-green mb-3">
            デジクリ
          </p>
          <p className="text-muted-foreground text-base md:text-lg">
            12月25日まで、1日1本の記事をみんなで投稿
          </p>
        </header>

        <Calendar entries={entries} />

        <div className="mt-8 md:mt-12 text-center">
          <ExportButton />
        </div>
      </div>
    </main>
  );
}
