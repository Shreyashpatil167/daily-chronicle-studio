import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Upload } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category_id: string | null;
  author_name: string;
  status: string;
  is_featured: boolean;
  is_breaking: boolean;
  read_time: string;
  published_at: string | null;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  name_marathi: string;
}

export const ArticleManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorName, setAuthorName] = useState("संपादक");
  const [status, setStatus] = useState("draft");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [readTime, setReadTime] = useState("३ मिनिटे");
  const [imageUrl, setImageUrl] = useState("");

  const fetchArticles = async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setArticles(data as Article[]);
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");
    if (data) setCategories(data as Category[]);
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategoryId("");
    setAuthorName("संपादक");
    setStatus("draft");
    setIsFeatured(false);
    setIsBreaking(false);
    setReadTime("३ मिनिटे");
    setImageUrl("");
    setEditingArticle(null);
  };

  const openEdit = (article: Article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setCategoryId(article.category_id || "");
    setAuthorName(article.author_name);
    setStatus(article.status);
    setIsFeatured(article.is_featured);
    setIsBreaking(article.is_breaking);
    setReadTime(article.read_time);
    setImageUrl(article.image_url || "");
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("article-images")
      .upload(fileName, file);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data: urlData } = supabase.storage
        .from("article-images")
        .getPublicUrl(fileName);
      setImageUrl(urlData.publicUrl);
      toast({ title: "प्रतिमा अपलोड झाली!" });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    const articleData = {
      title,
      excerpt,
      content,
      image_url: imageUrl || null,
      category_id: categoryId || null,
      author_id: user?.id,
      author_name: authorName,
      status,
      is_featured: isFeatured,
      is_breaking: isBreaking,
      read_time: readTime,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    if (editingArticle) {
      const { error } = await supabase
        .from("articles")
        .update(articleData)
        .eq("id", editingArticle.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "लेख अपडेट झाला!" });
    } else {
      const { error } = await supabase.from("articles").insert(articleData);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "नवीन लेख तयार झाला!" });
    }

    setDialogOpen(false);
    resetForm();
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("हा लेख हटवायचा आहे का?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "लेख हटवला!" });
      fetchArticles();
    }
  };

  const getCategoryName = (catId: string | null) => {
    return categories.find((c) => c.id === catId)?.name_marathi || "—";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-marathi">लेख व्यवस्थापन</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="font-marathi">
              <Plus className="h-4 w-4 mr-1" /> नवीन लेख
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-marathi">
                {editingArticle ? "लेख संपादित करा" : "नवीन लेख"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="शीर्षक"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-marathi text-lg"
              />
              <Textarea
                placeholder="सारांश"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="font-marathi"
                rows={3}
              />
              <Textarea
                placeholder="संपूर्ण लेख..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="font-marathi min-h-[200px]"
                rows={10}
              />

              {/* Image Upload */}
              <div>
                <label className="text-sm font-marathi text-muted-foreground mb-1 block">प्रतिमा</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <label className="cursor-pointer">
                    <Button variant="outline" asChild disabled={uploading}>
                      <span><Upload className="h-4 w-4 mr-1" /> {uploading ? "..." : "अपलोड"}</span>
                    </Button>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                {imageUrl && (
                  <img src={imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-marathi text-muted-foreground mb-1 block">श्रेणी</label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger><SelectValue placeholder="श्रेणी निवडा" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id} className="font-marathi">
                          {cat.name_marathi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-marathi text-muted-foreground mb-1 block">स्थिती</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft" className="font-marathi">मसुदा</SelectItem>
                      <SelectItem value="published" className="font-marathi">प्रकाशित</SelectItem>
                      <SelectItem value="archived" className="font-marathi">संग्रहित</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="लेखक"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="font-marathi"
                />
                <Input
                  placeholder="वाचन वेळ (उदा. ५ मिनिटे)"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="font-marathi"
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 font-marathi text-sm">
                  <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                  मुख्य लेख
                </label>
                <label className="flex items-center gap-2 font-marathi text-sm">
                  <Switch checked={isBreaking} onCheckedChange={setIsBreaking} />
                  ताज्या बातम्या
                </label>
              </div>

              <Button onClick={handleSave} className="w-full font-marathi">
                {editingArticle ? "अपडेट करा" : "तयार करा"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {articles.length === 0 && (
          <p className="text-center text-muted-foreground font-marathi py-10">
            कोणतेही लेख नाहीत. नवीन लेख तयार करा!
          </p>
        )}
        {articles.map((article) => (
          <Card key={article.id}>
            <CardContent className="flex items-center gap-4 p-4">
              {article.image_url && (
                <img src={article.image_url} alt="" className="w-16 h-16 rounded object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-marathi font-semibold truncate">{article.title}</h3>
                <div className="flex gap-2 mt-1">
                  <Badge variant={article.status === "published" ? "default" : "secondary"} className="text-xs">
                    {article.status === "published" ? "प्रकाशित" : article.status === "draft" ? "मसुदा" : "संग्रहित"}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-marathi">
                    {getCategoryName(article.category_id)}
                  </span>
                  {article.is_breaking && <Badge variant="destructive" className="text-xs">ताज्या</Badge>}
                  {article.is_featured && <Badge className="text-xs bg-primary/20 text-primary">मुख्य</Badge>}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(article)}>
                  <Edit className="h-4 w-4" />
                </Button>
                {isAdmin && (
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
