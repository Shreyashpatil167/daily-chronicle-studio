import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: "admin" | "editor";
}

export const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { user, loading, isAdmin, isEditor } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-marathi text-muted-foreground">लोड करत आहे...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (requireRole === "admin" && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-marathi text-destructive text-xl">तुम्हाला या पृष्ठावर प्रवेश नाही.</p>
      </div>
    );
  }

  if (requireRole === "editor" && !isEditor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-marathi text-destructive text-xl">तुम्हाला या पृष्ठावर प्रवेश नाही.</p>
      </div>
    );
  }

  return <>{children}</>;
};
