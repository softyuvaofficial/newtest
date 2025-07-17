import { supabaseServer } from '@/utils/supabaseServer'


export async function POST(req) {
  const supabase = createClient();
  const body = await req.json();

  const { order_id, user_email, amount, status, payment_gateway, transaction_id } = body;

  const { error } = await supabase.from("transactions").insert([{
    order_id,
    user_email,
    amount,
    status,
    payment_gateway,
    transaction_id,
  }]);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
