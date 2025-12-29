import { sql } from "@/lib/db";

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

export async function getEntries(): Promise<CalendarEntry[]> {
  try {
    const entries = await sql`
      SELECT id, day, page, name, title, url, created_at, updated_at
      FROM advent_calendar_entries
      ORDER BY day ASC, page ASC
    `;
    return entries as CalendarEntry[];
  } catch (error) {
    console.error("[v0] Error fetching entries:", error);
    // Check if error is due to missing table
    if (error instanceof Error && error.message.includes("does not exist")) {
      console.log(
        "[v0] Table does not exist yet. Please run the SQL script to create it."
      );
    }
    return [];
  }
}

export async function exportToCSV(): Promise<string> {
  const entries = await getEntries();

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

export async function saveEntry(
  entry: CalendarEntry
): Promise<{ success: boolean; error?: string }> {
  try {
    const { day, page, name, title, url } = entry;

    // Check if entry exists
    const existing = await sql`
      SELECT id FROM advent_calendar_entries WHERE day = ${day} AND page = ${page}
    `;

    if (existing.length > 0) {
      // Update existing entry
      await sql`
        UPDATE advent_calendar_entries
        SET name = ${name}, title = ${title}, url = ${url}, updated_at = CURRENT_TIMESTAMP
        WHERE day = ${day} AND page = ${page}
      `;
    } else {
      // Insert new entry
      await sql`
        INSERT INTO advent_calendar_entries (day, page, name, title, url)
        VALUES (${day}, ${page}, ${name}, ${title}, ${url})
      `;
    }

    return { success: true };
  } catch (error) {
    console.error("[v0] Error saving entry:", error);
    return { success: false, error: "Failed to save entry" };
  }
}

export async function deleteEntry(
  day: number,
  page: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await sql`
      DELETE FROM advent_calendar_entries WHERE day = ${day} AND page = ${page}
    `;
    return { success: true };
  } catch (error) {
    console.error("[v0] Error deleting entry:", error);
    return { success: false, error: "Failed to delete entry" };
  }
}
