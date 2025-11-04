import { Calendar } from "@/components/calendar";
import { getEntries } from "@/app/actions";
import { ExportButton } from "@/components/export-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";

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

        <div className="mb-8 md:mb-12 max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is-advent-calendar">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Info className="w-4 h-4 mr-2" aria-hidden="true" />
                  アドベントカレンダーとは？
                </div>
              </AccordionTrigger>
              <AccordionContent>
                アドベントカレンダーは、12月1日から12月25日（クリスマス）までの期間に、毎日1本ずつ記事を投稿していくイベントです。記事の内容は問いません。自分の創作に関することや最近あったできごとなど、自由に投稿してください。昨年度企画紹介記事「
                <a
                  href="https://note.com/muyuu_/n/na6b4dba212e8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-christmas-green underline"
                >
                  今年も来たぞ！デジクリアドカレ2024
                </a>
                」も参考にしてください。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Calendar entries={entries} />

        <div className="mt-8 md:mt-12 text-center">
          <ExportButton />
        </div>
      </div>
    </main>
  );
}
