
-- =============================================
-- नाशिक एक्सप्रेस — Full Database Schema
-- =============================================

-- 1. Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- 2. Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 4. Categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  name_marathi TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins/editors can manage categories" ON public.categories FOR ALL USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);

-- Seed categories
INSERT INTO public.categories (name, slug, name_marathi, sort_order) VALUES
  ('Breaking', 'breaking', 'ताज्या बातम्या', 0),
  ('Politics', 'politics', 'राजकारण', 1),
  ('Sports', 'sports', 'क्रीडा', 2),
  ('Business', 'business', 'व्यापार', 3),
  ('Entertainment', 'entertainment', 'मनोरंजन', 4),
  ('Local', 'local', 'नाशिक बातम्या', 5);

-- 5. Articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID,
  author_name TEXT NOT NULL DEFAULT 'संपादक',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_breaking BOOLEAN NOT NULL DEFAULT false,
  read_time TEXT NOT NULL DEFAULT '३ मिनिटे',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Published articles viewable by everyone" ON public.articles FOR SELECT USING (status = 'published');
-- Admins/editors can see all articles
CREATE POLICY "Admins/editors can view all articles" ON public.articles FOR SELECT USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);
-- Admins/editors can manage articles
CREATE POLICY "Admins/editors can insert articles" ON public.articles FOR INSERT WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);
CREATE POLICY "Admins/editors can update articles" ON public.articles FOR UPDATE USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);
CREATE POLICY "Admins can delete articles" ON public.articles FOR DELETE USING (
  public.has_role(auth.uid(), 'admin')
);

-- Full text search index
CREATE INDEX idx_articles_search ON public.articles USING GIN (
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))
);

CREATE INDEX idx_articles_category ON public.articles(category_id);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);

-- 6. Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
-- Only admins can view subscribers
CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers FOR SELECT USING (
  public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Admins can manage subscribers" ON public.newsletter_subscribers FOR UPDATE USING (
  public.has_role(auth.uid(), 'admin')
);

-- 7. Storage bucket for article images
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

CREATE POLICY "Article images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'article-images');
CREATE POLICY "Admins/editors can upload images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'article-images' AND (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
  )
);
CREATE POLICY "Admins/editors can update images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'article-images' AND (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
  )
);
CREATE POLICY "Admins can delete images" ON storage.objects FOR DELETE USING (
  bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin')
);

-- 8. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Auto-create profile and role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Search function
CREATE OR REPLACE FUNCTION public.search_articles(search_query TEXT)
RETURNS SETOF public.articles
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.articles
  WHERE status = 'published'
    AND to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))
        @@ plainto_tsquery('simple', search_query)
  ORDER BY published_at DESC;
$$;
