import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileDown, Calendar, FileText } from "lucide-react";
import { pdfArchive } from "@/data/newsData";

const PDFArchive = () => {
  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container py-8">
        <header className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-headline headline-underline inline-block">
            वृत्तपत्र संग्रहण
          </h1>
          <p className="mt-4 text-muted-foreground font-marathi">
            मागील आवृत्त्या डाउनलोड करा
          </p>
        </header>

        {/* Today's Edition Highlight */}
        <section className="mb-10">
          <div className="gold-accent rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold text-headline">
                    आजची आवृत्ती
                  </h2>
                  <p className="flex items-center gap-2 text-muted-foreground font-marathi mt-1">
                    <Calendar className="h-4 w-4" />
                    {pdfArchive[0].date}
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="font-marathi shadow-lg hover:shadow-xl transition-shadow"
              >
                <FileDown className="mr-2 h-5 w-5" />
                PDF डाउनलोड करा ({pdfArchive[0].size})
              </Button>
            </div>
          </div>
        </section>

        {/* Archive Grid */}
        <section>
          <h2 className="font-headline text-2xl font-bold text-headline mb-6">
            मागील आवृत्त्या
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pdfArchive.slice(1).map((pdf, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-marathi font-semibold text-headline">
                      {pdf.date}
                    </p>
                    <p className="text-sm text-muted-foreground">{pdf.size}</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-marathi">
                    <FileDown className="mr-2 h-4 w-4" />
                    डाउनलोड
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subscription CTA */}
        <section className="mt-12 bg-primary rounded-2xl p-8 text-center text-primary-foreground">
          <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">
            रोज नवीन आवृत्ती मिळवा
          </h2>
          <p className="font-marathi mb-6 text-primary-foreground/80 max-w-2xl mx-auto">
            आमच्या वृत्तपत्रिकेचे सदस्य व्हा आणि दररोज सकाळी नवीन आवृत्ती थेट आपल्या इमेलवर मिळवा.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="आपला इमेल प्रविष्ट करा"
              className="px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-marathi flex-1 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <Button variant="secondary" className="font-marathi px-6">
              सदस्यता घ्या
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PDFArchive;
