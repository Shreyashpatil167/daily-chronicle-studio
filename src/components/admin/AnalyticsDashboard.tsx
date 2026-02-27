import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Users, TrendingUp } from "lucide-react";

export const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalSubscribers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [articlesRes, publishedRes, subscribersRes] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }).eq("is_active", true),
      ]);

      setStats({
        totalArticles: articlesRes.count ?? 0,
        publishedArticles: publishedRes.count ?? 0,
        draftArticles: (articlesRes.count ?? 0) - (publishedRes.count ?? 0),
        totalSubscribers: subscribersRes.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "एकूण लेख", value: stats.totalArticles, icon: FileText, color: "text-primary" },
    { title: "प्रकाशित", value: stats.publishedArticles, icon: Eye, color: "text-green-600" },
    { title: "मसुदा", value: stats.draftArticles, icon: TrendingUp, color: "text-orange-500" },
    { title: "वृत्तपत्रिका सदस्य", value: stats.totalSubscribers, icon: Users, color: "text-primary" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold font-marathi mb-6">विश्लेषण</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-marathi text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
