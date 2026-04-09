"use client"

import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import type { ProjectMeta } from "@/lib/mdx"

interface ProjectsContentProps {
  currentProjectsEn: ProjectMeta[]
  currentProjectsZh: ProjectMeta[]
  sideProjectsEn: ProjectMeta[]
  sideProjectsZh: ProjectMeta[]
}

export function ProjectsContent({ 
  currentProjectsEn, 
  currentProjectsZh,
  sideProjectsEn,
  sideProjectsZh
}: ProjectsContentProps) {
  const { locale, t } = useLanguage()
  
  const currentProjects = locale === 'zh' ? currentProjectsZh : currentProjectsEn
  const sideProjects = locale === 'zh' ? sideProjectsZh : sideProjectsEn

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
              {t.common.allProjects}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === 'zh' 
                ? '我构建或正在进行的项目集合。从 AI 辅助工具到教育平台，每个项目都代表着我用技术创造有意义影响的信念。'
                : 'A collection of projects I\'ve built or am currently working on. From AI-powered accessibility tools to educational platforms, each project represents my belief in using technology to create meaningful impact.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-semibold tracking-tight mb-2">
              {t.common.currentFocus}
            </h2>
            <p className="text-muted-foreground">
              {locale === 'zh' ? '我目前投入大部分时间的活跃项目' : 'Active projects I\'m dedicating most of my time to'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group">
                <Card className="h-full hover:shadow-md transition-all border-border/60 group-hover:border-accent/40">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-serif text-xl mb-1 group-hover:text-accent transition-colors">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="text-accent font-medium">
                          {project.tagline}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">
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
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {t.common.learnMore}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Side Projects */}
      <section className="py-12 md:py-16 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-semibold tracking-tight mb-2">
              {t.common.sideProjects}
            </h2>
            <p className="text-muted-foreground">
              {t.common.sideProjectsDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sideProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group">
                <Card className="h-full hover:shadow-md transition-all border-border/60 bg-card/50 group-hover:border-accent/40">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="py-12 md:py-16 border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4">
              {locale === 'zh' ? '更多项目在 GitHub' : 'More on GitHub'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {locale === 'zh' 
                ? '探索更多我的作品，包括开源贡献和实验项目。'
                : 'Explore more of my work, including open source contributions and experimental projects.'
              }
            </p>
            <a 
              href="https://github.com/TheNight-Watch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors font-medium"
            >
              {locale === 'zh' ? '访问我的 GitHub' : 'Visit my GitHub profile'}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
