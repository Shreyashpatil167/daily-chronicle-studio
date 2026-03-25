import { Navbar } from "@/components/Navbar";
import { BreakingNewsTicker } from "@/components/BreakingNewsTicker";
import { NewsCard } from "@/components/NewsCard";
import { PDFDownloadBanner } from "@/components/PDFDownloadBanner";
import { CategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import { useFeaturedArticles, useCategorySectionArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: featured = [], isLoading: featuredLoading } = useFeaturedArticles();
  const { data: politics = [] } = useCategorySectionArticles("politics");
  const { data: sports = [] } = useCategorySectionArticles("sports", 5);
  const { data: business = [] } = useCategorySectionArticles("business");
  const { data: entertainment = [] } = useCategorySectionArticles("entertainment");
  const { data: local = [] } = useCategorySectionArticles("local", 5);

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />
      <BreakingNewsTicker />

      <main className="container py-8">
        {/* Hero Featured Article */}
        <section className="mb-10 animate-fade-in">
          {featuredLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"><Skeleton className="h-[500px] rounded-xl" /></div>
              <div className="space-y-4">
                <Skeleton className="h-60 rounded-xl" />
                <Skeleton className="h-60 rounded-xl" />
              </div>
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NewsCard {...featured[0]} variant="featured" />
              </div>
              <div className="space-y-4">
                {featured.slice(1, 3).map((article) => (
                  <NewsCard key={article.id} {...article} />
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* PDF Download Banner */}
        <section className="mb-10 animate-fade-in-up">
          <PDFDownloadBanner />
        </section>

        {politics.length > 0 && (
          <div className="animate-fade-in-up">
            <CategorySection title="राजकारण" slug="politics" articles={politics} />
          </div>
        )}

        {sports.length > 0 && (
          <div className="animate-fade-in-up">
            <CategorySection title="क्रीडा" slug="sports" articles={sports} layout="list" />
          </div>
        )}

        {business.length > 0 && (
          <div className="animate-fade-in-up">
            <CategorySection title="व्यापार" slug="business" articles={business} />
          </div>
        )}

        {entertainment.length > 0 && (
          <div className="animate-fade-in-up">
            <CategorySection title="मनोरंजन" slug="entertainment" articles={entertainment} />
          </div>
        )}

        {local.length > 0 && (
          <div className="animate-fade-in-up">
            <CategorySection title="नाशिक बातम्या" slug="local" articles={local} layout="list" />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
