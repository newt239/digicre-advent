"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { Info } from "lucide-react";

type ViewMode = "calendar" | "stack";

type MenuProps = {
  registeredCount: number;
  selectedPage: 1 | 2;
  setSelectedPage: (page: 1 | 2) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isMounted: boolean;
};

export default function Menu({
  registeredCount,
  selectedPage,
  setSelectedPage,
  viewMode,
  setViewMode,
  isMounted,
}: MenuProps) {
  return (
    <div className="md:p-4 w-full md:w-72 flex flex-col md:sticky md:top-6">
      <div className="p-4 md:px-0 md:py-0">
        <header className="text-center md:text-left mb-8 md:mb-6">
          <h1 className="text-4xl font-bold text-christmas-red mb-2 text-balance">
            Advent Calendar
          </h1>
          <p className="text-xl font-semibold text-christmas-green mb-3">
            デジクリ 2025
          </p>
          <p className="text-muted-foreground text-base">
            12月25日まで、毎日みんなで記事を投稿
          </p>
        </header>

        <div className="mb-8 md:mb-8 max-w-2xl mx-auto md:mx-0">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is-advent-calendar">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Info className="w-4 h-4 mr-2" aria-hidden="true" />
                  アドベントカレンダーとは？
                </div>
              </AccordionTrigger>
              <AccordionContent>
                アドベントカレンダーは、12月1日から12月25日（クリスマス）までの期間に、毎日記事を投稿していくイベントです。記事の内容は問いません。自分の創作に関することや最近あったできごとなど、自由に投稿してください。昨年度企画紹介記事「
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

        {isMounted && (
          <div className="mb-6 md:mb-6 flex flex-col gap-3 sticky top-0">
            {registeredCount > 15 && (
              <ToggleGroup
                type="single"
                value={selectedPage.toString()}
                onValueChange={(value) => {
                  if (value === "1" || value === "2")
                    setSelectedPage(Number(value) as 1 | 2);
                }}
                className="bg-muted"
              >
                <ToggleGroupItem
                  value="1"
                  aria-label="Page 1"
                  className="w-full"
                >
                  <span className="inline">Page 1</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="2"
                  aria-label="Page 2"
                  className="w-full"
                >
                  <span className="inline">Page 2</span>
                </ToggleGroupItem>
              </ToggleGroup>
            )}

            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => {
                if (value) setViewMode(value as ViewMode);
              }}
              className="hidden md:flex bg-muted"
            >
              <ToggleGroupItem
                value="calendar"
                aria-label="カレンダー表示"
                className="gap-2 w-full"
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden md:inline">カレンダー</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="stack"
                aria-label="リスト表示"
                className="gap-2 w-full"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline">リスト</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </div>
    </div>
  );
}
