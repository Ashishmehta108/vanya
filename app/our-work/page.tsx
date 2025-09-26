"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Plus, Trash, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useWork } from "@/components/work/work.provider";



export default function OurWorkPageEditor() {
  const [isAdmin, setIsAdmin] = useState(true);

  const {
    isEditing,
    setIsEditing,
    saving,
    setSaving,
    handleSave,
    handleCancel,
    handleImageUpload,
    content,
    setContent,
    updateHero,
    addWorkCard,
    updateWorkCard,
    removeWorkCard,
    addBullet,
    updateBullet,
    removeBullet,
    updateInitiative,
    addInitiative,
    removeInitiative,
    updateCTA,
  } = useWork();

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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={content.workHeroSection?.workHeroHeading || ""}
                onChange={(e) => updateHero("workHeroHeading", e.target.value)}
                placeholder="Hero heading"
              />
              <Textarea
                value={content.workHeroSection?.workHeroDescription || ""}
                onChange={(e) =>
                  updateHero("workHeroDescription", e.target.value)
                }
                rows={3}
                placeholder="Hero description"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "heroImage")}
              />
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4">
                {content.workHeroSection?.workHeroHeading}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {content.workHeroSection?.workHeroDescription}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Work Main Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {(content.workMainSection ?? []).map((card, idx) => (
            <Card key={idx} className="overflow-hidden">
              <div className="aspect-video">
                {isEditing ? (
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, "workMainImage", idx)
                      }
                    />
                    {card.workMainImage && (
                      <img
                        src={card.workMainImage}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={card.workMainImage}
                    alt={card.workMainHeading}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <CardContent className="p-6">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={card.workMainHeading}
                      onChange={(e) =>
                        updateWorkCard(idx, {
                          workMainHeading: e.target.value,
                        })
                      }
                      placeholder="Heading"
                    />
                    <Textarea
                      value={card.workMainDescription}
                      onChange={(e) =>
                        updateWorkCard(idx, {
                          workMainDescription: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Description"
                    />
                    {/* Bullet Points */}
                    <div className="space-y-2">
                      {card.bulletPoints?.map((point, bi) => (
                        <div key={bi} className="flex gap-2 items-center">
                          <Input
                            value={point}
                            onChange={(e) =>
                              updateBullet(idx, bi, e.target.value)
                            }
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeBullet(idx, bi)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => addBullet(idx)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Bullet
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2">
                      {card.workMainHeading}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {card.workMainDescription}
                    </p>
                    <ul className="space-y-1 text-sm">
                      {card.bulletPoints?.map((point, bi) => (
                        <li key={bi} className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="mt-4">
                      <Link href={card.link || "/donate"}>
                        {card.buttonText}
                      </Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}

          {isEditing && (
            <Button onClick={addWorkCard} className="md:col-span-2">
              <Plus className="w-4 h-4 mr-2" /> Add Work Card
            </Button>
          )}
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {content.initiativeSection?.heading}
            </h2>
            <p className="text-muted-foreground">
              {content.initiativeSection?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.initiativeSection?.initiatives ?? []).map((init, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={init.heading}
                        onChange={(e) =>
                          updateInitiative(idx, { heading: e.target.value })
                        }
                        placeholder="Initiative title"
                      />
                      <Textarea
                        value={init.description}
                        onChange={(e) =>
                          updateInitiative(idx, { description: e.target.value })
                        }
                        rows={2}
                        placeholder="Initiative description"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInitiative(idx)}
                      >
                        <Trash className="w-4 h-4 mr-2" /> Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg mb-2">
                        {init.heading}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {init.description}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {isEditing && (
            <div className="mt-6 text-center">
              <Button onClick={addInitiative}>
                <Plus className="w-4 h-4 mr-2" /> Add Initiative
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white text-center">
        {isEditing ? (
          <div className="space-y-4 mb-8">
            <Input
              value={content.ctaSection?.ctaTitle || ""}
              onChange={(e) => updateCTA("ctaTitle", e.target.value)}
              className="text-2xl font-bold bg-white/10 border-white/20 text-white"
              placeholder="CTA title"
            />
            <Textarea
              value={content.ctaSection?.ctaDescription || ""}
              onChange={(e) => updateCTA("ctaDescription", e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              rows={3}
              placeholder="CTA description"
            />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">
              {content.ctaSection?.ctaTitle}
            </h2>
            <p className="text-lg opacity-90 mb-8">
              {content.ctaSection?.ctaDescription}
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/donate">Make a Donation</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            <Link href="/volunteer">Volunteer With Us</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
