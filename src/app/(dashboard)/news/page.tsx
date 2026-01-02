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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Newspaper,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Sparkles,
  Clock,
  ChevronRight,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import { NEWS_SOURCES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Mock news data
const mockNews = [
  {
    id: "1",
    title: "New Study: Cold Exposure Boosts Metabolism by 15%",
    description:
      "Research from Stanford University shows that regular cold exposure can significantly increase metabolic rate and brown fat activation.",
    source: "Men's Health",
    publishedAt: "3 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300",
    category: "research",
    saved: false,
    aiSummary:
      "15-minute cold exposure sessions can boost metabolism by 15%. Best done post-workout for maximum benefit. Study suggests 3-4 sessions per week.",
    contentIdeas: [
      "My cold exposure routine for fat loss",
      "Cold shower challenge results",
      "Science behind cold therapy",
    ],
  },
  {
    id: "2",
    title: "Nike Launches AI-Powered Fitness App with Personalized Coaching",
    description:
      "The sportswear giant introduces a revolutionary app that uses AI to create customized workout plans based on user goals and biometrics.",
    source: "TechCrunch",
    publishedAt: "5 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1461896836934- voices?w=300",
    category: "industry",
    saved: false,
  },
  {
    id: "3",
    title: "Protein Timing Myth Debunked: Study Shows Total Intake Matters More",
    description:
      "New research challenges the anabolic window theory, suggesting that daily protein intake is more important than timing around workouts.",
    source: "Healthline",
    publishedAt: "1 day ago",
    imageUrl: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=300",
    category: "research",
    saved: true,
    aiSummary:
      "The 30-minute anabolic window is largely a myth. Focus on hitting daily protein targets (1.6-2.2g/kg) rather than precise timing.",
    contentIdeas: [
      "Protein timing myths busted",
      "When to actually eat protein",
      "My protein intake strategy",
    ],
  },
  {
    id: "4",
    title: "Rise of Walking Pads: How Remote Workers Are Fighting Sedentary Lifestyle",
    description:
      "Under-desk treadmills have seen a 300% increase in sales as remote workers seek ways to stay active during work hours.",
    source: "Forbes",
    publishedAt: "2 days ago",
    imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=300",
    category: "trends",
    saved: false,
  },
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [savedArticles, setSavedArticles] = useState<string[]>(["3"]);
  const [expandedSummary, setExpandedSummary] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSave = (id: string) => {
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const filteredNews =
    activeTab === "saved"
      ? mockNews.filter((n) => savedArticles.includes(n.id))
      : mockNews;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <>
      <Header
        title="News & Research Hub"
        description="Stay informed with the latest fitness news"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Tabs & Actions */}
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="industry">Industry</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="saved">
                Saved ({savedArticles.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={cn("w-4 h-4", isRefreshing && "animate-spin")}
            />
            Refresh
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                  <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-zinc-400" />
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="secondary" className="text-xs mb-2">
                        {article.category}
                      </Badge>
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSave(article.id)}
                    >
                      {savedArticles.includes(article.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-violet-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
                    <span>{article.source}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{article.publishedAt}</span>
                  </div>
                </div>
              </div>

              {/* AI Summary Section */}
              {article.aiSummary && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                  <button
                    onClick={() =>
                      setExpandedSummary(
                        expandedSummary === article.id ? null : article.id
                      )
                    }
                    className="flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Summary
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedSummary === article.id && "rotate-90"
                      )}
                    />
                  </button>

                  {expandedSummary === article.id && (
                    <div className="mt-3 space-y-3 animate-fade-in">
                      <p className="text-sm">{article.aiSummary}</p>

                      {article.contentIdeas && (
                        <div>
                          <p className="text-xs font-medium text-zinc-500 mb-2 flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" />
                            Content Ideas
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {article.contentIdeas.map((idea) => (
                              <Badge
                                key={idea}
                                variant="outline"
                                className="cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900/30"
                              >
                                {idea}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button variant="outline" size="sm" className="w-full">
                        <Sparkles className="w-4 h-4" />
                        Create Content from This
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No articles found</p>
          </div>
        )}
      </div>
    </>
  );
}
