import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "./NewsCard";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string;
  readTime: string;
  isBreaking?: boolean;
}

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: Article[];
  layout?: "grid" | "list";
}

export const CategorySection = ({
  title,
  slug,
  articles,
  layout = "grid",
}: CategorySectionProps) => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-headline headline-underline">
          {title}
        </h2>
        <Link
          to={`/category/${slug}`}
          className="flex items-center gap-1 text-primary font-semibold hover:text-primary/80 transition-colors font-marathi"
        >
          सर्व पहा
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {layout === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <NewsCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.length > 0 && (
            <NewsCard {...articles[0]} variant="featured" />
          )}
          <div className="space-y-2">
            {articles.slice(1, 5).map((article) => (
              <NewsCard key={article.id} {...article} variant="compact" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
