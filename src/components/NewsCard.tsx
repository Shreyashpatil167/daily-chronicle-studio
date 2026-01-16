import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
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
  variant?: "default" | "featured" | "compact";
}

export const NewsCard = ({
  id,
  title,
  excerpt,
  image,
  category,
  categorySlug,
  author,
  date,
  readTime,
  isBreaking = false,
  variant = "default",
}: NewsCardProps) => {
  if (variant === "featured") {
    return (
      <Link to={`/article/${id}`} className="group block">
        <article className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden news-card-hover">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-headline/90 via-headline/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              {isBreaking && (
                <Badge variant="destructive" className="font-marathi animate-pulse">
                  ताज्या
                </Badge>
              )}
              <Badge variant="secondary" className="font-marathi">
                {category}
              </Badge>
            </div>
            <h2 className="font-headline text-2xl md:text-4xl text-primary-foreground mb-3 line-clamp-3 group-hover:text-secondary transition-colors">
              {title}
            </h2>
            <p className="text-primary-foreground/80 font-body line-clamp-2 mb-4 hidden md:block">
              {excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/article/${id}`} className="group block">
        <article className="flex gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
          <img
            src={image}
            alt={title}
            className="w-20 h-20 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="font-marathi text-xs mb-1">
              {category}
            </Badge>
            <h3 className="font-headline text-sm font-semibold text-headline line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-xs text-byline mt-1">{date}</p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/article/${id}`} className="group block">
      <article className="bg-card rounded-xl overflow-hidden shadow-md news-card-hover">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {isBreaking && (
              <Badge variant="destructive" className="font-marathi">
                ताज्या
              </Badge>
            )}
            <Badge variant="secondary" className="font-marathi">
              {category}
            </Badge>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-headline text-xl font-semibold text-headline mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground font-body line-clamp-2 mb-4">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-byline">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
