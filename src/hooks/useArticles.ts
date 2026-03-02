import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ArticleWithCategory {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author_name: string;
  read_time: string;
  is_breaking: boolean;
  is_featured: boolean;
  published_at: string | null;
  status: string;
  category: {
    id: string;
    name: string;
    name_marathi: string;
    slug: string;
  } | null;
}

const mapArticle = (a: ArticleWithCategory) => ({
  id: a.id,
  title: a.title,
  excerpt: a.excerpt,
  image: a.image_url || "/placeholder.svg",
  category: a.category?.name_marathi || "बातम्या",
  categorySlug: a.category?.slug || "breaking",
  author: a.author_name,
  date: a.published_at
    ? new Date(a.published_at).toLocaleDateString("mr-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "",
  readTime: a.read_time,
  isBreaking: a.is_breaking,
});

export const useFeaturedArticles = () =>
  useQuery({
    queryKey: ["articles", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, category:categories(*)")
        .eq("status", "published")
        .eq("is_featured", true)
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return (data as unknown as ArticleWithCategory[]).map(mapArticle);
    },
  });

export const useArticlesByCategory = (slug: string) =>
  useQuery({
    queryKey: ["articles", "category", slug],
    queryFn: async () => {
      const { data: cat } = await supabase
        .from("categories")
        .select("id, name_marathi")
        .eq("slug", slug)
        .maybeSingle();

      if (!cat) return { articles: [], categoryName: "बातम्या" };

      const { data, error } = await supabase
        .from("articles")
        .select("*, category:categories(*)")
        .eq("status", "published")
        .eq("category_id", cat.id)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return {
        articles: (data as unknown as ArticleWithCategory[]).map(mapArticle),
        categoryName: cat.name_marathi,
      };
    },
    enabled: !!slug,
  });

export const useCategorySectionArticles = (slug: string, limit = 3) =>
  useQuery({
    queryKey: ["articles", "section", slug, limit],
    queryFn: async () => {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();
      if (!cat) return [];

      const { data, error } = await supabase
        .from("articles")
        .select("*, category:categories(*)")
        .eq("status", "published")
        .eq("category_id", cat.id)
        .order("published_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data as unknown as ArticleWithCategory[]).map(mapArticle);
    },
  });

export const useArticle = (id: string | undefined) =>
  useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, category:categories(*)")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const a = data as unknown as ArticleWithCategory;
      return {
        ...mapArticle(a),
        content: a.content,
        categoryId: a.category?.id,
      };
    },
    enabled: !!id,
  });

export const useRelatedArticles = (
  articleId: string | undefined,
  categorySlug: string | undefined
) =>
  useQuery({
    queryKey: ["articles", "related", articleId, categorySlug],
    queryFn: async () => {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug!)
        .maybeSingle();
      if (!cat) return [];

      const { data, error } = await supabase
        .from("articles")
        .select("*, category:categories(*)")
        .eq("status", "published")
        .eq("category_id", cat.id)
        .neq("id", articleId!)
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return (data as unknown as ArticleWithCategory[]).map(mapArticle);
    },
    enabled: !!articleId && !!categorySlug,
  });

export const useSearchArticles = (query: string) =>
  useQuery({
    queryKey: ["articles", "search", query],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("search_articles", {
        search_query: query,
      });
      if (error) throw error;
      // search_articles returns articles rows, need to fetch categories separately
      const articles = data || [];
      if (articles.length === 0) return [];

      const categoryIds = [...new Set(articles.map((a: any) => a.category_id).filter(Boolean))];
      const { data: cats } = await supabase
        .from("categories")
        .select("*")
        .in("id", categoryIds);

      const catMap = Object.fromEntries((cats || []).map((c) => [c.id, c]));

      return articles.map((a: any) => {
        const cat = catMap[a.category_id];
        return {
          id: a.id,
          title: a.title,
          excerpt: a.excerpt,
          image: a.image_url || "/placeholder.svg",
          category: cat?.name_marathi || "बातम्या",
          categorySlug: cat?.slug || "breaking",
          author: a.author_name,
          date: a.published_at
            ? new Date(a.published_at).toLocaleDateString("mr-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "",
          readTime: a.read_time,
          isBreaking: a.is_breaking,
        };
      });
    },
    enabled: query.length >= 2,
  });

export const useBreakingNews = () =>
  useQuery({
    queryKey: ["articles", "breaking"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title")
        .eq("status", "published")
        .eq("is_breaking", true)
        .order("published_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
  });
