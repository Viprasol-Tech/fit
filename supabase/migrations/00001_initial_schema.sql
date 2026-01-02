-- ============================================
-- Ultimate AI-Driven Content Engine
-- Initial Database Schema
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Users profile extension (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,

    -- Creator settings
    niche TEXT DEFAULT 'fitness',
    target_audience TEXT,
    brand_voice TEXT,

    -- Goals
    follower_goal INTEGER DEFAULT 100000,
    current_followers INTEGER DEFAULT 0,
    goal_deadline DATE,

    -- Preferences
    preferred_platforms TEXT[] DEFAULT ARRAY['instagram', 'tiktok'],
    default_tone TEXT DEFAULT 'motivational',
    timezone TEXT DEFAULT 'UTC',

    -- Subscription/Usage
    subscription_tier TEXT DEFAULT 'free',
    ai_credits_used INTEGER DEFAULT 0,
    ai_credits_limit INTEGER DEFAULT 100,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Content Pillars
-- ============================================
CREATE TABLE public.content_pillars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    name TEXT NOT NULL,
    description TEXT,
    color TEXT,
    icon TEXT,

    target_percentage INTEGER NOT NULL,
    total_content INTEGER DEFAULT 0,
    content_this_month INTEGER DEFAULT 0,

    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Trends (cached)
-- ============================================
CREATE TABLE public.trends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    topic TEXT NOT NULL,
    source TEXT NOT NULL,

    volume INTEGER,
    velocity DECIMAL(5, 2),

    category TEXT,
    is_fitness_related BOOLEAN DEFAULT FALSE,
    relevance_score INTEGER,

    data JSONB,

    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- ============================================
-- Ideas
-- ============================================
CREATE TABLE public.ideas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    title TEXT NOT NULL,
    description TEXT,
    notes TEXT,

    category TEXT NOT NULL,
    pillar_id UUID REFERENCES public.content_pillars(id),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],

    status TEXT DEFAULT 'idea',
    priority TEXT DEFAULT 'medium',

    target_platforms TEXT[] DEFAULT ARRAY[]::TEXT[],
    suggested_content_types TEXT[] DEFAULT ARRAY[]::TEXT[],

    source TEXT,
    source_url TEXT,
    trend_id UUID REFERENCES public.trends(id),

    ai_suggestions JSONB,

    scheduled_for DATE,
    posted_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Content
-- ============================================
CREATE TABLE public.content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    title TEXT NOT NULL,
    content_type TEXT NOT NULL,
    tone TEXT DEFAULT 'motivational',

    body JSONB NOT NULL,

    pillar_id UUID REFERENCES public.content_pillars(id),
    source_idea_id UUID REFERENCES public.ideas(id),
    source_content_id UUID REFERENCES public.content(id),

    platform TEXT NOT NULL,
    character_count INTEGER,
    word_count INTEGER,
    estimated_duration INTEGER,

    status TEXT DEFAULT 'draft',
    scheduled_for TIMESTAMPTZ,
    published_at TIMESTAMPTZ,

    ai_model TEXT,
    ai_prompt_used TEXT,
    generation_tokens INTEGER,

    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Calendar Events
-- ============================================
CREATE TABLE public.calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    title TEXT NOT NULL,
    description TEXT,

    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    all_day BOOLEAN DEFAULT FALSE,

    content_id UUID REFERENCES public.content(id) ON DELETE SET NULL,
    idea_id UUID REFERENCES public.ideas(id) ON DELETE SET NULL,

    platform TEXT,
    content_type TEXT,

    status TEXT DEFAULT 'scheduled',

    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_rule TEXT,
    parent_event_id UUID REFERENCES public.calendar_events(id),

    reminder_minutes INTEGER[] DEFAULT ARRAY[60, 1440],

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Analytics
-- ============================================
CREATE TABLE public.analytics_daily (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    platform TEXT NOT NULL,

    followers INTEGER DEFAULT 0,
    followers_gained INTEGER DEFAULT 0,
    followers_lost INTEGER DEFAULT 0,

    total_views INTEGER DEFAULT 0,
    total_likes INTEGER DEFAULT 0,
    total_comments INTEGER DEFAULT 0,
    total_shares INTEGER DEFAULT 0,
    total_saves INTEGER DEFAULT 0,

    posts_published INTEGER DEFAULT 0,

    engagement_rate DECIMAL(5, 2),
    avg_views_per_post INTEGER,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id, date, platform)
);

