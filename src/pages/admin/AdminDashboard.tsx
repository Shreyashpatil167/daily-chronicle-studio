import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FileText, Users, Mail, BarChart3 } from "lucide-react";
import { ArticleManager } from "@/components/admin/ArticleManager";
import { UserManager } from "@/components/admin/UserManager";
import { NewsletterManager } from "@/components/admin/NewsletterManager";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user, role, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-8" />
            </Link>
            <span className="font-marathi text-sm text-muted-foreground">
              व्यवस्थापन पॅनेल
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {user?.email} ({role})
            </span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" /> बाहेर पडा
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Tabs defaultValue="articles">
          <TabsList className="mb-6">
            <TabsTrigger value="articles" className="font-marathi">
              <FileText className="h-4 w-4 mr-1" /> लेख
            </TabsTrigger>
            <TabsTrigger value="users" className="font-marathi">
              <Users className="h-4 w-4 mr-1" /> वापरकर्ते
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="font-marathi">
              <Mail className="h-4 w-4 mr-1" /> वृत्तपत्रिका
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-marathi">
              <BarChart3 className="h-4 w-4 mr-1" /> विश्लेषण
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <ArticleManager />
          </TabsContent>
          <TabsContent value="users">
            <UserManager />
          </TabsContent>
          <TabsContent value="newsletter">
            <NewsletterManager />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
