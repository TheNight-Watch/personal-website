"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Clock, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"
import type { Project } from "@/lib/mdx"

interface ProjectDetailContentProps {
  projectEn: Project
  projectZh: Project
}

export function ProjectDetailContent({ projectEn, projectZh }: ProjectDetailContentProps) {
  const { locale, t } = useLanguage()
  
  const project = locale === 'zh' ? projectZh : projectEn

  // Parse markdown content into paragraphs
  const contentParagraphs = project.content.split('\n\n').filter(p => p.trim())

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.common.backToProjects}
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{project.status}</Badge>
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-2">
              {project.name}
            </h1>
            <p className="text-xl text-accent font-medium mb-6">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {project.timeline}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {project.role}
              </span>
            </div>

            {project.links && (
              <div className="flex flex-wrap gap-3">
                {project.links.github && (
                  <Button variant="outline" asChild size="sm" className="gap-2">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      {locale === 'zh' ? '查看 GitHub' : 'View on GitHub'}
                    </a>
                  </Button>
                )}
                {project.links.demo && (
                  <Button asChild size="sm" className="gap-2">
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {locale === 'zh' ? '在线演示' : 'Live Demo'}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description from MDX content */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">
                  {locale === 'zh' ? '项目介绍' : 'About the Project'}
                </h2>
                <div className="prose prose-neutral max-w-none">
                  {contentParagraphs.map((paragraph, index) => {
                    // Handle headers
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h3 key={index} className="font-serif text-xl font-semibold mt-8 mb-3 text-foreground">
                          {paragraph.replace('## ', '')}
                        </h3>
                      )
                    }
                    // Handle lists
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter(line => line.startsWith('- '))
                      return (
                        <ul key={index} className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      )
                    }
                    // Regular paragraphs
                    return (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">
                  {t.common.keyFeatures}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Challenges */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">
                  {t.common.challenges}
                </h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-2 w-2 rounded-full bg-border mt-2 shrink-0" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-lg">{t.common.techStack}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-lg">{t.common.projectDetails}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t.common.status}</p>
                    <p className="text-foreground">{project.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t.common.timeline}</p>
                    <p className="text-foreground">{project.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {locale === 'zh' ? '角色' : 'Role'}
                    </p>
                    <p className="text-foreground">{project.role}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {locale === 'zh' ? '标签' : 'Tags'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-secondary/20 border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4">
              {locale === 'zh' ? '对这个项目感兴趣？' : 'Interested in this project?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {locale === 'zh' 
                ? '我很乐意听取您的想法或讨论潜在的合作。'
                : "I'd love to hear your thoughts or discuss potential collaborations."
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/about#contact">
                  {locale === 'zh' ? '联系我' : 'Get in Touch'}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/projects">
                  {locale === 'zh' ? '查看其他项目' : 'View Other Projects'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
