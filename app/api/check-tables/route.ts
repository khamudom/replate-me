/**
 * API route that checks the existence of required database tables in Supabase.
 * It verifies if 'recipes', 'tags', and 'recipe_tags' tables exist and returns their status.
 * Used for database initialization and health checks.
 */

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Check if tables exist
    const tables = ["recipes", "tags", "recipe_tags"];
    const tableStatus: Record<string, boolean> = {};

    for (const table of tables) {
      try {
        // Use a more reliable approach to check if table exists
        const { data, error } = await supabase.from(table).select("*").limit(1);

        tableStatus[table] = !error;
      } catch (err) {
        tableStatus[table] = false;
      }
    }

    return NextResponse.json({
      success: true,
      tableStatus,
      missingTables: Object.entries(tableStatus)
        .filter(([_, exists]) => !exists)
        .map(([table]) => table),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
