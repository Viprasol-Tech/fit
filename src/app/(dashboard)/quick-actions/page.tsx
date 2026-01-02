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
  Zap,
  TrendingUp,
  Lightbulb,
  Film,
  Twitter,
  Newspaper,
  HelpCircle,
  BarChart3,
  Repeat2,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { QUICK_ACTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ACTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  trending: TrendingUp,
  ideas: Lightbulb,
  reel: Film,
  tweet: Twitter,
  news: Newspaper,
  post: HelpCircle,
  stats: BarChart3,
  repurpose: Repeat2,
};

// Mock recent actions
const recentActions = [
  {
    id: 1,
    action: "Generated 10 content ideas",
    time: "5 minutes ago",
    status: "completed",
  },
  {
    id: 2,
    action: "Created Instagram Reel script",
    time: "1 hour ago",
    status: "completed",
  },
  {
    id: 3,
    action: "Checked trending topics",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 4,
    action: "Summarized fitness news",
    time: "Yesterday",
    status: "completed",
  },
];

export default function QuickActionsPage() {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (actionId: string) => {
    setLoadingAction(actionId);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoadingAction(null);

    // In real implementation, this would navigate or show results
    switch (actionId) {
      case "trending":
        window.location.href = "/trends";
        break;
      case "ideas":
        window.location.href = "/studio";
        break;
      case "reel":
        window.location.href = "/studio?type=reel";
        break;
      case "tweet":
        window.location.href = "/studio?type=thread";
        break;
      case "news":
        window.location.href = "/news";
        break;
      case "stats":
        window.location.href = "/analytics";
        break;
      case "repurpose":
        window.location.href = "/repurpose";
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header
        title="Quick Actions"
        description="One-click content creation and insights"
      />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Quick Actions Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Instant access to common tasks and AI generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {QUICK_ACTIONS.map((action) => {
                const Icon = ACTION_ICONS[action.id] || Zap;
                const isLoading = loadingAction === action.id;

                return (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action.id)}
                    disabled={isLoading}
                    className={cn(
                      "flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all text-center group",
                      isLoading && "opacity-70"
                    )}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${action.color}20` }}
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Icon className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{action.name}</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-zinc-500" />
                <CardTitle className="text-base">Recent Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {action.action}
                      </p>
                      <p className="text-xs text-zinc-500">{action.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-500" />
                <CardTitle className="text-base">Pro Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-violet-50 dark:bg-violet-950/20 rounded-lg border border-violet-200 dark:border-violet-900">
                  <p className="font-medium text-violet-800 dark:text-violet-200">
                    Keyboard Shortcuts
                  </p>
                  <div className="mt-2 space-y-1 text-sm text-violet-700 dark:text-violet-300">
                    <p>
                      <kbd className="px-2 py-0.5 bg-white dark:bg-zinc-800 rounded">
                        Ctrl
                      </kbd>{" "}
                      +{" "}
                      <kbd className="px-2 py-0.5 bg-white dark:bg-zinc-800 rounded">
                        G
                      </kbd>{" "}
                      - Generate content
                    </p>
                    <p>
                      <kbd className="px-2 py-0.5 bg-white dark:bg-zinc-800 rounded">
                        Ctrl
                      </kbd>{" "}
                      +{" "}
                      <kbd className="px-2 py-0.5 bg-white dark:bg-zinc-800 rounded">
                        T
                      </kbd>{" "}
                      - View trends
                    </p>
                    <p>
                      <kbd className="px-2 py-0.5 bg-white dark:bg-zinc-800 rounded">
                        Ctrl
                      </kbd>{" "}
                      +{" "}
                      <kbd className="px-2 py-0.5 bg-white dark:bg-zinc-800 rounded">
                        S
                      </kbd>{" "}
                      - Save draft
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    Best Time to Post Today
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    9:00 AM and 6:00 PM for maximum engagement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Workflow Card */}
        <Card className="bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-950/20 dark:to-pink-950/20 border-violet-200 dark:border-violet-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Complete Daily Workflow</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Follow this sequence for maximum productivity
                </p>
                <div className="flex items-center gap-2 mt-4 text-sm">
                  <Badge variant="secondary">Check Trends</Badge>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                  <Badge variant="secondary">Generate Ideas</Badge>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                  <Badge variant="secondary">Create Content</Badge>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                  <Badge variant="secondary">Schedule</Badge>
                </div>
              </div>
              <Link href="/">
                <Button variant="gradient">
                  Start Workflow
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
