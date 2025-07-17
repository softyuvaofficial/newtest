// app/api/tabs/route.js
import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabaseServer";

export async function GET() {
  const { data, error } = await supabaseServer.from("test_tabs").select("*").order("id");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const { data, error } = await supabaseServer.from("test_tabs").insert([{ name }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PUT(request) {
  const { id, name } = await request.json();
  if (!id || !name)
    return NextResponse.json({ error: "ID and Name are required" }, { status: 400 });

  const { data, error } = await supabaseServer.from("test_tabs").update({ name }).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function DELETE(request) {
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const { error } = await supabaseServer.from("test_tabs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Deleted successfully" });
}
