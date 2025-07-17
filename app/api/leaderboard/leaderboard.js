// app/api/leaderboard/route.js (or pages/api/leaderboard.js)
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for server
);

export async function POST(request) {
  try {
    const { user_id, score } = await request.json();

    // Fetch current score
    const { data: existing, error: fetchErr } = await supabase
      .from("leaderboard")
      .select("total_score")
      .eq("user_id", user_id)
      .single();

    if (fetchErr && fetchErr.code !== "PGRST116") throw fetchErr; // ignore not found

    const newScore = (existing?.total_score || 0) + score;

    // Upsert new score
    const { error: upsertErr } = await supabase
      .from("leaderboard")
      .upsert({ user_id, total_score: newScore, updated_at: new Date() });

    if (upsertErr) throw upsertErr;

    // Optional: recalc ranks for all users (simple example)
    const { data: allScores, error: allScoresErr } = await supabase
      .from("leaderboard")
      .select("user_id, total_score")
      .order("total_score", { ascending: false });

    if (allScoresErr) throw allScoresErr;

    for (let i = 0; i < allScores.length; i++) {
      const rank = i + 1;
      await supabase
        .from("leaderboard")
        .update({ rank })
        .eq("user_id", allScores[i].user_id);
    }

    return new Response(JSON.stringify({ message: "Leaderboard updated" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
