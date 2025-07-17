import { supabase } from "@/utils/supabaseClient";

export async function POST(request) {
  try {
    const { questions } = await request.json();

    if (!questions || !Array.isArray(questions)) {
      return new Response("Invalid questions data", { status: 400 });
    }

    const { error } = await supabase.from("questions").insert(
      questions.map((q) => ({
        question_text: q.question || "",
        option_a: q.optionA || null,
        option_b: q.optionB || null,
        option_c: q.optionC || null,
        option_d: q.optionD || null,
        correct_answer: q.correctAnswer || "",
        category_id: q.categoryId || null,
        subject_id: q.subjectId || null,
        topic_id: q.topicId || null,
      }))
    );

    if (error) {
      console.error("Insert error:", error);
      return new Response("DB insert error", { status: 500 });
    }

    return new Response("Questions uploaded successfully", { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return new Response("Server error", { status: 500 });
  }
}
