import { supabaseServer } from '@/utils/supabaseServer'


export async function POST(req) {
  const supabase = createClient();
  const { action, data } = await req.json();

  if (!["create", "join", "list"].includes(action)) {
    return Response.json({ error: "Invalid action" }, { status: 400 });
  }

  if (action === "create") {
    // Admin creates a live test
    const { title, start_time, end_time, test_series_id, price, isPaid } = data;

    if (!title || !start_time || !end_time) {
      return Response.json({ error: "Required fields missing" }, { status: 400 });
    }

    const { error } = await supabase.from("live_tests").insert([{
      title,
      start_time,
      end_time,
      test_series_id,
      price,
      is_paid: isPaid,
    }]);

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true });
  }

  if (action === "join") {
    // User joins a live test
    const { user_id, live_test_id } = data;

    const { data: existing } = await supabase
      .from("live_test_participants")
      .select("*")
      .eq("user_id", user_id)
      .eq("live_test_id", live_test_id)
      .single();

    if (existing) {
      return Response.json({ message: "Already joined" }, { status: 200 });
    }

    const { error } = await supabase.from("live_test_participants").insert([{
      user_id,
      live_test_id,
    }]);

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true, message: "Joined successfully" });
  }

  if (action === "list") {
    // List all upcoming live tests
    const { data: tests, error } = await supabase
      .from("live_tests")
      .select("*")
      .gt("end_time", new Date().toISOString())
      .order("start_time", { ascending: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true, tests });
  }
}
