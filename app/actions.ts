"use server";

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
