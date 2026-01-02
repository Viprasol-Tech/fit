import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/ai/claude";
import { createClient } from "@/lib/supabase/server";
import type { ContentType, ContentTone } from "@/types";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { contentType, tone, topic, pillar, additionalContext } = body as {
      contentType: ContentType;
      tone: ContentTone;
      topic: string;
      pillar?: string;
      additionalContext?: string;
    };

    // Validate required fields
    if (!contentType || !tone || !topic) {
      return NextResponse.json(
        { error: "Missing required fields: contentType, tone, topic" },
        { status: 400 }
      );
    }

    // Generate content
    const result = await generateContent({
      contentType,
      tone,
      topic,
      pillar,
      additionalContext,
    });

    return NextResponse.json({
      content: result.content,
      tokensUsed: result.tokensUsed,
      model: result.model,
    });
  } catch (error) {
    console.error("Content generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
