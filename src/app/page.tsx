"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  TrendingUp,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
  Lightbulb,
  Target,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Sidebar } from "@/components/layout";

// Mock data for demonstration
const todaysTrend = {
  topic: "Protein Coffee",
  velocity: "+340%",
  source: "TikTok",
};

const scheduledContent = [
  {
    id: 1,
    title: "Morning protein routine",
    platform: "instagram",
    type: "Reel",
    time: "9:00 AM",
    status: "scheduled",
  },
  {
    id: 2,
    title: "5 beginner gym tips",
    platform: "twitter",
    type: "Thread",
    time: "2:00 PM",
    status: "scheduled",
  },
  {
    id: 3,
    title: "What I eat in a day",
    platform: "instagram",
    type: "Carousel",
    time: "6:00 PM",
    status: "draft",
  },
];

const quickStats = {
  postsThisWeek: 12,
  postsThisMonth: 48,
  ideasSaved: 47,
  streak: 14,
};

const goalProgress = {
  current: 47234,
  target: 100000,
  daysRemaining: 46,
  dailyRequired: 1147,
  avgDaily: 1890,
};

const recentIdeas = [
  { id: 1, title: "5 gym mistakes I made as a beginner", category: "mistakes" },
  { id: 2, title: "What 100g protein actually looks like", category: "nutrition" },
  { id: 3, title: "My morning routine for gains", category: "lifestyle" },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="w-4 h-4 text-pink-500" />;
    case "twitter":
      return <Twitter className="w-4 h-4 text-blue-400" />;
    case "youtube":
      return <Youtube className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication on mount
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  const greeting = getGreeting();
  const progress = (goalProgress.current / goalProgress.target) * 100;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
        <Header
          title={`${greeting}! Here's Your Day`}
          description={new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />

        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* Streak & Goal Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Streak Card */}
            <Card className="lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Flame className="w-7 h-7 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Your Streak
                    </p>
                    <p className="text-3xl font-bold">{quickStats.streak} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goal Progress Card */}
            <Card className="lg:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-violet-500" />
                    <span className="font-semibold">100K Goal Progress</span>
                  </div>
                  <Badge
                    variant={
                      goalProgress.avgDaily >= goalProgress.dailyRequired
                        ? "success"
                        : "warning"
                    }
                  >
                    {goalProgress.avgDaily >= goalProgress.dailyRequired
                      ? "On Track"
                      : "Behind"}
                  </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500">
                        {goalProgress.current.toLocaleString()} followers
                      </span>
                      <span className="font-medium">
                        {goalProgress.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={goalProgress.current}
                      max={goalProgress.target}
                      className="h-3"
                      indicatorClassName="bg-gradient-to-r from-violet-500 to-pink-500"
                    />
                    <div className="flex justify-between text-xs text-zinc-500 mt-2">
                      <span>{goalProgress.daysRemaining} days remaining</span>
                      <span>
                        Need {goalProgress.dailyRequired.toLocaleString()}/day • Avg{" "}
                        {goalProgress.avgDaily.toLocaleString()}/day
                      </span>
                    </div>
                  </div>
                  <CircularProgress
                    value={progress}
                    size={80}
                    strokeWidth={8}
                    indicatorColor="stroke-violet-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Trend & Quick Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Trend Card */}
            <Card className="border-2 border-red-200 dark:border-red-900/50 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold text-sm uppercase tracking-wide">
                    Top Trend Right Now
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">
                      "{todaysTrend.topic}"
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="text-green-600 font-semibold">
                        {todaysTrend.velocity}
                      </span>{" "}
                      on {todaysTrend.source}
                    </p>
                  </div>
                  <Link href="/studio">
                    <Button variant="gradient">
                      <Sparkles className="w-4 h-4" />
                      Create Content
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                    <p className="text-2xl font-bold">{quickStats.postsThisWeek}</p>
                    <p className="text-xs text-zinc-500">This Week</p>
                  </div>
                  <div className="text-center p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                    <p className="text-2xl font-bold">{quickStats.postsThisMonth}</p>
                    <p className="text-xs text-zinc-500">This Month</p>
                  </div>
                  <div className="text-center p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                    <p className="text-2xl font-bold">{quickStats.ideasSaved}</p>
                    <p className="text-xs text-zinc-500">Ideas Saved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Tasks & Recent Ideas Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Content Tasks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <CardTitle className="text-base">Today's Content</CardTitle>
                  </div>
                  <Link href="/calendar">
                    <Button variant="ghost" size="sm">
                      View Calendar <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledContent.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                        <PlatformIcon platform={item.platform} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                          <span>{item.type}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      {item.status === "scheduled" ? (
                        <Badge variant="info">Scheduled</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Ideas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-base">Recent Ideas</CardTitle>
                  </div>
                  <Link href="/ideas">
                    <Button variant="ghost" size="sm">
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="font-medium">{idea.title}</span>
                      </div>
                      <Link href="/studio">
                        <Button variant="outline" size="sm">
                          Create
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>

                <Link href="/studio" className="block mt-4">
                  <Button variant="gradient" className="w-full">
                    <Sparkles className="w-4 h-4" />
                    Generate New Ideas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
              <CardDescription>One-click content generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/trends">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    <span>What's Trending?</span>
                  </Button>
                </Link>
                <Link href="/studio">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <span>10 Content Ideas</span>
                  </Button>
                </Link>
                <Link href="/studio?type=reel">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <span>Today's Reel Script</span>
                  </Button>
                </Link>
                <Link href="/studio?type=thread">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <span>Viral Tweet</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