-- ============================================
-- Goals
-- ============================================
CREATE TABLE public.goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    name TEXT NOT NULL,
    description TEXT,

    metric TEXT NOT NULL,
    target_value INTEGER NOT NULL,
    current_value INTEGER DEFAULT 0,

    start_date DATE NOT NULL,
    target_date DATE NOT NULL,

    status TEXT DEFAULT 'active',
    achieved_at TIMESTAMPTZ,

    milestones JSONB DEFAULT '[]',

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- News Articles (cached)
-- ============================================
CREATE TABLE public.news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    url TEXT NOT NULL UNIQUE,
    image_url TEXT,

    source_name TEXT NOT NULL,
    source_id TEXT,
    author TEXT,

    ai_summary TEXT,
    ai_key_points JSONB,
    ai_content_ideas JSONB,

    category TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    relevance_score INTEGER,

    published_at TIMESTAMPTZ,
    fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Saved Articles
-- ============================================
CREATE TABLE public.saved_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES public.news_articles(id) ON DELETE CASCADE,

    notes TEXT,
    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id, article_id)
);

-- ============================================
-- Row Level Security
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Content policies
CREATE POLICY "Users can view own content" ON public.content FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own content" ON public.content FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own content" ON public.content FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own content" ON public.content FOR DELETE USING (auth.uid() = user_id);

-- Ideas policies
CREATE POLICY "Users can view own ideas" ON public.ideas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own ideas" ON public.ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ideas" ON public.ideas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ideas" ON public.ideas FOR DELETE USING (auth.uid() = user_id);

-- Calendar policies
CREATE POLICY "Users can view own events" ON public.calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own events" ON public.calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own events" ON public.calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own events" ON public.calendar_events FOR DELETE USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON public.analytics_daily FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analytics" ON public.analytics_daily FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own analytics" ON public.analytics_daily FOR UPDATE USING (auth.uid() = user_id);

-- Goals policies
CREATE POLICY "Users can view own goals" ON public.goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON public.goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON public.goals FOR DELETE USING (auth.uid() = user_id);

-- Pillars policies
CREATE POLICY "Users can view own pillars" ON public.content_pillars FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pillars" ON public.content_pillars FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pillars" ON public.content_pillars FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own pillars" ON public.content_pillars FOR DELETE USING (auth.uid() = user_id);

-- Saved articles policies
CREATE POLICY "Users can view own saved" ON public.saved_articles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved" ON public.saved_articles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved" ON public.saved_articles FOR DELETE USING (auth.uid() = user_id);

-- Public read for trends and news
CREATE POLICY "Anyone can read trends" ON public.trends FOR SELECT USING (true);
CREATE POLICY "Anyone can read news" ON public.news_articles FOR SELECT USING (true);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_content_user_id ON public.content(user_id);
CREATE INDEX idx_content_status ON public.content(status);
CREATE INDEX idx_content_scheduled_for ON public.content(scheduled_for);
CREATE INDEX idx_content_platform ON public.content(platform);
CREATE INDEX idx_content_created_at ON public.content(created_at DESC);

CREATE INDEX idx_ideas_user_id ON public.ideas(user_id);
CREATE INDEX idx_ideas_status ON public.ideas(status);
CREATE INDEX idx_ideas_category ON public.ideas(category);
CREATE INDEX idx_ideas_created_at ON public.ideas(created_at DESC);

CREATE INDEX idx_calendar_user_id ON public.calendar_events(user_id);
CREATE INDEX idx_calendar_start_time ON public.calendar_events(start_time);

CREATE INDEX idx_analytics_user_date ON public.analytics_daily(user_id, date DESC);

CREATE INDEX idx_trends_source ON public.trends(source);
CREATE INDEX idx_trends_fetched_at ON public.trends(fetched_at DESC);

CREATE INDEX idx_news_published_at ON public.news_articles(published_at DESC);

-- ============================================
-- Functions & Triggers
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON public.content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ideas_updated_at BEFORE UPDATE ON public.ideas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_updated_at BEFORE UPDATE ON public.calendar_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON public.goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pillars_updated_at BEFORE UPDATE ON public.content_pillars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );

    -- Create default content pillars
    INSERT INTO public.content_pillars (user_id, name, description, target_percentage, color, sort_order)
    VALUES
        (NEW.id, 'Workouts', 'Exercise routines, form tips, workout plans', 30, '#EF4444', 1),
        (NEW.id, 'Nutrition', 'Recipes, meal prep, supplements', 25, '#22C55E', 2),
        (NEW.id, 'Motivation', 'Mindset, quotes, transformation stories', 20, '#F59E0B', 3),
        (NEW.id, 'Lifestyle', 'Day in the life, behind the scenes', 15, '#3B82F6', 4),
        (NEW.id, 'Education', 'Science, tips, myth busting', 10, '#8B5CF6', 5);

    -- Create default 100K goal
    INSERT INTO public.goals (user_id, name, metric, target_value, start_date, target_date)
    VALUES (
        NEW.id,
        '100K Followers',
        'followers',
        100000,
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '1 year'
    );

    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
