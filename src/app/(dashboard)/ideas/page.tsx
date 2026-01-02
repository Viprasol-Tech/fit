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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lightbulb,
  Plus,
  Search,
  Filter,
  Sparkles,
  Star,
  Calendar,
  MoreHorizontal,
  Trash2,
  Edit,
  ArrowRight,
} from "lucide-react";
import { CONTENT_CATEGORIES, IDEA_STATUSES, IDEA_PRIORITIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { IdeaStatus } from "@/types";

// Mock ideas data
const mockIdeas = [
  {
    id: "1",
    title: "5 gym mistakes I made as a beginner",
    description: "Share personal experience with common beginner mistakes",
    category: "mistakes",
    status: "idea" as IdeaStatus,
    priority: "high",
    targetPlatforms: ["instagram", "tiktok"],
    createdAt: "2024-01-02",
  },
  {
    id: "2",
    title: "What 100g protein actually looks like",
    description: "Visual comparison of protein sources",
    category: "nutrition",
    status: "scheduled" as IdeaStatus,
    priority: "medium",
    targetPlatforms: ["instagram"],
    createdAt: "2024-01-01",
    scheduledFor: "2024-01-05",
  },
  {
    id: "3",
    title: "My morning routine for gains",
    description: "Full morning routine breakdown",
    category: "personal",
    status: "posted" as IdeaStatus,
    priority: "medium",
    targetPlatforms: ["instagram", "youtube"],
    createdAt: "2023-12-28",
    postedAt: "2024-01-02",
  },
  {
    id: "4",
    title: "Why you're not losing weight",
    description: "Common reasons for weight loss plateau",
    category: "tips",
    status: "developing" as IdeaStatus,
    priority: "high",
    targetPlatforms: ["instagram", "tiktok"],
    createdAt: "2024-01-01",
  },
  {
    id: "5",
    title: "Debunking protein timing myths",
    description: "Science-based take on when to eat protein",
    category: "science",
    status: "ready" as IdeaStatus,
    priority: "medium",
    targetPlatforms: ["instagram", "twitter"],
    createdAt: "2023-12-30",
  },
];

export default function IdeasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredIdeas = mockIdeas.filter((idea) => {
    const matchesSearch = idea.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || idea.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "all" || idea.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusConfig = (status: string) => {
    return IDEA_STATUSES.find((s) => s.id === status) || IDEA_STATUSES[0];
  };

  const getCategoryName = (categoryId: string) => {
    return (
      CONTENT_CATEGORIES.find((c) => c.id === categoryId)?.name || categoryId
    );
  };

  return (
    <>
      <Header
        title="Infinite Ideas Engine"
        description="Never run out of content ideas again"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button variant="gradient">
              <Sparkles className="w-4 h-4" />
              Generate Ideas
            </Button>
            <Button variant="outline">
              <Plus className="w-4 h-4" />
              Add Idea
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                placeholder="Search ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {IDEA_STATUSES.slice(0, 5).map((status) => {
            const count = mockIdeas.filter((i) => i.status === status.id).length;
            return (
              <Card
                key={status.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedStatus === status.id && "ring-2 ring-violet-500"
                )}
                onClick={() =>
                  setSelectedStatus(
                    selectedStatus === status.id ? "all" : status.id
                  )
                }
              >
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-sm text-zinc-500">{status.name}</p>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </Button>
          {CONTENT_CATEGORIES.slice(0, 6).map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? "all" : category.id
                )
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Ideas List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Your Ideas ({filteredIdeas.length})
              </CardTitle>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
                Sort
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredIdeas.map((idea) => {
                const statusConfig = getStatusConfig(idea.status);
                return (
                  <div
                    key={idea.id}
                    className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: statusConfig.color }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium truncate">{idea.title}</h3>
                          {idea.priority === "high" && (
                            <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryName(idea.category)}
                          </Badge>
                          <span>•</span>
                          <span>{idea.targetPlatforms.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      style={{
                        backgroundColor: statusConfig.bgColor,
                        color: statusConfig.color,
                        borderColor: statusConfig.color,
                      }}
                    >
                      {statusConfig.name}
                    </Badge>
                    <div className="flex gap-2">
                      <Link
                        href={`/studio?topic=${encodeURIComponent(idea.title)}`}
                      >
                        <Button variant="outline" size="sm">
                          <Sparkles className="w-4 h-4" />
                          Create
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredIdeas.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No ideas found matching your filters</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="w-4 h-4" />
                  Add Your First Idea
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
