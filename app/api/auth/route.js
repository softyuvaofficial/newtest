import { supabaseServer } from '@/utils/supabaseServer'


export async function POST(req) {
  const supabase = createClient();
  const { action, email, password, name, isAdmin } = await req.json();

  if (!["login", "signup"].includes(action)) {
    return Response.json({ error: "Invalid action" }, { status: 400 });
  }

  if (!email || !password) {
    return Response.json({ error: "Email and password required" }, { status: 400 });
  }

  if (action === "signup") {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return Response.json({ error: signUpError.message }, { status: 400 });
    }

    // Add to 'users' table with role
    const { error: userError } = await supabase.from("users").insert([
      {
        id: signUpData.user.id,
        email,
        name: name || "",
        role: isAdmin ? "admin" : "user",
      },
    ]);

    if (userError) {
      return Response.json({ error: userError.message }, { status: 400 });
    }

    return Response.json({ success: true, user: signUpData.user });
  }

  if (action === "login") {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return Response.json({ error: signInError.message }, { status: 401 });
    }

    return Response.json({ success: true, user: signInData.user, session: signInData.session });
  }
}
