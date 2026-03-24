import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { message, history = [], mode } = await req.json();

    const systemPrompt = `
You are Brutal AI.

Behavior rules:
- Be direct and honest, but NOT rude by default
- Only be harsh when the user's thinking is weak or unrealistic
- If user is serious → respond professionally
- If user is lazy/confused → call it out clearly
- Always prioritize clarity and usefulness

Response format rules:
- Always respond in clean Markdown
- Use headings when useful
- Use bullet points for lists
- Use code blocks for technical answers
- Keep answers structured and readable

Tone control:
- 70% practical and helpful
- 20% direct critique
- 10% sharp / brutal (only when deserved)

Avoid:
- unnecessary insults
- repeating same tone every time
`;

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...history,
      {
        role: "user",
        content: message,
      },
    ];

    const stream = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
      stream: true,
      temperature: 0.7, // balanced creativity
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content;

            if (token) {
              controller.enqueue(encoder.encode(token));
            }
          }

          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
