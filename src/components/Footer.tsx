import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, LogIn, LayoutDashboard, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
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
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const { toast } = useToast();
  const { user, isEditor, signOut } = useAuth();

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toast({ title: "कृपया वैध ईमेल प्रविष्ट करा", variant: "destructive" });
      return;
    }
    setSubscribing(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    if (error) {
      if (error.code === "23505") {
        toast({ title: "तुम्ही आधीच सदस्य आहात!" });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "सदस्यत्व यशस्वी! 🎉" });
      setEmail("");
    }
    setSubscribing(false);
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-marathi flex-1 md:w-64 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button variant="secondary" className="font-marathi px-6" onClick={handleSubscribe} disabled={subscribing}>
                {subscribing ? "..." : "सदस्यता"}
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
              <a href="https://www.facebook.com/share/1CgsNWg2bs/" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/ExpressNashik" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/nashikexpress_?igsh=MXU0aTh0am1mMnZleQ==" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://whatsapp.com/channel/0029VbAqfCg2ER6q4QigIM0Z" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
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
                  Ronak Heights, Raccca Colony, Sharanpur Road, Nashik 422005
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <a href="tel:+919405600057" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  +91 94056 00057
                </a>
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
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-secondary transition-colors">
                गोपनीयता धोरण
              </Link>
              <Link to="/terms" className="hover:text-secondary transition-colors">
                नियम व अटी
              </Link>
              <span className="border-l border-primary-foreground/20 h-4" />
              {user ? (
                <span className="flex items-center gap-3">
                  {isEditor && (
                    <Link to="/admin" className="hover:text-secondary transition-colors flex items-center gap-1">
                      <LayoutDashboard className="h-3.5 w-3.5" /> Admin
                    </Link>
                  )}
                  <button onClick={() => signOut()} className="hover:text-secondary transition-colors">
                    Logout
                  </button>
                </span>
              ) : (
                <Link to="/login" className="hover:text-secondary transition-colors flex items-center gap-1">
                  <LogIn className="h-3.5 w-3.5" /> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
