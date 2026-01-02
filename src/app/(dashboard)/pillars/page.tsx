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
import { Progress } from "@/components/ui/progress";
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  Check,
  AlertTriangle,
  Sparkles,
  Dumbbell,
  Apple,
  Flame,
  Camera,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock pillars data
const mockPillars = [
  {
    id: "1",
    name: "Workouts",
    description: "Exercise routines, form tips, workout plans",
    targetPercentage: 30,
    actualPercentage: 35,
    totalContent: 48,
    contentThisMonth: 12,
    color: "#EF4444",
    icon: "Dumbbell",
  },
  {
    id: "2",
    name: "Nutrition",
    description: "Recipes, meal prep, supplements",
    targetPercentage: 25,
    actualPercentage: 22,
    totalContent: 35,
    contentThisMonth: 8,
    color: "#22C55E",
    icon: "Apple",
  },
  {
    id: "3",
    name: "Motivation",
    description: "Mindset, quotes, transformation stories",
    targetPercentage: 20,
    actualPercentage: 18,
    totalContent: 29,
    contentThisMonth: 6,
    color: "#F59E0B",
    icon: "Flame",
  },
  {
    id: "4",
    name: "Lifestyle",
    description: "Day in the life, behind the scenes",
    targetPercentage: 15,
    actualPercentage: 12,
    totalContent: 19,
    contentThisMonth: 4,
    color: "#3B82F6",
    icon: "Camera",
  },
  {
    id: "5",
    name: "Education",
    description: "Science, tips, myth busting",
    targetPercentage: 10,
    actualPercentage: 13,
    totalContent: 21,
    contentThisMonth: 5,
    color: "#8B5CF6",
    icon: "GraduationCap",
  },
];

const PILLAR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  Apple,
  Flame,
  Camera,
  GraduationCap,
};

export default function PillarsPage() {
  const [pillars, setPillars] = useState(mockPillars);

  const isBalanced = (target: number, actual: number) => {
    const diff = Math.abs(target - actual);
    return diff <= 5;
  };

  const getBalanceStatus = (target: number, actual: number) => {
    const diff = actual - target;
    if (Math.abs(diff) <= 5) return { status: "balanced", message: "On target" };
    if (diff > 0) return { status: "over", message: `+${diff}% over target` };
    return { status: "under", message: `${diff}% under target` };
  };

  return (
    <>
      <Header
        title="Content Pillars Manager"
        description="Organize your content strategy by themes"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Overview Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pillar Balance</CardTitle>
                <CardDescription>
                  Target vs actual content distribution
                </CardDescription>
              </div>
              <Button variant="outline">
                <Plus className="w-4 h-4" />
                Add Pillar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-8 rounded-full overflow-hidden flex">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="h-full transition-all"
                    style={{
                      width: `${pillar.actualPercentage}%`,
                      backgroundColor: pillar.color,
                    }}
                    title={`${pillar.name}: ${pillar.actualPercentage}%`}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: pillar.color }}
                  />
                  <span className="text-sm">
                    {pillar.name}: {pillar.actualPercentage}%
                    <span className="text-zinc-400 ml-1">
                      (target: {pillar.targetPercentage}%)
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.icon] || Layers;
            const balance = getBalanceStatus(
              pillar.targetPercentage,
              pillar.actualPercentage
            );

            return (
              <Card key={pillar.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${pillar.color}20` }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{pillar.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {pillar.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Target vs Actual */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-500">Distribution</span>
                        <div className="flex items-center gap-1">
                          {balance.status === "balanced" ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          )}
                          <span
                            className={cn(
                              balance.status === "balanced"
                                ? "text-green-600"
                                : "text-amber-600"
                            )}
                          >
                            {balance.message}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress
                          value={pillar.actualPercentage}
                          max={50}
                          className="h-3"
                          indicatorClassName=""
                          style={
                            {
                              "--progress-color": pillar.color,
                            } as React.CSSProperties
                          }
                        />
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-zinc-400"
                          style={{ left: `${(pillar.targetPercentage / 50) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-zinc-500 mt-1">
                        <span>Actual: {pillar.actualPercentage}%</span>
                        <span>Target: {pillar.targetPercentage}%</span>
                      </div>
                    </div>

                    {/* Content Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg text-center">
                        <p className="text-xl font-bold">{pillar.totalContent}</p>
                        <p className="text-xs text-zinc-500">Total Posts</p>
                      </div>
                      <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg text-center">
                        <p className="text-xl font-bold">
                          {pillar.contentThisMonth}
                        </p>
                        <p className="text-xs text-zinc-500">This Month</p>
                      </div>
                    </div>

                    {/* Action */}
                    <Button variant="outline" className="w-full" size="sm">
                      <Sparkles className="w-4 h-4" />
                      Generate {pillar.name} Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-500" />
              <CardTitle className="text-base">Balance Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  Lifestyle content is 3% under target
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                  Create 2-3 more "day in the life" posts this week
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                <p className="font-medium text-green-800 dark:text-green-200">
                  Workouts content is performing well
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Consider converting top workout reels to carousels
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
