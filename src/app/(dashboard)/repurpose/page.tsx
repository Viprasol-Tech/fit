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
import { Badge } from "@/components/ui/badge";
import {
  Repeat2,
  Sparkles,
  Film,
  Images,
  MessageSquare,
  Music2,
  Youtube,
  FileText,
  Mail,
  Check,
  Copy,
  ChevronRight,
  Eye,
  Heart,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTENT_TYPES } from "@/lib/constants";
import type { ContentType } from "@/types";

// Mock source content
const mockSourceContent = [
  {
    id: "1",
    title: "5 Gym Mistakes Beginners Make",
    platform: "instagram",
    type: "reel",
    views: 45000,
    likes: 3200,
    saves: 1450,
    postedAt: "2024-01-02",
  },
  {
    id: "2",
    title: "What I Eat in a Day for Gains",
    platform: "instagram",
    type: "reel",
    views: 32000,
    likes: 2800,
    saves: 980,
    postedAt: "2024-01-01",
  },
  {
    id: "3",
    title: "Morning Routine for Maximum Productivity",
    platform: "instagram",
    type: "carousel",
    views: 28000,
    likes: 2100,
    saves: 2340,
    postedAt: "2023-12-30",
  },
];

const REPURPOSE_OPTIONS: {
  id: ContentType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  {
    id: "carousel",
    name: "Instagram Carousel",
    icon: Images,
    description: "Deep dive each point",
  },
  {
    id: "thread",
    name: "Twitter Thread",
    icon: MessageSquare,
    description: "Text version for X",
  },
  {
    id: "tiktok",
    name: "TikTok Script",
    icon: Music2,
    description: "Different angle/hook",
  },
  {
    id: "youtube_short",
    name: "YouTube Short",
    icon: Youtube,
    description: "Expanded 60s version",
  },
  {
    id: "blog",
    name: "Blog Article",
    icon: FileText,
    description: "SEO-optimized article",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    icon: Mail,
    description: "Email segment",
  },
];

export default function RepurposePage() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<ContentType[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<
    { format: ContentType; preview: string }[]
  >([]);

  const toggleFormat = (format: ContentType) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  const handleGenerate = async () => {
    if (!selectedSource || selectedFormats.length === 0) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock generated content
    setGeneratedContent(
      selectedFormats.map((format) => ({
        format,
        preview: `Repurposed content for ${format} based on "${mockSourceContent.find((c) => c.id === selectedSource)?.title}"...`,
      }))
    );
    setIsGenerating(false);
  };

  const selectedContent = mockSourceContent.find((c) => c.id === selectedSource);

  return (
    <>
      <Header
        title="Repurpose Engine"
        description="Turn one piece of content into many formats"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Source Selection */}
          <div className="space-y-6">
            {/* Source Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  1. Select Source Content
                </CardTitle>
                <CardDescription>
                  Choose your best-performing content to repurpose
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSourceContent.map((content) => (
                    <div
                      key={content.id}
                      onClick={() => setSelectedSource(content.id)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                        selectedSource === content.id
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          selectedSource === content.id
                            ? "border-violet-500 bg-violet-500"
                            : "border-zinc-300"
                        )}
                      >
                        {selectedSource === content.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{content.title}</p>
                        <div className="flex items-center gap-3 text-sm text-zinc-500 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {content.type}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {(content.views / 1000).toFixed(0)}K
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {(content.likes / 1000).toFixed(1)}K
                          </span>
                          <span className="flex items-center gap-1">
                            <Bookmark className="w-3 h-3" />
                            {content.saves}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Format Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  2. Choose Target Formats
                </CardTitle>
                <CardDescription>
                  Select one or more formats to repurpose into
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {REPURPOSE_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedFormats.includes(option.id);

                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleFormat(option.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all",
                          isSelected
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-950/30"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                            isSelected
                              ? "border-violet-500 bg-violet-500"
                              : "border-zinc-300"
                          )}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <Icon
                          className={cn(
                            "w-5 h-5",
                            isSelected ? "text-violet-500" : "text-zinc-500"
                          )}
                        />
                        <div>
                          <p className="text-sm font-medium">{option.name}</p>
                          <p className="text-xs text-zinc-500">
                            {option.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={!selectedSource || selectedFormats.length === 0 || isGenerating}
              onClick={handleGenerate}
              isLoading={isGenerating}
            >
              {isGenerating ? (
                "Generating..."
              ) : (
                <>
                  <Repeat2 className="w-5 h-5" />
                  Repurpose to {selectedFormats.length} Format
                  {selectedFormats.length !== 1 ? "s" : ""}
                </>
              )}
            </Button>
          </div>

          {/* Right Panel - Output Preview */}
          <Card className="min-h-[600px]">
            <CardHeader>
              <CardTitle className="text-base">3. Preview & Export</CardTitle>
              <CardDescription>
                {generatedContent.length > 0
                  ? `${generatedContent.length} formats generated`
                  : "Generated content will appear here"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-zinc-400">
                  <Repeat2 className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-center">
                    Select source content and formats
                    <br />
                    then click Repurpose
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedContent.map((item) => {
                    const format = REPURPOSE_OPTIONS.find(
                      (o) => o.id === item.format
                    );
                    const Icon = format?.icon || FileText;

                    return (
                      <div
                        key={item.format}
                        className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Icon className="w-5 h-5 text-violet-500" />
                            <span className="font-medium">{format?.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Copy className="w-4 h-4" />
                              Copy
                            </Button>
                            <Button variant="outline" size="sm">
                              View
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                          {item.preview}
                        </p>
                      </div>
                    );
                  })}

                  <div className="flex gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Button variant="outline" className="flex-1">
                      Save All as Drafts
                    </Button>
                    <Button variant="default" className="flex-1">
                      Schedule All
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
