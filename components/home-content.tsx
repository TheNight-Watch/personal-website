"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Github, Mail, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExperienceSections } from "@/components/experience-sections"
import { siteConfig } from "@/lib/data"
import { useLanguage } from "@/components/language-provider"
import type { ProjectMeta, ArticleMeta, HomeContent as HomeContentType } from "@/lib/mdx"

// Xiaohongshu Icon Component
function XiaohongshuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  )
}

interface HomeContentProps {
  homeDataEn: HomeContentType
  homeDataZh: HomeContentType
  allProjectsEn: ProjectMeta[]
  allProjectsZh: ProjectMeta[]
  featuredArticlesEn: ArticleMeta[]
  featuredArticlesZh: ArticleMeta[]
}

export function HomeContent({ 
  homeDataEn, 
  homeDataZh, 
  allProjectsEn, 
  allProjectsZh,
  featuredArticlesEn,
  featuredArticlesZh 
}: HomeContentProps) {
  const { locale, t } = useLanguage()
  const [wechatCopied, setWechatCopied] = useState(false)
  
  // Select data based on locale
  const homeData = locale === 'zh' ? homeDataZh : homeDataEn
  const allProjects = locale === 'zh' ? allProjectsZh : allProjectsEn
  const featuredArticles = locale === 'zh' ? featuredArticlesZh : featuredArticlesEn
  const featuredProjectSlugs = ["starbridge", "ai-host", "lumi", "deskmas"]
  const projectMap = new Map(allProjects.map((project) => [project.slug, project]))
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projectMap.get(slug))
    .filter((project): project is ProjectMeta => Boolean(project))

  const handleCopyWechat = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.wechatId)
      setWechatCopied(true)
      window.setTimeout(() => setWechatCopied(false), 2000)
    } catch {
      setWechatCopied(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
            {/* Content */}
            <div className="flex-1 max-w-2xl">
              <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
                {homeData.subtitle}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6 text-balance">
                {homeData.name}
              </h1>
              <div className="space-y-4 mb-8">
                {homeData.introduction.map((paragraph) => (
                  <p key={paragraph} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
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

            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-accent/20 shadow-lg">
                <Image
                  src={siteConfig.avatarUrl}
                  alt={homeData.name}
                  width={224}
                  height={224}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              {t.sections.experience}
            </h2>
            <p className="text-muted-foreground">
              {t.sections.experienceDesc}
            </p>
          </div>

          <div className="max-w-4xl">
            <ExperienceSections sections={homeData.experienceSections} />
          </div>

        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Projects Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                {t.sections.projects}
              </h2>
              <p className="text-muted-foreground">
                {t.sections.projectsDesc}
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex gap-2">
              <Link href="/projects">
                {t.common.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-md transition-shadow border-border/60">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-serif text-xl mb-1">{project.name}</CardTitle>
                      <CardDescription className="text-accent font-medium">
                        {project.tagline}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {t.common.learnMore}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Button variant="outline" asChild className="w-full gap-2">
              <Link href="/projects">
                {t.common.viewAllProjects}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Awards Section */}
      <section className="py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              {t.sections.awards}
            </h2>
            <p className="text-muted-foreground">
              {t.sections.awardsDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeData.awards.map((award, index) => (
              <Card key={index} className="border-border/60 bg-card/50">
                <CardContent className="pt-6">
                  <p className="font-medium text-foreground mb-2">{award.name}</p>
                  <p className="text-sm text-muted-foreground">{award.event}</p>
                  <p className="text-xs text-accent mt-2">{award.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                {t.sections.writing}
              </h2>
              <p className="text-muted-foreground">
                {t.sections.writingDesc}
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex gap-2">
              <Link href="/writing">
                {t.common.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-6 max-w-3xl">
            {featuredArticles.slice(0, 2).map((article) => (
              <article key={article.id} className="group">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{article.publication}</span>
                    <span>&middot;</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {article.external && article.externalUrl ? (
                      <a 
                        href={article.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        {article.title}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link href={`/writing/${article.slug}`}>
                        {article.title}
                      </Link>
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator className="mt-6" />
              </article>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Button variant="outline" asChild className="w-full gap-2">
              <Link href="/writing">
                {t.common.viewAllArticles}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-secondary/20 border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              {t.sections.contact}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t.sections.contactDesc}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="gap-2" onClick={handleCopyWechat}>
                <Mail className="h-4 w-4" />
                {wechatCopied
                  ? locale === 'zh'
                    ? '微信号已复制'
                    : 'WeChat ID copied'
                  : locale === 'zh'
                    ? `点击获取微信号：${siteConfig.wechatId}`
                    : `Get WeChat ID: ${siteConfig.wechatId}`}
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
    </>
  )
}
