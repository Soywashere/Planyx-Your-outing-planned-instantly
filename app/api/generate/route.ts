import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: NextRequest) {
    const body = await req.json();
    const mood = body.mood;
    const budget = body.budget;
    const time = body.time;

    const prompt =
        "You are Planyx, an expert outing planner for Delhi NCR, India.\n" +
        "A user wants an outing with these preferences:\n" +
        "- Mood: " + mood + "\n" +
        "- Budget: " + budget + " per person\n" +
        "- Time of day: " + time + "\n\n" +
        "Generate exactly 3 outing plans. Each plan must be realistic for Delhi NCR.\n\n" +
        "Return ONLY a valid JSON array with no markdown and no explanation.\n" +
        "Use this exact format:\n" +
        "[\n" +
        "  {\n" +
        '    "id": 1,\n' +
        '    "badge": "Best Pick",\n' +
        '    "title": "Short catchy plan name",\n' +
        '    "reason": "One sentence explaining why this plan fits the mood and budget.",\n' +
        '    "costRange": "Rs.XXX-XXX per person",\n' +
        '    "timeline": [\n' +
        '      { "time": "6:00 PM", "place": "Place Name", "activity": "What to do", "rating": "4.2", "area": "Connaught Place" },\n' +
        '      { "time": "7:30 PM", "place": "Place Name", "activity": "What to do", "rating": "4.5", "area": "Khan Market" }\n' +
        "    ]\n" +
        "  }\n" +
        "]\n\n" +
        "Rules:\n" +
        "- Use real well-known places in Delhi NCR\n" +
        "- Each plan has 3 to 4 timeline stops\n" +
        "- Stops should be in nearby areas geographically\n" +
        "- Budget Under 500 means costRange Rs.200-450, Budget 500-1000 means Rs.500-900, Budget 1000-2000 means Rs.1000-1800, Budget Above 2000 means Rs.2000-3500\n" +
        "- Ratings must be between 3.8 and 4.8\n" +
        "- Plan 1 badge is Best Pick, Plan 2 badge is Chill Vibe, Plan 3 badge is Hidden Gem\n" +
        "- Make all 3 plans meaningfully different from each other\n" +
        "- Return pure JSON only, no markdown, no code blocks, no extra text";

    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8,
            max_tokens: 1500,
        });

        let raw = completion.choices[0].message.content || "[]";
        raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

        const plans = JSON.parse(raw);
        return NextResponse.json({ plans });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to generate plans" }, { status: 500 });
    }
}