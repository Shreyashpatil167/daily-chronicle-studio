import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Subscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

export const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      if (data) setSubscribers(data as Subscriber[]);
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-marathi">वृत्तपत्रिका सदस्य</h2>
        <Badge variant="secondary" className="text-lg px-4 py-1">
          {subscribers.length} सदस्य
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ईमेल</TableHead>
                <TableHead>स्थिती</TableHead>
                <TableHead>सदस्यत्व तारीख</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.email}</TableCell>
                  <TableCell>
                    <Badge variant={sub.is_active ? "default" : "secondary"}>
                      {sub.is_active ? "सक्रिय" : "निष्क्रिय"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(sub.subscribed_at).toLocaleDateString("mr-IN")}
                  </TableCell>
                </TableRow>
              ))}
              {subscribers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center font-marathi text-muted-foreground py-8">
                    अद्याप कोणतेही सदस्य नाहीत.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
