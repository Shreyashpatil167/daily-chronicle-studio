import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  user_id: string;
  display_name: string;
  role: string;
}

export const UserManager = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const fetchUsers = async () => {
    // Join profiles with roles
    const { data: profiles } = await supabase.from("profiles").select("user_id, display_name");
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");

    if (profiles && roles) {
      const merged = profiles.map((p: any) => ({
        ...p,
        role: roles.find((r: any) => r.user_id === p.user_id)?.role || "user",
      }));
      setUsers(merged);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (userId: string, newRole: "admin" | "editor" | "user") => {
    const { error } = await supabase
      .from("user_roles")
      .update({ role: newRole })
      .eq("user_id", userId);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "भूमिका अपडेट झाली!" });
      fetchUsers();
    }
  };

  if (!isAdmin) {
    return <p className="text-center text-muted-foreground font-marathi py-10">फक्त प्रशासकांना प्रवेश आहे.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold font-marathi mb-6">वापरकर्ते व्यवस्थापन</h2>
      <div className="space-y-3">
        {users.map((u) => (
          <Card key={u.user_id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-marathi font-semibold">{u.display_name}</p>
                <Badge variant="secondary" className="text-xs mt-1">{u.role}</Badge>
              </div>
              <Select value={u.role} onValueChange={(val: string) => updateRole(u.user_id, val as "admin" | "editor" | "user")}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
