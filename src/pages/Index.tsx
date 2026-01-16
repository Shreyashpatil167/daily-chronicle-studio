import { Navbar } from "@/components/Navbar";
import { BreakingNewsTicker } from "@/components/BreakingNewsTicker";
import { NewsCard } from "@/components/NewsCard";
import { PDFDownloadBanner } from "@/components/PDFDownloadBanner";
import { CategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";
import {
  featuredArticles,
  politicsArticles,
  sportsArticles,
  businessArticles,
  entertainmentArticles,
  localArticles,
} from "@/data/newsData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />
      <BreakingNewsTicker />

      <main className="container py-8">
        {/* Hero Featured Article */}
        <section className="mb-10 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NewsCard {...featuredArticles[0]} variant="featured" />
            </div>
            <div className="space-y-4">
              {featuredArticles.slice(1, 3).map((article) => (
                <NewsCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* PDF Download Banner */}
        <section className="mb-10 animate-fade-in-up">
          <PDFDownloadBanner />
        </section>

        {/* Politics Section */}
        <div className="animate-fade-in-up">
          <CategorySection
            title="राजकारण"
            slug="politics"
            articles={politicsArticles}
          />
        </div>

        {/* Sports Section */}
        <div className="animate-fade-in-up">
          <CategorySection
            title="क्रीडा"
            slug="sports"
            articles={sportsArticles}
            layout="list"
          />
        </div>

        {/* Business Section */}
        <div className="animate-fade-in-up">
          <CategorySection
            title="व्यापार"
            slug="business"
            articles={businessArticles}
          />
        </div>

        {/* Entertainment Section */}
        <div className="animate-fade-in-up">
          <CategorySection
            title="मनोरंजन"
            slug="entertainment"
            articles={entertainmentArticles}
          />
        </div>

        {/* Local News Section */}
        <div className="animate-fade-in-up">
          <CategorySection
            title="नाशिक बातम्या"
            slug="local"
            articles={localArticles}
            layout="list"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
