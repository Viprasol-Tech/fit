import { ContentType, ContentTone, Platform, IdeaStatus, IdeaPriority } from "@/types";

// Platform Configuration
export const PLATFORMS: {
  id: Platform;
  name: string;
  icon: string;
  color: string;
}[] = [
  { id: "instagram", name: "Instagram", icon: "Instagram", color: "#E4405F" },
  { id: "tiktok", name: "TikTok", icon: "Music2", color: "#000000" },
  { id: "twitter", name: "Twitter/X", icon: "Twitter", color: "#1DA1F2" },
  { id: "youtube", name: "YouTube", icon: "Youtube", color: "#FF0000" },
  { id: "blog", name: "Blog", icon: "FileText", color: "#4A5568" },
  { id: "newsletter", name: "Newsletter", icon: "Mail", color: "#805AD5" },
];

// Content Types Configuration
export const CONTENT_TYPES: {
  id: ContentType;
  name: string;
  platform: Platform;
  description: string;
  icon: string;
  estimatedDuration?: string;
}[] = [
  {
    id: "reel",
    name: "Instagram Reel",
    platform: "instagram",
    description: "60 second video script with hook, script, and CTA",
    icon: "Film",
    estimatedDuration: "30-60 sec",
  },
  {
    id: "carousel",
    name: "Instagram Carousel",
    platform: "instagram",
    description: "10 slide carousel with engaging copy",
    icon: "Images",
  },
  {
    id: "thread",
    name: "Twitter Thread",
    platform: "twitter",
    description: "7-10 tweet thread with hooks and insights",
    icon: "MessageSquare",
  },
  {
    id: "tiktok",
    name: "TikTok Script",
    platform: "tiktok",
    description: "30-60 second video script optimized for TikTok",
    icon: "Music2",
    estimatedDuration: "30-60 sec",
  },
  {
    id: "youtube_short",
    name: "YouTube Short",
    platform: "youtube",
    description: "60 second vertical video script",
    icon: "Youtube",
    estimatedDuration: "60 sec",
  },
  {
    id: "youtube_long",
    name: "YouTube Video",
    platform: "youtube",
    description: "10+ minute video outline with sections",
    icon: "PlayCircle",
    estimatedDuration: "10+ min",
  },
  {
    id: "blog",
    name: "Blog Article",
    platform: "blog",
    description: "1500+ word SEO-optimized article",
    icon: "FileText",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    platform: "newsletter",
    description: "Email newsletter segment",
    icon: "Mail",
  },
];

// Content Tones
export const CONTENT_TONES: {
  id: ContentTone;
  name: string;
  description: string;
  emoji: string;
}[] = [
  {
    id: "energetic",
    name: "Energetic",
    description: "High energy, exciting, pump-up vibes",
    emoji: "⚡",
  },
  {
    id: "motivational",
    name: "Motivational",
    description: "Inspiring, encouraging, uplifting",
    emoji: "💪",
  },
  {
    id: "educational",
    name: "Educational",
    description: "Informative, teaching, fact-based",
    emoji: "📚",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Fun, humorous, engaging",
    emoji: "🎉",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Authoritative, expert, credible",
    emoji: "👔",
  },
  {
    id: "casual",
    name: "Casual",
    description: "Relaxed, conversational, friendly",
    emoji: "😊",
  },
];

// Idea Statuses
export const IDEA_STATUSES: {
  id: IdeaStatus;
  name: string;
  color: string;
  bgColor: string;
}[] = [
  { id: "idea", name: "Idea", color: "#6B7280", bgColor: "#F3F4F6" },
  { id: "developing", name: "Developing", color: "#F59E0B", bgColor: "#FEF3C7" },
  { id: "ready", name: "Ready", color: "#10B981", bgColor: "#D1FAE5" },
  { id: "scheduled", name: "Scheduled", color: "#3B82F6", bgColor: "#DBEAFE" },
  { id: "posted", name: "Posted", color: "#8B5CF6", bgColor: "#EDE9FE" },
  { id: "archived", name: "Archived", color: "#9CA3AF", bgColor: "#F9FAFB" },
];

// Idea Priorities
export const IDEA_PRIORITIES: {
  id: IdeaPriority;
  name: string;
  color: string;
}[] = [
  { id: "low", name: "Low", color: "#9CA3AF" },
  { id: "medium", name: "Medium", color: "#F59E0B" },
  { id: "high", name: "High", color: "#EF4444" },
  { id: "urgent", name: "Urgent", color: "#DC2626" },
];

// Content Categories (for ideas)
export const CONTENT_CATEGORIES = [
  { id: "workouts", name: "Workouts & Exercises", icon: "Dumbbell" },
  { id: "nutrition", name: "Nutrition & Diet", icon: "Apple" },
  { id: "mindset", name: "Mindset & Motivation", icon: "Brain" },
  { id: "transformations", name: "Transformations & Results", icon: "TrendingUp" },
  { id: "tips", name: "Tips & Hacks", icon: "Lightbulb" },
  { id: "mistakes", name: "Mistakes & Myth Busting", icon: "AlertCircle" },
  { id: "personal", name: "Personal Stories", icon: "User" },
  { id: "science", name: "Science & Research", icon: "FlaskConical" },
  { id: "reviews", name: "Product Reviews", icon: "ShoppingBag" },
  { id: "entertainment", name: "Entertainment & Trends", icon: "Sparkles" },
];

