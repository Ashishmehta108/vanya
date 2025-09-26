"use client";

import { useState, ChangeEvent } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Heart,
  Tag,
  Clock,
} from "lucide-react";

// Mock initial blog post data
const initialBlogPost = {
  id: 1,
  title: "Transforming Rural Education: Our Digital Literacy Initiative",
  excerpt:
    "How we're bridging the digital divide in rural communities through innovative computer education programs.",
  content: `<p>In today's digital age, access to technology and digital literacy skills are no longer luxuries...</p>`,
  author: "Dr. Priya Sharma",
  date: "2024-01-15",
  category: "Education",
  tags: ["Digital Literacy", "Rural Development", "Technology"],
  image:
    "/placeholder.svg?height=400&width=800&text=Digital+Literacy+Initiative",
  readTime: "5 min read",
};

export default function BlogPostPage() {
  const [blogPost, setBlogPost] = useState(initialBlogPost);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Update any field
  const handleInputChange = (field: string, value: string | boolean) => {
    setBlogPost((prev) => ({ ...prev, [field]: value }));
  };

  // Tags handlers
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...blogPost.tags];
    newTags[index] = value;
    setBlogPost((prev) => ({ ...prev, tags: newTags }));
  };

  const handleAddTag = () =>
    setBlogPost((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  const handleRemoveTag = (index: number) =>
    setBlogPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));

  // Image upload (local preview)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === "string") handleInputChange("image", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Save changes to backend
  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogPost }),
      });
      const data = await res.json();
      if (res.ok) setSaveMessage("Blog saved successfully!");
      else setSaveMessage(data.error || "Failed to save blog.");
    } catch {
      setSaveMessage("Network error. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Back Navigation */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Editable Fields */}
          <div className="flex flex-col gap-4">
            <input
              className="text-3xl md:text-4xl font-bold w-full"
              value={blogPost.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="text-lg p-2 border rounded"
              value={blogPost.excerpt}
              onChange={(e) => handleInputChange("excerpt", e.target.value)}
              placeholder="Excerpt"
            />
            <input
              className="p-2 border rounded"
              value={blogPost.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              placeholder="Category"
            />
            <input
              className="p-2 border rounded"
              value={blogPost.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              placeholder="Author"
            />
            <input
              type="date"
              className="p-2 border rounded"
              value={blogPost.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
            <input
              className="p-2 border rounded"
              value={blogPost.readTime}
              onChange={(e) => handleInputChange("readTime", e.target.value)}
              placeholder="Read Time"
            />
          </div>

          {/* Image */}
          <div className="aspect-video relative mb-6">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-full object-cover rounded"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute bottom-2 left-2 bg-white p-1 text-xs rounded"
              onChange={handleImageUpload}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 items-center">
            {blogPost.tags.map((tag, i) => (
              <div key={i} className="flex items-center gap-1">
                <input
                  className="border p-1 rounded text-sm"
                  value={tag}
                  onChange={(e) => handleTagChange(i, e.target.value)}
                  placeholder="Tag"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveTag(i)}
                >
                  &times;
                </Button>
              </div>
            ))}
            <Button size="sm" onClick={handleAddTag}>
              + Add Tag
            </Button>
          </div>

          {/* Content */}
          <textarea
            className="w-full border rounded p-4 h-96"
            value={blogPost.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
          />

          {/* Save Button */}
          <div className="flex items-center gap-4 mt-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            {saveMessage && <span>{saveMessage}</span>}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
