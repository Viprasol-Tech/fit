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
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Instagram,
  Twitter,
  Youtube,
  Music2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, isSameDay, isToday } from "date-fns";

// Mock scheduled content
const mockScheduledContent = [
  {
    id: "1",
    title: "Morning protein routine",
    platform: "instagram",
    type: "reel",
    date: new Date(),
    time: "09:00",
    status: "scheduled",
  },
  {
    id: "2",
    title: "5 beginner gym tips",
    platform: "twitter",
    type: "thread",
    date: new Date(),
    time: "14:00",
    status: "scheduled",
  },
  {
    id: "3",
    title: "What I eat in a day",
    platform: "instagram",
    type: "carousel",
    date: addDays(new Date(), 1),
    time: "12:00",
    status: "draft",
  },
  {
    id: "4",
    title: "Full body workout",
    platform: "tiktok",
    type: "tiktok",
    date: addDays(new Date(), 2),
    time: "18:00",
    status: "scheduled",
  },
  {
    id: "5",
    title: "Protein myths debunked",
    platform: "instagram",
    type: "reel",
    date: addDays(new Date(), 3),
    time: "09:00",
    status: "scheduled",
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="w-4 h-4 text-pink-500" />;
    case "twitter":
      return <Twitter className="w-4 h-4 text-blue-400" />;
    case "youtube":
      return <Youtube className="w-4 h-4 text-red-500" />;
    case "tiktok":
      return <Music2 className="w-4 h-4 text-zinc-900 dark:text-white" />;
    default:
      return null;
  }
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "month">("week");

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getContentForDate = (date: Date) => {
    return mockScheduledContent.filter((content) =>
      isSameDay(content.date, date)
    );
  };

  const goToToday = () => setCurrentDate(new Date());
  const goToPrevious = () =>
    setCurrentDate(addDays(currentDate, view === "week" ? -7 : -30));
  const goToNext = () =>
    setCurrentDate(addDays(currentDate, view === "week" ? 7 : 30));

  const totalScheduled = mockScheduledContent.filter(
    (c) => c.status === "scheduled"
  ).length;
  const totalDrafts = mockScheduledContent.filter(
    (c) => c.status === "draft"
  ).length;

  return (
    <>
      <Header
        title="Content Command Center"
        description="Plan and schedule your content"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <span className="text-lg font-semibold ml-4">
              {format(currentDate, "MMMM yyyy")}
            </span>
          </div>
          <div className="flex gap-2">
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as "week" | "month")}
            >
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="gradient">
              <Sparkles className="w-4 h-4" />
              Auto-Fill Week
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalScheduled}</p>
                  <p className="text-sm text-zinc-500">Scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalDrafts}</p>
                  <p className="text-sm text-zinc-500">Drafts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-zinc-500">Posted This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Grid */}
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-800">
              {weekDays.map((day) => (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "p-4 text-center border-r last:border-r-0 border-zinc-200 dark:border-zinc-800",
                    isToday(day) && "bg-violet-50 dark:bg-violet-950/30"
                  )}
                >
                  <p className="text-sm font-medium text-zinc-500">
                    {format(day, "EEE")}
                  </p>
                  <p
                    className={cn(
                      "text-2xl font-bold mt-1",
                      isToday(day) && "text-violet-600 dark:text-violet-400"
                    )}
                  >
                    {format(day, "d")}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 min-h-[400px]">
              {weekDays.map((day) => {
                const content = getContentForDate(day);
                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      "p-2 border-r last:border-r-0 border-zinc-200 dark:border-zinc-800",
                      isToday(day) && "bg-violet-50/50 dark:bg-violet-950/20"
                    )}
                  >
                    <div className="space-y-2">
                      {content.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "p-2 rounded-lg text-xs cursor-pointer hover:shadow-md transition-shadow",
                            item.status === "scheduled"
                              ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                              : "bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800"
                          )}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <PlatformIcon platform={item.platform} />
                            <span className="font-medium">{item.time}</span>
                          </div>
                          <p className="truncate">{item.title}</p>
                          <Badge
                            variant="secondary"
                            className="mt-1 text-[10px]"
                          >
                            {item.type}
                          </Badge>
                        </div>
                      ))}
                      {content.length === 0 && (
                        <button className="w-full p-4 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-400 hover:border-violet-300 hover:text-violet-500 transition-colors">
                          <Plus className="w-4 h-4 mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
