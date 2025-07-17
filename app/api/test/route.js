import { supabaseServer } from '@/utils/supabaseServer'

export async function GET(req) {
  const supabase = supabaseServer;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const { data, error } = await supabase
      .from("test_series")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } else {
    const { data, error } = await supabase
      .from("test_series")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  }
}

export async function POST(req) {
  const supabase = supabaseServer;
  const body = await req.json();

  const { title, description, price, is_paid, assigned_tabs } = body;

  const { data, error } = await supabase.from("test_series").insert([{
    title,
    description,
    price,
    is_paid,
    assigned_tabs,
  }]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 201 });
}

export async function PUT(req) {
  const supabase = supabaseServer;
  const body = await req.json();

  const { id, title, description, price, is_paid, assigned_tabs } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
  }

  const { error } = await supabase
    .from("test_series")
    .update({
      title,
      description,
      price,
      is_paid,
      assigned_tabs,
    })
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(req) {
  const supabase = supabaseServer;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "ID parameter is required" }), { status: 400 });
  }

  const { error } = await supabase.from("test_series").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
