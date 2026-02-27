import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "यशस्वी!", description: "कृपया तुमचा ईमेल तपासा आणि सत्यापित करा." });
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "लॉगिन अयशस्वी", description: error.message, variant: "destructive" });
      } else {
        navigate("/admin");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={logo} alt="नाशिक एक्सप्रेस" className="h-12 mx-auto mb-4" />
          <CardTitle className="font-marathi text-2xl">
            {isSignUp ? "नोंदणी करा" : "लॉगिन करा"}
          </CardTitle>
          <CardDescription className="font-marathi">
            {isSignUp ? "नवीन खाते तयार करा" : "तुमच्या खात्यात प्रवेश करा"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                placeholder="तुमचे नाव"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="font-marathi"
              />
            )}
            <Input
              type="email"
              placeholder="ईमेल"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="पासवर्ड"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Button type="submit" className="w-full font-marathi" disabled={loading}>
              {loading ? "कृपया प्रतीक्षा करा..." : isSignUp ? "नोंदणी करा" : "लॉगिन करा"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline font-marathi"
            >
              {isSignUp ? "आधीच खाते आहे? लॉगिन करा" : "नवीन खाते तयार करा"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
