import entriesData from "@/data/entries.json";

export type CalendarEntry = {
  id?: number;
  day: number;
  page: number;
  name: string;
  title: string;
  url: string;
  created_at?: string;
  updated_at?: string;
};

export function getEntries(): CalendarEntry[] {
  return entriesData as CalendarEntry[];
}

export function exportToCSV(): string {
  const entries = getEntries();

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

// 編集機能用の関数（SSGモードでは動作しませんが、型エラーを避けるために定義）
export async function saveEntry(
  entry: CalendarEntry
): Promise<{ success: boolean; error?: string }> {
  // SSGモードでは編集機能は無効化されています
  return { success: false, error: "編集機能はSSGモードでは利用できません" };
}

export async function deleteEntry(
  day: number,
  page: number
): Promise<{ success: boolean; error?: string }> {
  // SSGモードでは編集機能は無効化されています
  return { success: false, error: "編集機能はSSGモードでは利用できません" };
}
