import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/NewsCard";
import { useSearchArticles } from "@/hooks/useArticles";
import logo from "@/assets/logo.png";

const categories = [
  { name: "ताज्या बातम्या", slug: "breaking", nameEn: "Breaking" },
  { name: "राजकारण", slug: "politics", nameEn: "Politics" },
  { name: "व्यापार", slug: "business", nameEn: "Business" },
  { name: "क्रीडा", slug: "sports", nameEn: "Sports" },
  { name: "मनोरंजन", slug: "entertainment", nameEn: "Entertainment" },
  { name: "नाशिक", slug: "local", nameEn: "Local" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults = [], isLoading: searching } = useSearchArticles(searchQuery);
  const navigate = useNavigate();

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const today = new Date().toLocaleDateString("mr-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 bg-card shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <span className="font-marathi">{today}</span>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="p-1 hover:opacity-80 transition-opacity"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="नाशिक एक्सप्रेस" className="h-16 md:h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="px-4 py-2 font-marathi text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); }}
              className="text-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/pdf-archive">
              <Button variant="default" className="hidden sm:flex font-marathi">
                📰 आजचे वृत्तपत्र
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="mt-4 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="बातम्या शोधा..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-border rounded-lg bg-background font-marathi focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            {/* Search Results */}
            {searchQuery.length >= 2 && (
              <div className="mt-2 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {searching ? (
                  <p className="p-4 text-muted-foreground font-marathi text-sm">शोधत आहे...</p>
                ) : searchResults.length > 0 ? (
                  <div className="p-2 space-y-1">
                    {searchResults.slice(0, 5).map((article) => (
                      <Link
                        key={article.id}
                        to={`/article/${article.id}`}
                        className="block p-3 rounded-md hover:bg-muted transition-colors"
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      >
                        <p className="font-headline text-sm font-semibold text-headline line-clamp-1">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="p-4 text-muted-foreground font-marathi text-sm">
                    कोणतेही परिणाम सापडले नाहीत
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden border-t border-border animate-slide-in-right">
          <div className="container py-4 space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="block px-4 py-3 font-marathi text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              to="/pdf-archive"
              className="block px-4 py-3 font-marathi text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              📰 आजचे वृत्तपत्र डाउनलोड करा
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