// Default Content Pillars
export const DEFAULT_PILLARS = [
  {
    name: "Workouts",
    description: "Exercise routines, form tips, workout plans",
    targetPercentage: 30,
    color: "#EF4444",
    icon: "Dumbbell",
  },
  {
    name: "Nutrition",
    description: "Recipes, meal prep, supplements",
    targetPercentage: 25,
    color: "#22C55E",
    icon: "Apple",
  },
  {
    name: "Motivation",
    description: "Mindset, quotes, transformation stories",
    targetPercentage: 20,
    color: "#F59E0B",
    icon: "Flame",
  },
  {
    name: "Lifestyle",
    description: "Day in the life, behind the scenes",
    targetPercentage: 15,
    color: "#3B82F6",
    icon: "Camera",
  },
  {
    name: "Education",
    description: "Science, tips, myth busting",
    targetPercentage: 10,
    color: "#8B5CF6",
    icon: "GraduationCap",
  },
];

// Quick Actions
export const QUICK_ACTIONS = [
  {
    id: "trending",
    name: "What's Trending?",
    description: "See top fitness trends right now",
    icon: "TrendingUp",
    color: "#EF4444",
  },
  {
    id: "ideas",
    name: "10 Content Ideas",
    description: "Generate fresh content ideas",
    icon: "Lightbulb",
    color: "#F59E0B",
  },
  {
    id: "reel",
    name: "Today's Reel Script",
    description: "Generate an Instagram Reel script",
    icon: "Film",
    color: "#E4405F",
  },
  {
    id: "tweet",
    name: "Viral Tweet",
    description: "Generate a engaging tweet",
    icon: "Twitter",
    color: "#1DA1F2",
  },
  {
    id: "news",
    name: "Today's News",
    description: "Summarize fitness news",
    icon: "Newspaper",
    color: "#6366F1",
  },
  {
    id: "post",
    name: "What to Post?",
    description: "Get posting recommendations",
    icon: "HelpCircle",
    color: "#10B981",
  },
  {
    id: "stats",
    name: "Weekly Stats",
    description: "View your weekly analytics",
    icon: "BarChart3",
    color: "#8B5CF6",
  },
  {
    id: "repurpose",
    name: "Repurpose Content",
    description: "Turn one piece into many",
    icon: "Repeat2",
    color: "#EC4899",
  },
];

// Trend Sources
export const TREND_SOURCES = [
  { id: "google", name: "Google Trends", icon: "Search", color: "#4285F4" },
  { id: "twitter", name: "Twitter/X", icon: "Twitter", color: "#1DA1F2" },
  { id: "tiktok", name: "TikTok", icon: "Music2", color: "#000000" },
  { id: "reddit", name: "Reddit", icon: "MessageCircle", color: "#FF4500" },
  { id: "youtube", name: "YouTube", icon: "Youtube", color: "#FF0000" },
  { id: "instagram", name: "Instagram", icon: "Instagram", color: "#E4405F" },
];

// News Sources
export const NEWS_SOURCES = [
  { id: "menshealth", name: "Men's Health", url: "menshealth.com" },
  { id: "womenshealth", name: "Women's Health", url: "womenshealthmag.com" },
  { id: "self", name: "SELF", url: "self.com" },
  { id: "shape", name: "Shape", url: "shape.com" },
  { id: "healthline", name: "Healthline", url: "healthline.com" },
  { id: "examine", name: "Examine", url: "examine.com" },
  { id: "tnation", name: "T-Nation", url: "t-nation.com" },
  { id: "barbend", name: "BarBend", url: "barbend.com" },
];

// Navigation Items
export const NAV_ITEMS = [
  {
    name: "Daily Briefing",
    href: "/",
    icon: "Sun",
    description: "Your personalized morning dashboard",
  },
  {
    name: "Trend Radar",
    href: "/trends",
    icon: "TrendingUp",
    description: "Real-time trending topics",
  },
  {
    name: "AI Studio",
    href: "/studio",
    icon: "Sparkles",
    description: "Generate content with AI",
  },
  {
    name: "Ideas",
    href: "/ideas",
    icon: "Lightbulb",
    description: "Your content idea bank",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: "Calendar",
    description: "Content schedule",
  },
  {
    name: "News Hub",
    href: "/news",
    icon: "Newspaper",
    description: "Fitness news & research",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: "BarChart3",
    description: "Track your growth",
  },
  {
    name: "Pillars",
    href: "/pillars",
    icon: "Layers",
    description: "Content strategy",
  },
  {
    name: "Repurpose",
    href: "/repurpose",
    icon: "Repeat2",
    description: "Multiply your content",
  },
  {
    name: "Quick Actions",
    href: "/quick-actions",
    icon: "Zap",
    description: "One-click content",
  },
];
