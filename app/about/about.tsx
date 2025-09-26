import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Award, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Vanya Foundation</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Founded with a vision to create lasting positive change, Vanya Foundation has been at the forefront of
              community development, education, and healthcare initiatives across India for over 15 years.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To empower underprivileged communities through sustainable development programs in education,
                  healthcare, and community building, creating opportunities for individuals to break the cycle of
                  poverty and build better futures for themselves and their families.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Eye className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every individual has access to quality education, healthcare, and opportunities for
                  growth, regardless of their socio-economic background. We envision thriving communities where people
                  are empowered to create positive change.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Vanya Foundation was established in 2009 by a group of passionate individuals who witnessed the
                  challenges faced by rural communities in accessing basic necessities like education and healthcare.
                </p>
                <p>
                  What started as a small initiative to support a local school has grown into a comprehensive
                  organization working across multiple states in India, touching the lives of over 50,000 individuals.
                </p>
                <p>
                  Our approach is rooted in community participation and sustainable development. We believe in working
                  with communities, not just for them, ensuring that our programs create lasting impact and empower
                  local leadership.
                </p>
                <p>
                  Today, we continue to expand our reach while maintaining our core values of transparency,
                  accountability, and genuine care for the communities we serve.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/placeholder-gmg62.png"
                alt="Vanya Foundation team and volunteers"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and shape our approach to community development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-muted-foreground text-sm">
                We maintain the highest standards of honesty and transparency in all our operations and communications.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Focus</h3>
              <p className="text-muted-foreground text-sm">
                We prioritize community needs and ensure local participation in all our development programs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Impact</h3>
              <p className="text-muted-foreground text-sm">
                We focus on creating measurable, sustainable change that improves lives and strengthens communities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground text-sm">
                We embrace creative solutions and modern approaches to address traditional challenges effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
