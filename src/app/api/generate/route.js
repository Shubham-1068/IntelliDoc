export const runtime = "nodejs";

export async function POST(req) {
  const { repoData } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing Gemini API key" }), { status: 500 });
  }

  const model = "models/gemini-1.5-flash"; // ✅ Use one that your key has access to
  const url = `https://generativelanguage.googleapis.com/v1/${model}:generateContent`;

const prompt = `Generate a detailed, professional, and visually appealing GitHub README.md for this repository:\n${JSON.stringify(repoData, null, 2)}\n\nFollow these guidelines to create a comprehensive and engaging README while maintaining a professional tone:\n1. **Structure and Formatting**: Use clear Markdown formatting with appropriate headers (#, ##, ###), bullet points, and code blocks. Ensure the README is well-organized and easy to navigate.\n2. **Sections to Include**:\n   - **Project Title and Description**: Include the repository name as the main header, followed by a concise yet informative project description (3-5 sentences) highlighting the purpose, key features, and target audience.\n   - **Badges**: Add relevant badges (e.g., build status, license, version, or language) at the top for quick insights into the project’s status and technologies.\n   - **Table of Contents**: Provide a clickable table of contents for easy navigation to all major sections.\n   - **Installation Instructions**: Include detailed, step-by-step instructions for setting up the project locally, including prerequisites, dependencies, and platform-specific notes if applicable.\n   - **Usage**: Provide clear examples of how to use the project, including code snippets, command-line examples, or screenshots (if applicable). Explain common use cases.\n   - **Features**: List key features in bullet points, with brief descriptions of each to showcase the project’s capabilities.\n   - **Configuration**: If applicable, explain how to configure the project, including environment variables, settings files, or customization options.\n   - **Contributing**: Provide detailed contribution guidelines, including how to report issues, submit pull requests, and adhere to coding standards. Include a code of conduct reference if applicable.\n   - **Testing**: Describe how to run tests, including any test frameworks used and example commands.\n   - **License**: Clearly state the project’s license with a brief explanation and a link to the full license file.\n   - **Contact Information**: Include maintainer contact details (e.g., email, GitHub profile) and links to community resources (e.g., Discord, mailing list) if available.\n   - **Acknowledgments**: Add a section to credit contributors, libraries, or inspirations that helped shape the project.\n3. **Tone and Style**: Use a professional yet approachable tone. Avoid overly technical jargon unless necessary, and ensure explanations are clear for both beginners and advanced users.\n4. **Visual Appeal**: Incorporate Markdown elements like tables, horizontal rules, or collapsible sections to enhance readability. Suggest placeholders for images or diagrams (e.g., architecture diagrams or screenshots) where relevant, without including actual image files.\n5. **Completeness**: Ensure the README is comprehensive, addressing all aspects of the project from setup to contribution, while remaining concise and avoiding unnecessary repetition.\n6. **Customization**: Tailor the content to reflect the repository’s specific details (e.g., programming language, frameworks, or tools) as provided in the repoData.\n\nGenerate the README in valid Markdown format, ensuring it is polished, professional, and engaging for GitHub users.`;


  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const geminiRes = await fetch(`${url}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error("Gemini API error:", data);
      return new Response(JSON.stringify({ error: data.error?.message || "Unknown error" }), {
        status: 500
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    return new Response(JSON.stringify({ readme: text }), { status: 200 });
  } catch (err) {
    console.error("Gemini fetch error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
