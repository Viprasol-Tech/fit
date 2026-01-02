import Anthropic from "@anthropic-ai/sdk";
import type { ContentType, ContentTone, ReelBody, CarouselBody, ThreadBody, TikTokBody } from "@/types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerationOptions {
  contentType: ContentType;
  tone: ContentTone;
  topic: string;
  pillar?: string;
  additionalContext?: string;
}

const TONE_DESCRIPTIONS: Record<ContentTone, string> = {
  energetic: "high energy, exciting, pump-up vibes with enthusiastic language",
  motivational: "inspiring, encouraging, uplifting with actionable advice",
  educational: "informative, teaching, fact-based with clear explanations",
  entertainment: "fun, humorous, engaging with relatable content",
  professional: "authoritative, expert, credible with cited research when relevant",
  casual: "relaxed, conversational, friendly like talking to a friend",
};

function getSystemPrompt(contentType: ContentType): string {
  const basePrompt = `You are an expert fitness content creator with millions of followers. You create viral, engaging content that resonates with fitness enthusiasts. Your content is authentic, actionable, and optimized for each platform's algorithm.

Always respond with valid JSON only, no additional text or markdown.`;

  const typePrompts: Record<ContentType, string> = {
    reel: `${basePrompt}

You specialize in creating Instagram Reels that hook viewers in the first 3 seconds and deliver value quickly.

Response format:
{
  "hook": "Attention-grabbing opening line (must stop the scroll)",
  "script": "Full script for 30-60 second video, written conversationally",
  "cta": "Call to action encouraging engagement",
  "hashtags": ["array", "of", "relevant", "hashtags"],
  "suggestedAudio": "Trending audio suggestion if applicable",
  "visualNotes": "Brief notes on filming style/angles"
}`,
    carousel: `${basePrompt}

You specialize in creating Instagram Carousel posts that educate and get saved. Each slide should be self-contained but build on the previous.

Response format:
{
  "slides": [
    {"slideNumber": 1, "headline": "Title slide hook", "text": "Supporting text"},
    {"slideNumber": 2, "headline": "Point heading", "text": "Explanation"},
    ... (8-10 slides total)
  ],
  "caption": "Engaging caption with call to action",
  "hashtags": ["array", "of", "relevant", "hashtags"]
}`,
    thread: `${basePrompt}

You specialize in creating Twitter/X threads that go viral. Each tweet should be valuable standalone but create a compelling narrative together.

Response format:
{
  "tweets": [
    {"tweetNumber": 1, "text": "Hook tweet (under 280 chars)"},
    {"tweetNumber": 2, "text": "Follow-up tweet"},
    ... (7-10 tweets total)
  ],
  "hashtags": ["array", "of", "relevant", "hashtags"]
}`,
    tiktok: `${basePrompt}

You specialize in creating TikTok scripts that leverage trends and capture Gen Z attention.

Response format:
{
  "hook": "First 1-2 seconds hook (critical for retention)",
  "script": "Full script for 30-60 second video",
  "cta": "Call to action",
  "trendingSound": "Suggested trending sound if applicable",
  "hashtags": ["array", "of", "relevant", "hashtags"]
}`,
    youtube_short: `${basePrompt}

You specialize in creating YouTube Shorts that are punchy and shareable.

Response format:
{
  "hook": "Opening hook (first 3 seconds)",
  "script": "Full 60-second script",
  "cta": "Subscribe/like CTA",
  "thumbnailIdea": "Thumbnail concept"
}`,
    youtube_long: `${basePrompt}

You specialize in creating YouTube video outlines that rank in search and maintain watch time.

Response format:
{
  "title": "SEO-optimized title",
  "intro": "Hook and intro script (30-60 seconds)",
  "sections": [
    {"title": "Section heading", "content": "Key talking points", "duration": "estimated time"}
  ],
  "conclusion": "Wrap-up script",
  "cta": "Subscribe and engagement CTA",
  "thumbnailIdea": "Thumbnail concept",
  "tags": ["array", "of", "SEO", "tags"]
}`,
    blog: `${basePrompt}

You specialize in creating SEO-optimized blog articles that rank and convert.

Response format:
{
  "headline": "SEO-optimized H1 title",
  "metaDescription": "Meta description under 160 characters",
  "intro": "Engaging introduction paragraph",
  "sections": [
    {"heading": "H2 heading", "content": "Full section content"}
  ],
  "conclusion": "Wrap-up with CTA",
  "cta": "Clear call to action",
  "tags": ["array", "of", "SEO", "keywords"]
}`,
    newsletter: `${basePrompt}

You specialize in creating email newsletters that get opened and clicked.

Response format:
{
  "subject": "Compelling subject line (under 50 chars)",
  "preheader": "Preview text",
  "greeting": "Personal greeting",
  "sections": [
    {"heading": "Section heading (optional)", "content": "Section content"}
  ],
  "cta": {"text": "Button text", "url": "placeholder URL"},
  "signoff": "Sign-off message"
}`,
  };

  return typePrompts[contentType] || basePrompt;
}

export async function generateContent(options: GenerationOptions) {
  const { contentType, tone, topic, pillar, additionalContext } = options;

  const userPrompt = `Create ${contentType} content about: "${topic}"

Tone: ${TONE_DESCRIPTIONS[tone]}
${pillar ? `Content pillar: ${pillar}` : ""}
${additionalContext ? `Additional context: ${additionalContext}` : ""}

Remember to:
- Hook the audience immediately
- Provide actionable value
- Include relevant hashtags for discoverability
- Make it shareable and saveable
- Optimize for the platform's algorithm`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: getSystemPrompt(contentType),
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    // Extract text content
    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    // Parse JSON response
    const content = JSON.parse(textContent.text);

    return {
      content,
      tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
      model: message.model,
    };
  } catch (error) {
    console.error("Claude API error:", error);
    throw error;
  }
}

export async function summarizeArticle(articleContent: string, extractIdeas: boolean = true) {
  const prompt = `Summarize this fitness/health article and extract key points:

${articleContent}

${extractIdeas ? "Also suggest 3 content ideas inspired by this article." : ""}

Response format:
{
  "summary": "2-3 sentence summary",
  "keyPoints": ["point 1", "point 2", "point 3"],
  ${extractIdeas ? '"contentIdeas": [{"title": "idea title", "angle": "unique angle", "platform": "best platform"}]' : ""}
}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return JSON.parse(textContent.text);
  } catch (error) {
    console.error("Claude API error:", error);
    throw error;
  }
}

export async function generateIdeas(category: string, count: number = 10) {
  const prompt = `Generate ${count} viral content ideas for a fitness creator in the "${category}" category.

Each idea should be:
- Specific and actionable
- Have viral potential
- Be relevant to current fitness trends

Response format:
{
  "ideas": [
    {
      "title": "Content idea title",
      "description": "Brief description",
      "suggestedPlatforms": ["instagram", "tiktok"],
      "suggestedFormat": "reel",
      "hooks": ["hook option 1", "hook option 2"]
    }
  ]
}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return JSON.parse(textContent.text);
  } catch (error) {
    console.error("Claude API error:", error);
    throw error;
  }
}
