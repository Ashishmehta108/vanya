"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Plus, Trash, Award, Users, Target, Eye } from "lucide-react";

// Types
interface AboutContent {
  _id?: string;
  aboutSection: {
    aboutHighlightText: string;
    aboutDescription: string;
  };
  mainSection: { heading: string; description: string; _id?: string }[];
  storySection: {
    storyHeading: string;
    storyDescription: string;
    storyImage: string;
  };
  valuesSection: {
    valuesHeading: string;
    valuesDescription: string;
    valuesList: {
      valueHeading: string;
      valueDescription: string;
      _id?: string;
    }[];
  };
}

export default function AboutPageEditor() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<AboutContent | null>(null);

  // Fetch data
  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setContent(data.aboutData));
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      await fetch("/api/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // refetch to reset
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setContent(data.aboutData));
  };

  if (!content) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Admin Controls */}
      {isAdmin && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-primary">
              Edit Page
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </>
          )}
        </div>
      )}

      {/* About Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 text-center">
        {isEditing ? (
          <div className="max-w-2xl mx-auto space-y-4">
            <Input
              value={content.aboutSection.aboutHighlightText}
              onChange={(e) =>
                setContent({
                  ...content,
                  aboutSection: {
                    ...content.aboutSection,
                    aboutHighlightText: e.target.value,
                  },
                })
              }
            />
            <Textarea
              value={content.aboutSection.aboutDescription}
              onChange={(e) =>
                setContent({
                  ...content,
                  aboutSection: {
                    ...content.aboutSection,
                    aboutDescription: e.target.value,
                  },
                })
              }
              rows={3}
            />
          </div>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.aboutSection.aboutHighlightText}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {content.aboutSection.aboutDescription}
            </p>
          </>
        )}
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {content.mainSection.map((item, idx) => (
            <Card key={item._id ?? idx} className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={item.heading}
                      onChange={(e) => {
                        const newMain = [...content.mainSection];
                        newMain[idx].heading = e.target.value;
                        setContent({ ...content, mainSection: newMain });
                      }}
                    />
                    <Textarea
                      value={item.description}
                      onChange={(e) => {
                        const newMain = [...content.mainSection];
                        newMain[idx].description = e.target.value;
                        setContent({ ...content, mainSection: newMain });
                      }}
                      rows={3}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mb-4">
                      {idx === 0 ? (
                        <Target className="w-8 h-8 text-primary mr-3" />
                      ) : (
                        <Eye className="w-8 h-8 text-primary mr-3" />
                      )}
                      <h2 className="text-2xl font-bold">{item.heading}</h2>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-muted/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div>
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={content.storySection.storyHeading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      storySection: {
                        ...content.storySection,
                        storyHeading: e.target.value,
                      },
                    })
                  }
                />
                <Textarea
                  value={content.storySection.storyDescription}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      storySection: {
                        ...content.storySection,
                        storyDescription: e.target.value,
                      },
                    })
                  }
                  rows={6}
                />
                <Input
                  value={content.storySection.storyImage}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      storySection: {
                        ...content.storySection,
                        storyImage: e.target.value,
                      },
                    })
                  }
                />
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  {content.storySection.storyHeading}
                </h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {content.storySection.storyDescription}
                </p>
              </>
            )}
          </div>
          <div>
            <img
              src={content.storySection.storyImage}
              alt="Story"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          {isEditing ? (
            <div className="space-y-3 max-w-2xl mx-auto">
              <Input
                value={content.valuesSection.valuesHeading}
                onChange={(e) =>
                  setContent({
                    ...content,
                    valuesSection: {
                      ...content.valuesSection,
                      valuesHeading: e.target.value,
                    },
                  })
                }
              />
              <Textarea
                value={content.valuesSection.valuesDescription}
                onChange={(e) =>
                  setContent({
                    ...content,
                    valuesSection: {
                      ...content.valuesSection,
                      valuesDescription: e.target.value,
                    },
                  })
                }
              />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">
                {content.valuesSection.valuesHeading}
              </h2>
              <p className="text-muted-foreground">
                {content.valuesSection.valuesDescription}
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {content.valuesSection.valuesList.map((val, idx) => (
            <div key={val._id ?? idx} className="text-center">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={val.valueHeading}
                    onChange={(e) => {
                      const newVals = [...content.valuesSection.valuesList];
                      newVals[idx].valueHeading = e.target.value;
                      setContent({
                        ...content,
                        valuesSection: {
                          ...content.valuesSection,
                          valuesList: newVals,
                        },
                      });
                    }}
                  />
                  <Textarea
                    value={val.valueDescription}
                    onChange={(e) => {
                      const newVals = [...content.valuesSection.valuesList];
                      newVals[idx].valueDescription = e.target.value;
                      setContent({
                        ...content,
                        valuesSection: {
                          ...content.valuesSection,
                          valuesList: newVals,
                        },
                      });
                    }}
                    rows={3}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => {
                      const newVals = content.valuesSection.valuesList.filter(
                        (_, i) => i !== idx
                      );
                      setContent({
                        ...content,
                        valuesSection: {
                          ...content.valuesSection,
                          valuesList: newVals,
                        },
                      });
                    }}
                  >
                    <Trash className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-3">
                    {val.valueHeading}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {val.valueDescription}
                  </p>
                </>
              )}
            </div>
          ))}

          {isEditing && (
            <Button
              onClick={() =>
                setContent({
                  ...content,
                  valuesSection: {
                    ...content.valuesSection,
                    valuesList: [
                      ...content.valuesSection.valuesList,
                      { valueHeading: "", valueDescription: "" },
                    ],
                  },
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" /> Add Value
            </Button>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
