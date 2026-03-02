import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { useArticlesByCategory } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";

const Category = () => {
  const { slug } = useParams();
  const { data, isLoading } = useArticlesByCategory(slug || "");
  const articles = data?.articles || [];
  const categoryName = data?.categoryName || "बातम्या";

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container py-8">
        <header className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-headline headline-underline inline-block">
            {categoryName}
          </h1>
          <p className="mt-4 text-muted-foreground font-marathi">
            {isLoading ? "लोड होत आहे..." : `${articles.length} बातम्या सापडल्या`}
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-marathi text-lg">
              या विभागात सध्या कोणत्याही बातम्या नाहीत.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
