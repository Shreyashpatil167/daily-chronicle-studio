import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { allArticles } from "@/data/newsData";

const categoryNames: Record<string, string> = {
  breaking: "ताज्या बातम्या",
  politics: "राजकारण",
  business: "व्यापार",
  sports: "क्रीडा",
  entertainment: "मनोरंजन",
  local: "नाशिक बातम्या",
};

const Category = () => {
  const { slug } = useParams();
  const categoryName = categoryNames[slug || ""] || "बातम्या";

  const articles = allArticles.filter(
    (article) => article.categorySlug === slug
  );

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container py-8">
        <header className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-headline headline-underline inline-block">
            {categoryName}
          </h1>
          <p className="mt-4 text-muted-foreground font-marathi">
            {articles.length} बातम्या सापडल्या
          </p>
        </header>

        {articles.length > 0 ? (
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
