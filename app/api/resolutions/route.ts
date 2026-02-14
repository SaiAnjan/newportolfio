import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const TABLE = "resolutions_2026";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, text, notes, emoji")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { text, notes = "", emoji = "✨" } = body;
  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { error: "text is required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ text: text.trim(), notes: String(notes).trim(), emoji: String(emoji) })
    .select("id, text, notes, emoji")
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const body = await request.json();
  const updates: { notes?: string; emoji?: string; text?: string } = {};
  if (typeof body.notes === "string") updates.notes = body.notes;
  if (typeof body.emoji === "string") updates.emoji = body.emoji;
  if (typeof body.text === "string") updates.text = body.text;
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "no updates" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select("id, text, notes, emoji")
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
