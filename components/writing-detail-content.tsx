"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import type { Article } from "@/lib/mdx"

interface WritingDetailContentProps {
  articleEn: Article
  articleZh: Article
}

// Calculate read time based on content length
function calculateReadTime(content: string, locale: string): string {
  const wordsPerMinute = locale === 'zh' ? 400 : 200 // Chinese reads faster
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return locale === 'zh' ? `${minutes} 分钟阅读` : `${minutes} min read`
}

export function WritingDetailContent({ articleEn, articleZh }: WritingDetailContentProps) {
  const { locale, t } = useLanguage()
  
  const article = locale === 'zh' ? articleZh : articleEn

  // If external article, redirect to external URL
  if (article.external && article.externalUrl) {
    redirect(article.externalUrl)
  }

  const readTime = calculateReadTime(article.content, locale)
  
  // Parse markdown content into paragraphs
  const contentParagraphs = article.content.split('\n\n').filter(p => p.trim())

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/writing" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.common.backToWriting}
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-6 text-balance">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readTime}
              </span>
              {article.publication && (
                <span className="text-accent font-medium">
                  {article.publication}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-neutral max-w-none">
              {contentParagraphs.map((paragraph, index) => {
                // Handle headers
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="font-serif text-2xl font-semibold mt-10 mb-4 text-foreground">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="font-serif text-xl font-semibold mt-8 mb-3 text-foreground">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                // Handle bold paragraphs
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={index} className="font-semibold text-foreground mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  )
                }
                // Handle unordered lists
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '))
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  )
                }
                // Handle ordered lists
                if (paragraph.match(/^\d+\.\s/)) {
                  const items = paragraph.split('\n').filter(line => line.match(/^\d+\.\s/))
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 text-muted-foreground mb-4 ml-4">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                      ))}
                    </ol>
                  )
                }
                // Handle horizontal rules / separators
                if (paragraph === '---') {
                  return <Separator key={index} className="my-8" />
                }
                // Handle italic text (for notes)
                if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
                  return (
                    <p key={index} className="text-muted-foreground italic leading-relaxed mb-4">
                      {paragraph.slice(1, -1)}
                    </p>
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
          </article>
        </div>
      </section>

      <Separator className="max-w-3xl mx-auto" />

      {/* Related / Navigation */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-xl font-semibold mb-6">
              {locale === 'zh' ? '继续阅读' : 'Continue Reading'}
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <Link href="/writing">
                  {locale === 'zh' ? '查看所有文章' : 'View All Articles'}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/projects">
                  {locale === 'zh' ? '探索项目' : 'Explore Projects'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
