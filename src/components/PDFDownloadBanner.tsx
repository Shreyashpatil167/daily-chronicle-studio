import { FileDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PDFDownloadBanner = () => {
  const today = new Date().toLocaleDateString("mr-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="gold-accent rounded-2xl p-6 md:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-xl flex items-center justify-center">
            <FileDown className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <div>
            <h3 className="font-headline text-xl md:text-2xl font-bold text-headline">
              आजचे वृत्तपत्र डाउनलोड करा
            </h3>
            <p className="flex items-center gap-2 text-muted-foreground font-marathi mt-1">
              <Calendar className="h-4 w-4" />
              {today}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            size="lg"
            className="font-marathi shadow-lg hover:shadow-xl transition-shadow"
          >
            <FileDown className="mr-2 h-5 w-5" />
            PDF डाउनलोड करा
          </Button>
          <Link to="/pdf-archive">
            <Button
              variant="outline"
              size="lg"
              className="font-marathi border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              संग्रहण पहा
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
