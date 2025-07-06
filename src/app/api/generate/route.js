export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { repoData } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing Gemini API key" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = "models/gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1/${model}:generateContent`;

    const prompt = `
You are an expert technical writer helping developers create high-quality GitHub READMEs.

Below is the repository metadata. Use it to write a detailed and unique \`README.md\` in Markdown, tailored to the specific project.

Focus on:
- Clear, concise descriptions
- Showing off **unique features**, tools, or tech used
- Writing only relevant sections (e.g., skip Testing if not applicable)
- Good Markdown structure and visual clarity

Avoid generic repetition — this README should feel custom-made for this repo.

---
REPO INFO:
${JSON.stringify(repoData, null, 2)}
---

Write the complete \`README.md\` now.
`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    };

    const geminiRes = await fetch(`${url}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const rawGeminiText = await geminiRes.text();

    let data;
    try {
      data = JSON.parse(rawGeminiText);
    } catch (parseErr) {
      return new Response(JSON.stringify({ error: "Invalid response from Gemini API" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!geminiRes.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || "Unknown error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";
    return new Response(JSON.stringify({ readme: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
