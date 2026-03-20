import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/NewsCard";
import { useArticle, useRelatedArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";

const Article = () => {
  const { id } = useParams();
  const { data: article, isLoading } = useArticle(id);
  const { data: relatedArticles = [] } = useRelatedArticles(
    article?.id,
    article?.categorySlug
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background paper-texture">
        <Navbar />
        <main className="container py-8 max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-40" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background paper-texture">
        <Navbar />
        <main className="container py-20 text-center">
          <h1 className="font-headline text-3xl text-headline">बातमी सापडली नाही</h1>
          <p className="mt-4 text-muted-foreground font-marathi">
            आपण शोधत असलेली बातमी उपलब्ध नाही.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container py-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {article.isBreaking && (
                <Badge variant="destructive" className="font-marathi animate-pulse">ताज्या</Badge>
              )}
              <Badge variant="secondary" className="font-marathi">{article.category}</Badge>
            </div>

            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-headline leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-byline border-y border-border py-4">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-marathi">{article.author}</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-marathi">{article.date}</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-marathi">{article.readTime}</span>
              </span>
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon"><Facebook className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Twitter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </header>

          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover" />
          </div>

          <div className="prose prose-lg max-w-none font-body text-foreground">
            <p className="text-xl font-medium leading-relaxed mb-6">{article.excerpt}</p>
            {article.content.split("\n").filter(Boolean).map((para, i) => (
              <p key={i} className="leading-relaxed mb-4">{para}</p>
            ))}
            <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
              "नाशिक एक्सप्रेस - एकमेव स्वतंत्र वृत्तपत्र. आम्ही सत्य आणि निष्पक्ष पत्रकारितेसाठी वचनबद्ध आहोत."
            </blockquote>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-headline text-lg font-semibold mb-3">टॅग्ज:</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="font-marathi">{article.category}</Badge>
              <Badge variant="outline" className="font-marathi">नाशिक</Badge>
              <Badge variant="outline" className="font-marathi">महाराष्ट्र</Badge>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border">
            <h2 className="font-headline text-2xl font-bold text-headline mb-6 headline-underline inline-block">
              संबंधित बातम्या
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <NewsCard key={a.id} {...a} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Article;
