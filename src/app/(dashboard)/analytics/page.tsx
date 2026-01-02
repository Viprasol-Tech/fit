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
import { Progress, CircularProgress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Target,
  Sparkles,
  Instagram,
  Twitter,
  Youtube,
  Music2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock analytics data
const platformStats = [
  {
    platform: "instagram",
    name: "Instagram",
    followers: 23456,
    gained: 1234,
    views: 125000,
    engagement: 4.2,
    trend: "up",
  },
  {
    platform: "tiktok",
    name: "TikTok",
    followers: 15678,
    gained: 2456,
    views: 890000,
    engagement: 8.5,
    trend: "up",
  },
  {
    platform: "twitter",
    name: "Twitter/X",
    followers: 5100,
    gained: 567,
    views: 45000,
    engagement: 2.1,
    trend: "up",
  },
  {
    platform: "youtube",
    name: "YouTube",
    followers: 3000,
    gained: 234,
    views: 28000,
    engagement: 6.3,
    trend: "down",
  },
];

const topContent = [
  {
    id: 1,
    title: "5 exercises you're doing wrong",
    platform: "instagram",
    type: "Reel",
    views: 45000,
    likes: 3200,
    saves: 1450,
  },
  {
    id: 2,
    title: "What I eat in a day",
    platform: "tiktok",
    type: "TikTok",
    views: 32000,
    likes: 4500,
    saves: 890,
  },
  {
    id: 3,
    title: "Gym mistakes beginners make",
    platform: "instagram",
    type: "Carousel",
    views: 28000,
    likes: 2100,
    saves: 2340,
  },
];

const aiInsights = [
  {
    insight: "Your 'mistake' content performs 3x better than average",
    action: "Create more myth-busting content",
  },
  {
    insight: "Best posting time: 9 AM and 6 PM",
    action: "Schedule content at peak hours",
  },
  {
    insight: "Carousel posts get 2x more saves",
    action: "Convert top reels to carousels",
  },
  {
    insight: "Trending audio boosts reach by 40%",
    action: "Use trending sounds in next 3 reels",
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="w-5 h-5 text-pink-500" />;
    case "twitter":
      return <Twitter className="w-5 h-5 text-blue-400" />;
    case "youtube":
      return <Youtube className="w-5 h-5 text-red-500" />;
    case "tiktok":
      return <Music2 className="w-5 h-5" />;
    default:
      return null;
  }
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7d");

  const totalFollowers = platformStats.reduce((acc, p) => acc + p.followers, 0);
  const totalGained = platformStats.reduce((acc, p) => acc + p.gained, 0);
  const goalProgress = (totalFollowers / 100000) * 100;

  return (
    <>
      <Header
        title="Analytics & Insights"
        description="Track your growth journey to 100K"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Period Selector */}
        <div className="flex justify-end">
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
              <TabsTrigger value="1y">1 Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Goal Tracker */}
        <Card className="border-2 border-violet-200 dark:border-violet-900/50 bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-950/20 dark:to-pink-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-500" />
              <CardTitle>100K Goal Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <CircularProgress
                value={goalProgress}
                size={140}
                strokeWidth={12}
                indicatorColor="stroke-violet-500"
              />
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-4xl font-bold">
                    {totalFollowers.toLocaleString()}
                  </p>
                  <p className="text-zinc-500">Total Followers</p>
                </div>
                <Progress
                  value={totalFollowers}
                  max={100000}
                  className="h-4"
                  indicatorClassName="bg-gradient-to-r from-violet-500 to-pink-500"
                />
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-green-600">
                      +{totalGained.toLocaleString()}
                    </p>
                    <p className="text-zinc-500">This Week</p>
                  </div>
                  <div>
                    <p className="font-semibold">46 days</p>
                    <p className="text-zinc-500">Remaining</p>
                  </div>
                  <div>
                    <p className="font-semibold">1,147/day</p>
                    <p className="text-zinc-500">Needed</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map((stat) => (
            <Card key={stat.platform}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <PlatformIcon platform={stat.platform} />
                  <Badge
                    variant={stat.trend === "up" ? "success" : "destructive"}
                    className="text-xs"
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {stat.gained.toLocaleString()}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">
                  {stat.followers.toLocaleString()}
                </p>
                <p className="text-sm text-zinc-500">{stat.name} followers</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-zinc-400" />
                    <span>{(stat.views / 1000).toFixed(0)}K views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-zinc-400" />
                    <span>{stat.engagement}% eng</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Performing Content</CardTitle>
              <CardDescription>This week's best performers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContent.map((content, index) => (
                  <div
                    key={content.id}
                    className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                  >
                    <span className="text-2xl font-bold text-zinc-300 w-8">
                      {index + 1}
                    </span>
                    <PlatformIcon platform={content.platform} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{content.title}</p>
                      <div className="flex items-center gap-3 text-sm text-zinc-500 mt-1">
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
                    <Button variant="outline" size="sm">
                      Repurpose
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-500" />
                <CardTitle className="text-base">AI Insights</CardTitle>
              </div>
              <CardDescription>
                Smart recommendations based on your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/20 dark:to-pink-950/20 rounded-lg border border-violet-200 dark:border-violet-900/50"
                  >
                    <p className="font-medium text-sm">{item.insight}</p>
                    <p className="text-sm text-violet-600 dark:text-violet-400 mt-1 flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4" />
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
