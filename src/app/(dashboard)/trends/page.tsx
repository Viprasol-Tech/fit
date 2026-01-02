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
  TrendingUp,
  Search,
  Twitter,
  Music2,
  MessageCircle,
  Youtube,
  Instagram,
  Sparkles,
  RefreshCw,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { TREND_SOURCES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock trending data
const mockTrends = [
  {
    id: 1,
    topic: "Protein Coffee",
    source: "tiktok",
    velocity: "+340%",
    volume: 1250000,
    isFitnessRelated: true,
    relevanceScore: 95,
  },
  {
    id: 2,
    topic: "Walking Pad Desk",
    source: "google",
    velocity: "+280%",
    volume: 890000,
    isFitnessRelated: true,
    relevanceScore: 88,
  },
  {
    id: 3,
    topic: "Cortisol Face",
    source: "tiktok",
    velocity: "+250%",
    volume: 2100000,
    isFitnessRelated: true,
    relevanceScore: 75,
  },
  {
    id: 4,
    topic: "Gut Health Fitness",
    source: "reddit",
    velocity: "+190%",
    volume: 450000,
    isFitnessRelated: true,
    relevanceScore: 92,
  },
  {
    id: 5,
    topic: "Zone 2 Training",
    source: "youtube",
    velocity: "+150%",
    volume: 780000,
    isFitnessRelated: true,
    relevanceScore: 98,
  },
  {
    id: 6,
    topic: "Creatine for Women",
    source: "instagram",
    velocity: "+120%",
    volume: 560000,
    isFitnessRelated: true,
    relevanceScore: 90,
  },
];

const evergreenTopics = [
  "Weight loss tips",
  "Home workouts",
  "Meal prep",
  "Beginner gym",
  "Protein intake",
  "Morning routine",
];

const predictedTrends = [
  { topic: "New Year fitness", reason: "Seasonal" },
  { topic: "Dry January + fitness", reason: "Seasonal" },
  { topic: "Winter bulk season", reason: "Seasonal" },
];

const SOURCE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  google: Search,
  twitter: Twitter,
  tiktok: Music2,
  reddit: MessageCircle,
  youtube: Youtube,
  instagram: Instagram,
};

export default function TrendsPage() {
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTrends =
    selectedSource === "all"
      ? mockTrends
      : mockTrends.filter((t) => t.source === selectedSource);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <>
      <Header
        title="Trend Radar"
        description="Real-time trending topics in health & fitness"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Clock className="w-4 h-4" />
            Last updated: 2 minutes ago
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Source Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSource === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSource("all")}
          >
            All Sources
          </Button>
          {TREND_SOURCES.map((source) => {
            const Icon = SOURCE_ICONS[source.id] || Search;
            return (
              <Button
                key={source.id}
                variant={selectedSource === source.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSource(source.id)}
              >
                <Icon className="w-4 h-4" />
                {source.name}
              </Button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trending Topics */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  <CardTitle>Rising Fast</CardTitle>
                </div>
                <CardDescription>
                  Topics gaining momentum right now
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredTrends.map((trend, index) => {
                    const Icon = SOURCE_ICONS[trend.source] || Search;
                    return (
                      <div
                        key={trend.id}
                        className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <span className="text-2xl font-bold text-zinc-300 w-8">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{trend.topic}</h3>
                            <Badge variant="success" className="text-xs">
                              {trend.velocity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-zinc-500">
                            <span className="flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              {TREND_SOURCES.find((s) => s.id === trend.source)?.name}
                            </span>
                            <span>
                              {(trend.volume / 1000000).toFixed(1)}M mentions
                            </span>
                            <span>Relevance: {trend.relevanceScore}%</span>
                          </div>
                        </div>
                        <Link href={`/studio?topic=${encodeURIComponent(trend.topic)}`}>
                          <Button variant="outline" size="sm">
                            <Sparkles className="w-4 h-4" />
                            Create Content
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Evergreen Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Evergreen Topics</CardTitle>
                <CardDescription>Always performing well</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {evergreenTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Predicted Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Predicted Trends</CardTitle>
                <CardDescription>Coming in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predictedTrends.map((trend) => (
                    <div
                      key={trend.topic}
                      className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{trend.topic}</p>
                        <p className="text-xs text-zinc-500">{trend.reason}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
