import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container py-8">
        {/* Hero */}
        <section className="text-center mb-12">
          <img
            src={logo}
            alt="नाशिक एक्सप्रेस"
            className="h-24 md:h-32 w-auto mx-auto mb-6"
          />
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-headline mb-4">
            आमच्याबद्दल
          </h1>
          <p className="text-xl text-muted-foreground font-marathi max-w-2xl mx-auto">
            एकमेव स्वतंत्र वृत्तपत्र - नाशिक जिल्ह्यातील अग्रगण्य मराठी वृत्तपत्र
          </p>
        </section>

        {/* Story */}
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="font-headline text-2xl font-bold text-headline mb-6 headline-underline inline-block">
            आमची कथा
          </h2>
          <div className="prose prose-lg font-body text-foreground">
            <p className="leading-relaxed mb-4">
              नाशिक एक्सप्रेस हे नाशिक जिल्ह्यातील सर्वात विश्वसनीय आणि लोकप्रिय मराठी वृत्तपत्र आहे. गेल्या अनेक वर्षांपासून आम्ही नाशिककरांना सत्य, निष्पक्ष आणि विश्वसनीय बातम्या देण्यास प्रतिबद्ध आहोत.
            </p>
            <p className="leading-relaxed mb-4">
              आमची टीम अनुभवी पत्रकारांची आहे जे दररोज नाशिक जिल्ह्यातील घडामोडी तपशीलवार कव्हर करतात. राजकारण, व्यापार, क्रीडा, मनोरंजन, स्थानिक बातम्या - सर्व क्षेत्रांत आम्ही अचूक माहिती देण्यासाठी प्रयत्नशील आहोत.
            </p>
            <p className="leading-relaxed">
              "एकमेव स्वतंत्र वृत्तपत्र" ही आमची ओळख आहे आणि आम्ही या ब्रीदवाक्याला सदैव जगतो.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h3 className="font-headline text-xl font-bold text-headline mb-4">
              आमचे ध्येय
            </h3>
            <p className="font-marathi text-muted-foreground leading-relaxed">
              नाशिक जिल्ह्यातील प्रत्येक नागरिकापर्यंत सत्य आणि विश्वसनीय बातम्या पोहोचवणे हे आमचे प्रमुख ध्येय आहे.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h3 className="font-headline text-xl font-bold text-headline mb-4">
              आमचे स्वप्न
            </h3>
            <p className="font-marathi text-muted-foreground leading-relaxed">
              महाराष्ट्रातील सर्वात विश्वसनीय डिजिटल वृत्तपत्र बनणे आणि पत्रकारितेच्या उच्च मानदंडांचे पालन करणे.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-primary rounded-2xl p-8 text-primary-foreground">
          <h2 className="font-headline text-2xl font-bold mb-8 text-center">
            संपर्क
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">कार्यालय पत्ता</h4>
                  <p className="font-marathi text-primary-foreground/80">
                    नाशिक एक्सप्रेस कार्यालय, मेनरोड, नाशिक - ४२२००१, महाराष्ट्र
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">दूरध्वनी</h4>
                  <p className="text-primary-foreground/80">+91 253 2570XXX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">इमेल</h4>
                  <p className="text-primary-foreground/80">contact@nashikexpress.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">कार्यालयीन वेळ</h4>
                  <p className="font-marathi text-primary-foreground/80">
                    सोमवार ते शनिवार: सकाळी ९ ते सायंकाळी ६
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">आम्हाला संदेश पाठवा</h4>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="आपले नाव"
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-marathi focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  type="email"
                  placeholder="आपला इमेल"
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-marathi focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <textarea
                  placeholder="आपला संदेश"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-marathi focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
                <Button variant="secondary" className="w-full font-marathi">
                  <Send className="mr-2 h-4 w-4" />
                  संदेश पाठवा
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
