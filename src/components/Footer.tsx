import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const categories = [
  { name: "ताज्या बातम्या", slug: "breaking" },
  { name: "राजकारण", slug: "politics" },
  { name: "व्यापार", slug: "business" },
  { name: "क्रीडा", slug: "sports" },
  { name: "मनोरंजन", slug: "entertainment" },
  { name: "नाशिक", slug: "local" },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-headline text-2xl font-bold">वृत्तपत्रिका सदस्यता</h3>
              <p className="font-marathi mt-1 text-primary-foreground/80">
                रोजच्या ताज्या बातम्या थेट आपल्या इमेलवर मिळवा
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="आपला इमेल प्रविष्ट करा"
                className="px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-marathi flex-1 md:w-64 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button variant="secondary" className="font-marathi px-6">
                सदस्यता
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="नाशिक एक्सप्रेस"
              className="h-16 w-auto mb-4 bg-card rounded-lg p-2"
            />
            <p className="font-marathi text-primary-foreground/80 leading-relaxed">
              नाशिक एक्सप्रेस - एकमेव स्वतंत्र वृत्तपत्र. नाशिक जिल्ह्यातील अग्रगण्य मराठी वृत्तपत्र.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-headline text-lg font-bold mb-4">विभाग</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="font-marathi text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline text-lg font-bold mb-4">जलद दुवे</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="font-marathi text-primary-foreground/80 hover:text-secondary transition-colors">
                  आमच्याबद्दल
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-marathi text-primary-foreground/80 hover:text-secondary transition-colors">
                  संपर्क
                </Link>
              </li>
              <li>
                <Link to="/pdf-archive" className="font-marathi text-primary-foreground/80 hover:text-secondary transition-colors">
                  PDF संग्रहण
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="font-marathi text-primary-foreground/80 hover:text-secondary transition-colors">
                  जाहिरात द्या
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-headline text-lg font-bold mb-4">संपर्क</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="font-marathi text-primary-foreground/80">
                  नाशिक एक्सप्रेस कार्यालय, मेनरोड, नाशिक - ४२२००१
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span className="font-marathi text-primary-foreground/80">
                  +91 253 2570XXX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <span className="text-primary-foreground/80">
                  contact@nashikexpress.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p className="font-marathi">
              © {new Date().getFullYear()} नाशिक एक्सप्रेस. सर्व हक्क राखीव.
            </p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-secondary transition-colors">
                गोपनीयता धोरण
              </Link>
              <Link to="/terms" className="hover:text-secondary transition-colors">
                नियम व अटी
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
