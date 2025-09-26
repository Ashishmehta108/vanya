"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

// Initial blogs (replace with fetching from /api/blog if needed)
const initialBlogPosts = [
  {
    id: "665a6377-85ac-4fba-8571-feb9817dabca",
    title: "Transforming Rural Education",
    excerpt: "Bridging digital divide in rural communities.",
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    category: "Education",
    tags: ["Digital Literacy", "Rural Development"],
    image: "/placeholder.svg",
    featured: true,
    readTime: "5 min read",
  },
  {
    id: "38fcbcc6-0dc6-463e-9e6e-d8add8d997f8",
    title: "2023 Impact Report",
    excerpt: "Reflecting on our achievements in 2023.",
    author: "Vanya Foundation Team",
    date: "2023-12-31",
    category: "Impact Report",
    tags: ["Annual Report", "Impact"],
    image: "/placeholder.svg",
    featured: true,
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Update field
  const handleInputChange = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    setBlogPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, [field]: value } : post))
    );
  };

  // Handle tags
  const handleTagChange = (id: string, index: number, value: string) => {
    setBlogPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const newTags = [...post.tags];
          newTags[index] = value;
          return { ...post, tags: newTags };
        }
        return post;
      })
    );
  };

  const handleAddTag = (id: string) => {
    setBlogPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, tags: [...post.tags, ""] } : post
      )
    );
  };

  const handleRemoveTag = (id: string, index: number) => {
    setBlogPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const newTags = post.tags.filter((_, i) => i !== index);
          return { ...post, tags: newTags };
        }
        return post;
      })
    );
  };

  // Handle image upload locally
  const handleImageUpload = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === "string") {
        handleInputChange(id, "image", dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add new blog
  const handleAddBlog = () => {
    const newBlog = {
      id: crypto.randomUUID(),
      title: "",
      excerpt: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      tags: [],
      image: "/placeholder.svg",
      featured: false,
      readTime: "0 min read",
    };
    setBlogPosts((prev) => [newBlog, ...prev]);
  };

  // Save all blogs to backend
  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogPosts }),
      });

      const result = await response.json();
      if (response.ok) {
        setSaveMessage("Blogs saved successfully!");
      } else {
        setSaveMessage(result.error || "Failed to save blogs.");
      }
    } catch (err) {
      setSaveMessage("Network error. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Separate featured and latest
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const latestPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-16 text-center bg-gradient-to-r from-primary/10 to-primary/5">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Stories</h1>
        <Button onClick={handleAddBlog} className="mb-4">
          + Add New Blog
        </Button>
        <Button onClick={handleSaveAll} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
        {saveMessage && <p className="mt-2 text-sm">{saveMessage}</p>}
      </section>

      {/* Featured Blogs */}
      {featuredPosts.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id}>
                <div className="aspect-video relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute bottom-2 left-2 bg-white p-1 text-xs rounded"
                    onChange={(e) => handleImageUpload(post.id, e)}
                  />
                </div>
                <CardContent className="p-6 space-y-2">
                  <Input
                    value={post.title}
                    onChange={(e) =>
                      handleInputChange(post.id, "title", e.target.value)
                    }
                    placeholder="Title"
                    className="font-bold text-lg"
                  />
                  <Input
                    value={post.excerpt}
                    onChange={(e) =>
                      handleInputChange(post.id, "excerpt", e.target.value)
                    }
                    placeholder="Excerpt"
                  />
                  <Input
                    value={post.category}
                    onChange={(e) =>
                      handleInputChange(post.id, "category", e.target.value)
                    }
                    placeholder="Category"
                  />
                  <Input
                    value={post.author}
                    onChange={(e) =>
                      handleInputChange(post.id, "author", e.target.value)
                    }
                    placeholder="Author"
                  />
                  <Input
                    type="date"
                    value={post.date}
                    onChange={(e) =>
                      handleInputChange(post.id, "date", e.target.value)
                    }
                  />
                  <Input
                    value={post.readTime}
                    onChange={(e) =>
                      handleInputChange(post.id, "readTime", e.target.value)
                    }
                    placeholder="Read Time"
                  />

                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <Input
                          value={tag}
                          onChange={(e) =>
                            handleTagChange(post.id, i, e.target.value)
                          }
                          placeholder="Tag"
                          className="w-24 text-xs"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveTag(post.id, i)}
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={() => handleAddTag(post.id)}>
                      + Add Tag
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      type="checkbox"
                      checked={post.featured}
                      onChange={(e) =>
                        handleInputChange(post.id, "featured", e.target.checked)
                      }
                    />
                    <span>Featured</span>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {post.date}
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-primary flex items-center gap-1"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Latest Blogs */}
      <section className="py-16 bg-muted/30 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Card key={post.id}>
              <div className="aspect-video relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute bottom-2 left-2 bg-white p-1 text-xs rounded"
                  onChange={(e) => handleImageUpload(post.id, e)}
                />
              </div>
              <CardContent className="p-6 space-y-2">
                <Input
                  value={post.title}
                  onChange={(e) =>
                    handleInputChange(post.id, "title", e.target.value)
                  }
                  placeholder="Title"
                  className="font-bold text-lg"
                />
                <Input
                  value={post.excerpt}
                  onChange={(e) =>
                    handleInputChange(post.id, "excerpt", e.target.value)
                  }
                  placeholder="Excerpt"
                />
                <Input
                  value={post.category}
                  onChange={(e) =>
                    handleInputChange(post.id, "category", e.target.value)
                  }
                  placeholder="Category"
                />
                <Input
                  value={post.author}
                  onChange={(e) =>
                    handleInputChange(post.id, "author", e.target.value)
                  }
                  placeholder="Author"
                />
                <Input
                  type="date"
                  value={post.date}
                  onChange={(e) =>
                    handleInputChange(post.id, "date", e.target.value)
                  }
                />
                <Input
                  value={post.readTime}
                  onChange={(e) =>
                    handleInputChange(post.id, "readTime", e.target.value)
                  }
                  placeholder="Read Time"
                />

                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <Input
                        value={tag}
                        onChange={(e) =>
                          handleTagChange(post.id, i, e.target.value)
                        }
                        placeholder="Tag"
                        className="w-24 text-xs"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveTag(post.id, i)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" onClick={() => handleAddTag(post.id)}>
                    + Add Tag
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    checked={post.featured}
                    onChange={(e) =>
                      handleInputChange(post.id, "featured", e.target.checked)
                    }
                  />
                  <span>Featured</span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {post.date}
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary flex items-center gap-1"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
