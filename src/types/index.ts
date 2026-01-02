// Content Types
export type ContentType =
  | "reel"
  | "carousel"
  | "thread"
  | "tiktok"
  | "youtube_short"
  | "youtube_long"
  | "blog"
  | "newsletter";

export type ContentStatus = "draft" | "scheduled" | "published" | "archived";

export type ContentTone =
  | "energetic"
  | "motivational"
  | "educational"
  | "entertainment"
  | "professional"
  | "casual";

export type Platform =
  | "instagram"
  | "tiktok"
  | "twitter"
  | "youtube"
  | "blog"
  | "newsletter";

// Idea Types
export type IdeaStatus =
  | "idea"
  | "developing"
  | "ready"
  | "scheduled"
  | "posted"
  | "archived";

export type IdeaPriority = "low" | "medium" | "high" | "urgent";

// Content Pillar
export interface ContentPillar {
  id: string;
  userId: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
  targetPercentage: number;
  totalContent: number;
  contentThisMonth: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Content
export interface Content {
  id: string;
  userId: string;
  title: string;
  contentType: ContentType;
  tone: ContentTone;
  body: ContentBody;
  pillarId?: string;
  pillar?: ContentPillar;
  sourceIdeaId?: string;
  sourceContentId?: string;
  platform: Platform;
  characterCount?: number;
  wordCount?: number;
  estimatedDuration?: number;
  status: ContentStatus;
  scheduledFor?: string;
  publishedAt?: string;
  aiModel?: string;
  aiPromptUsed?: string;
  generationTokens?: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  createdAt: string;
  updatedAt: string;
}

// Content Body Types (varies by content type)
export interface ReelBody {
  hook: string;
  script: string;
  cta: string;
  hashtags: string[];
  suggestedAudio?: string;
  visualNotes?: string;
}

export interface CarouselBody {
  slides: {
    slideNumber: number;
    headline?: string;
    text: string;
    imagePrompt?: string;
  }[];
  caption: string;
  hashtags: string[];
}

export interface ThreadBody {
  tweets: {
    tweetNumber: number;
    text: string;
  }[];
  hashtags: string[];
}

export interface TikTokBody {
  hook: string;
  script: string;
  cta: string;
  trendingSound?: string;
  hashtags: string[];
}

export interface YouTubeShortBody {
  hook: string;
  script: string;
  cta: string;
  thumbnailIdea?: string;
}

export interface YouTubeLongBody {
  title: string;
  intro: string;
  sections: {
    title: string;
    content: string;
    duration?: string;
  }[];
  conclusion: string;
  cta: string;
  thumbnailIdea?: string;
  tags: string[];
}

export interface BlogBody {
  headline: string;
  metaDescription: string;
  intro: string;
  sections: {
    heading: string;
    content: string;
  }[];
  conclusion: string;
  cta: string;
  tags: string[];
}

export interface NewsletterBody {
  subject: string;
  preheader: string;
  greeting: string;
  sections: {
    heading?: string;
    content: string;
  }[];
  cta: {
    text: string;
    url?: string;
  };
  signoff: string;
}

export type ContentBody =
  | ReelBody
  | CarouselBody
  | ThreadBody
  | TikTokBody
  | YouTubeShortBody
  | YouTubeLongBody
  | BlogBody
  | NewsletterBody;

// Idea
export interface Idea {
  id: string;
  userId: string;
  title: string;
  description?: string;
  notes?: string;
  category: string;
  pillarId?: string;
  pillar?: ContentPillar;
  tags: string[];
  status: IdeaStatus;
  priority: IdeaPriority;
  targetPlatforms: Platform[];
  suggestedContentTypes: ContentType[];
  source?: string;
  sourceUrl?: string;
  trendId?: string;
  aiSuggestions?: {
    hooks?: string[];
    angles?: string[];
    hashtags?: string[];
  };
  scheduledFor?: string;
  postedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Calendar Event
export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  allDay: boolean;
  contentId?: string;
  content?: Content;
  ideaId?: string;
  idea?: Idea;
  platform?: Platform;
  contentType?: ContentType;
  status: "scheduled" | "posted" | "missed" | "rescheduled";
  isRecurring: boolean;
  recurrenceRule?: string;
  parentEventId?: string;
  reminderMinutes: number[];
  createdAt: string;
  updatedAt: string;
}

// Trend
export interface Trend {
  id: string;
  topic: string;
  source: "google" | "twitter" | "tiktok" | "reddit" | "youtube" | "instagram";
  volume?: number;
  velocity?: number;
  category?: string;
  isFitnessRelated: boolean;
  relevanceScore?: number;
  data?: Record<string, unknown>;
  fetchedAt: string;
  expiresAt?: string;
}

// News Article
export interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  content?: string;
  url: string;
  imageUrl?: string;
  sourceName: string;
  sourceId?: string;
  author?: string;
  aiSummary?: string;
  aiKeyPoints?: string[];
  aiContentIdeas?: {
    title: string;
    angle: string;
    platform: Platform;
  }[];
  category?: string;
  tags: string[];
  relevanceScore?: number;
  publishedAt?: string;
  fetchedAt: string;
}

// Analytics
export interface DailyAnalytics {
  id: string;
  userId: string;
  date: string;
  platform: Platform;
  followers: number;
  followersGained: number;
  followersLost: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalSaves: number;
  postsPublished: number;
  engagementRate?: number;
  avgViewsPerPost?: number;
  createdAt: string;
}

// Goal
export interface Goal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  metric: "followers" | "views" | "posts" | "engagement_rate";
  targetValue: number;
  currentValue: number;
  startDate: string;
  targetDate: string;
  status: "active" | "achieved" | "failed" | "paused";
  achievedAt?: string;
  milestones: {
    value: number;
    achievedAt?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// User Profile
export interface Profile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  niche: string;
  targetAudience?: string;
  brandVoice?: string;
  followerGoal: number;
  currentFollowers: number;
  goalDeadline?: string;
  preferredPlatforms: Platform[];
  defaultTone: ContentTone;
  timezone: string;
  subscriptionTier: "free" | "pro" | "enterprise";
  aiCreditsUsed: number;
  aiCreditsLimit: number;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Generation Request/Response
export interface GenerateContentRequest {
  contentType: ContentType;
  tone: ContentTone;
  topic: string;
  pillar?: string;
  additionalContext?: string;
  targetPlatform: Platform;
  ideaId?: string;
}

export interface GenerateContentResponse {
  content: ContentBody;
  tokensUsed: number;
  suggestedHashtags: string[];
  alternativeHooks?: string[];
}
