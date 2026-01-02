"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Film,
  Images,
  MessageSquare,
  Music2,
  Youtube,
  PlayCircle,
  FileText,
  Mail,
  Copy,
  Save,
  Calendar,
  RefreshCw,
  Check,
  Smartphone,
} from "lucide-react";
import { CONTENT_TYPES, CONTENT_TONES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ContentType, ContentTone, ReelBody, CarouselBody } from "@/types";

const CONTENT_TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  reel: Film,
  carousel: Images,
  thread: MessageSquare,
  tiktok: Music2,
  youtube_short: Youtube,
  youtube_long: PlayCircle,
  blog: FileText,
  newsletter: Mail,
};

export default function StudioPage() {
  const [selectedType, setSelectedType] = useState<ContentType>("reel");
  const [selectedTone, setSelectedTone] = useState<ContentTone>("motivational");
  const [topic, setTopic] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<ReelBody | CarouselBody | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock generated content based on type
    if (selectedType === "reel") {
      setGeneratedContent({
        hook: `POV: You just discovered ${topic}`,
        script: `Okay but why didn't anyone tell me about this sooner? ${topic} is literally changing my life. Here's exactly what I do...\n\nFirst, you want to make sure you're doing it right. Most people mess this up.\n\nSecond, consistency is key. Do this every single day.\n\nThird, track your progress. What gets measured gets managed.\n\nTrust me, you'll thank me later. Save this for when you need it!`,
        cta: "Follow for more fitness tips! Link in bio for my full guide.",
        hashtags: ["#fitness", "#gym", "#workout", "#fitnesstips", "#health"],
        suggestedAudio: "Trending sound: 'Oh no, oh no, oh no no no'",
        visualNotes: "Film in good lighting, use dynamic angles, show the process",
      } as ReelBody);
    } else if (selectedType === "carousel") {
      setGeneratedContent({
        slides: [
          { slideNumber: 1, headline: `${topic.toUpperCase()}`, text: "Everything you need to know (save this!)" },
          { slideNumber: 2, headline: "Why It Matters", text: "Most people don't realize how important this is for their fitness journey..." },
          { slideNumber: 3, headline: "Step 1", text: "Start with the basics. Here's exactly what to do..." },
          { slideNumber: 4, headline: "Step 2", text: "Now that you've mastered the basics, let's level up..." },
          { slideNumber: 5, headline: "Step 3", text: "The secret sauce that separates beginners from pros..." },
          { slideNumber: 6, headline: "Common Mistakes", text: "Avoid these at all costs! I learned this the hard way..." },
          { slideNumber: 7, headline: "Pro Tips", text: "Here's what the experts do differently..." },
          { slideNumber: 8, headline: "Quick Recap", text: "1. Do X\n2. Avoid Y\n3. Be consistent" },
          { slideNumber: 9, headline: "Results You Can Expect", text: "Within 30 days, you'll notice..." },
          { slideNumber: 10, headline: "Save This!", text: "Follow @yourhandle for more\n\nTag someone who needs this!" },
        ],
        caption: `${topic} explained in 10 slides! Save this for later 📚\n\nDrop a 💪 if you found this helpful!`,
        hashtags: ["#fitness", "#fitnesstips", "#workout", "#health", "#gym"],
      } as CarouselBody);
    }

    setIsGenerating(false);
  };

  const handleCopy = async () => {
    if (!generatedContent) return;

    let textToCopy = "";
    if (selectedType === "reel") {
      const content = generatedContent as ReelBody;
      textToCopy = `HOOK: ${content.hook}\n\nSCRIPT:\n${content.script}\n\nCTA: ${content.cta}\n\nHASHTAGS: ${content.hashtags.join(" ")}`;
    } else if (selectedType === "carousel") {
      const content = generatedContent as CarouselBody;
      textToCopy = content.slides
        .map((s) => `SLIDE ${s.slideNumber}: ${s.headline}\n${s.text}`)
        .join("\n\n");
      textToCopy += `\n\nCAPTION: ${content.caption}\n\nHASHTAGS: ${content.hashtags.join(" ")}`;
    }

    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedTypeConfig = CONTENT_TYPES.find((t) => t.id === selectedType);

  return (
    <>
      <Header
        title="AI Content Studio"
        description="Generate engaging content for any platform with AI"
      />

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Content Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content Type</CardTitle>
                <CardDescription>
                  Choose the format for your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {CONTENT_TYPES.map((type) => {
                    const Icon = CONTENT_TYPE_ICONS[type.id] || FileText;
                    const isSelected = selectedType === type.id;

                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                          isSelected
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5",
                            isSelected ? "text-violet-500" : "text-zinc-500"
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-medium text-center",
                            isSelected ? "text-violet-700 dark:text-violet-300" : ""
                          )}
                        >
                          {type.name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selectedTypeConfig && (
                  <p className="mt-3 text-sm text-zinc-500">
                    {selectedTypeConfig.description}
                    {selectedTypeConfig.estimatedDuration && (
                      <span className="ml-2 text-violet-500">
                        ({selectedTypeConfig.estimatedDuration})
                      </span>
                    )}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tone Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content Tone</CardTitle>
                <CardDescription>Set the vibe for your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {CONTENT_TONES.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-full border transition-all",
                        selectedTone === tone.id
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                      )}
                    >
                      <span>{tone.emoji}</span>
                      <span className="text-sm font-medium">{tone.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topic Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Topic</CardTitle>
                <CardDescription>
                  What do you want to create content about?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="e.g., Protein Coffee, Morning Workout Routine, Meal Prep Tips..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="text-lg"
                />
                <Textarea
                  placeholder="Additional context or specific points to include (optional)"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={3}
                />
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                  isLoading={isGenerating}
                >
                  {isGenerating ? (
                    "Generating..."
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="min-h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Preview</CardTitle>
                    <CardDescription>
                      {generatedContent
                        ? "Your generated content"
                        : "Content will appear here"}
                    </CardDescription>
                  </div>
                  {generatedContent && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                      >
                        <RefreshCw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
                        Regenerate
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!generatedContent ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-zinc-400">
                    <Smartphone className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-center">
                      Enter a topic and click Generate
                      <br />
                      to create your content
                    </p>
                  </div>
                ) : selectedType === "reel" ? (
                  <ReelPreview content={generatedContent as ReelBody} />
                ) : selectedType === "carousel" ? (
                  <CarouselPreview content={generatedContent as CarouselBody} />
                ) : null}
              </CardContent>

              {generatedContent && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied!" : "Copy All"}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Save className="w-4 h-4" />
                      Save Draft
                    </Button>
                    <Button variant="default" className="flex-1">
                      <Calendar className="w-4 h-4" />
                      Schedule
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function ReelPreview({ content }: { content: ReelBody }) {
  return (
    <div className="space-y-4">
      {/* Phone mockup */}
      <div className="mx-auto w-64 bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl">
        <div className="bg-black rounded-[2rem] p-4 aspect-[9/16] flex flex-col">
          <div className="flex-1 flex flex-col justify-center text-white">
            <p className="text-xs text-zinc-400 mb-2">HOOK (0-3 sec):</p>
            <p className="text-sm font-medium mb-4">"{content.hook}"</p>

            <div className="text-xs text-zinc-400 mb-1">SCRIPT:</div>
            <p className="text-xs leading-relaxed line-clamp-6">
              {content.script}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-zinc-800">
            <p className="text-xs text-pink-400">{content.cta}</p>
          </div>
        </div>
      </div>

      {/* Details below phone */}
      <div className="space-y-3 pt-4">
        <div>
          <p className="text-xs font-medium text-zinc-500 mb-1">
            SUGGESTED AUDIO
          </p>
          <p className="text-sm">{content.suggestedAudio}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-zinc-500 mb-1">HASHTAGS</p>
          <div className="flex flex-wrap gap-1">
            {content.hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {content.visualNotes && (
          <div>
            <p className="text-xs font-medium text-zinc-500 mb-1">
              VISUAL NOTES
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {content.visualNotes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CarouselPreview({ content }: { content: CarouselBody }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="space-y-4">
      {/* Slide preview */}
      <Tabs
        value={currentSlide.toString()}
        onValueChange={(v) => setCurrentSlide(parseInt(v))}
      >
        <div className="mx-auto w-64 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 aspect-square flex flex-col items-center justify-center p-6 text-center">
          <p className="text-lg font-bold mb-2">
            {content.slides[currentSlide].headline}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {content.slides[currentSlide].text}
          </p>
        </div>

        <TabsList className="w-full mt-4 flex-wrap h-auto gap-1 bg-transparent">
          {content.slides.map((_, i) => (
            <TabsTrigger
              key={i}
              value={i.toString()}
              className="w-8 h-8 p-0 data-[state=active]:bg-violet-500 data-[state=active]:text-white"
            >
              {i + 1}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Caption & Hashtags */}
      <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div>
          <p className="text-xs font-medium text-zinc-500 mb-1">CAPTION</p>
          <p className="text-sm">{content.caption}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-zinc-500 mb-1">HASHTAGS</p>
          <div className="flex flex-wrap gap-1">
            {content.hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
