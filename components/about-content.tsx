"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Mail, MapPin, GraduationCap, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/lib/data"
import { useLanguage } from "@/components/language-provider"
import type { HomeContent } from "@/lib/mdx"

// Xiaohongshu Icon Component
function XiaohongshuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  )
}

interface AboutContentProps {
  homeDataEn: HomeContent
  homeDataZh: HomeContent
}

export function AboutContent({ homeDataEn, homeDataZh }: AboutContentProps) {
  const { locale, t } = useLanguage()
  
  const homeData = locale === 'zh' ? homeDataZh : homeDataEn

  return (
    <>
      {/* Header / Introduction */}
      <section className="py-12 md:py-20 border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
                {t.common.aboutMe}
              </h1>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {locale === 'zh' ? (
                  <>
                    <p className="text-lg">
                      我是<span className="text-foreground font-medium">{homeData.name}</span>，
                      清华大学智能工程与创新设计专业学生，拥有自动化+设计跨学科背景。
                    </p>
                    
                    <p>
                      我喜欢设计和构建产品。我的方法是将工程实现能力与产品思维相结合——
                      本质上是一个具有工程实现能力的产品经理。
                    </p>
                    
                    <p>
                      我的旅程从领导清华创业协会到前往深圳创业。
                      一路上，我组织了黑客松，构建了 AI 产品，学到了无数关于如何创造有意义的技术的经验。
                    </p>
                    
                    <p className="text-foreground font-medium italic border-l-2 border-accent pl-4">
                      在 AGI 来临之前为世界创造价值
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg">
                      I&apos;m <span className="text-foreground font-medium">{homeData.name}</span>, 
                      an Intelligent Engineering student at Tsinghua University with an
                      Automation + Design cross-disciplinary background.
                    </p>
                    
                    <p>
                      I like to design and build things. My approach combines engineering implementation skills with 
                      product thinking—I&apos;m essentially a Product PM with engineering implementation skills.
                    </p>
                    
                    <p>
                      My journey has taken me from leading the Tsinghua Entrepreneurship Association to 
                      venturing out to Shenzhen for a startup experience. Along the way, I&apos;ve organized 
                      hackathons, built AI products, and learned countless lessons about what it takes 
                      to create meaningful technology.
                    </p>
                    
                    <p className="text-foreground font-medium italic border-l-2 border-accent pl-4">
                      Create value for the world before AGI is achieved
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Quick Info Card */}
            <Card className="border-border/60">
              <CardContent className="pt-6 space-y-4">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent/20">
                    <Image
                      src={siteConfig.avatarUrl}
                      alt={homeData.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">{locale === 'zh' ? '教育' : 'Education'}</p>
                    <p className="text-foreground">{locale === 'zh' ? '清华大学' : 'Tsinghua University'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">{locale === 'zh' ? '位置' : 'Location'}</p>
                    <p className="text-foreground">{locale === 'zh' ? '中国北京' : 'Beijing, China'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">{locale === 'zh' ? '专注领域' : 'Focus'}</p>
                    <p className="text-foreground">{locale === 'zh' ? 'AI 产品' : 'AI Products'}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild size="sm" className="w-full justify-start gap-2">
                    <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild size="sm" className="w-full justify-start gap-2">
                    <a href={`mailto:${siteConfig.email}`}>
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  </Button>
                  <Button variant="outline" asChild size="sm" className="w-full justify-start gap-2">
                    <a href={siteConfig.xiaohongshuUrl} target="_blank" rel="noopener noreferrer">
                      <XiaohongshuIcon className="h-4 w-4" />
                      {locale === 'zh' ? '小红书' : 'Xiaohongshu'}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            {locale === 'zh' ? '经历与旅程' : 'Experience & Journey'}
          </h2>

          <div className="max-w-3xl space-y-10">
            {homeData.experience.map((item, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-border/80">
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-accent" />
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h3 className="font-semibold text-lg text-foreground">{item.role}</h3>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {item.period}
                    </Badge>
                  </div>
                  <p className="text-accent font-medium">{item.organization}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Events Hosted */}
      <section className="py-12 md:py-16 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            {t.common.eventsHosted}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {homeData.eventsHosted.map((event, index) => (
              <Card key={index} className="border-border/60 bg-card/50">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="w-fit text-xs mb-2">
                    {event.type}
                  </Badge>
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            {t.sections.awards}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {homeData.awards.map((award, index) => (
              <Card key={index} className="border-border/60">
                <CardContent className="pt-6">
                  <p className="font-semibold text-foreground mb-2">{award.name}</p>
                  <p className="text-sm text-muted-foreground">{award.event}</p>
                  <p className="text-xs text-accent mt-2">{award.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Tech Stack */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            {t.common.technicalStack}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {homeData.techStack.map((category, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-16 bg-secondary/20 border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              {t.sections.contact}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t.sections.contactDesc}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button asChild className="gap-2">
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail className="h-4 w-4" />
                  {t.common.emailMe}
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a href={siteConfig.xiaohongshuUrl} target="_blank" rel="noopener noreferrer">
                  <XiaohongshuIcon className="h-4 w-4" />
                  {locale === 'zh' ? '小红书' : 'Xiaohongshu'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4">
              {locale === 'zh' ? '探索我的作品' : 'Explore My Work'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {locale === 'zh' 
                ? '查看我的项目和文章，了解我一直在构建和思考的内容。'
                : 'Check out my projects and writing to see what I\'ve been building and thinking about.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/projects">{t.nav.projects}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/writing">{t.nav.writing}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
