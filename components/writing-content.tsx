"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"
import { siteConfig } from "@/lib/data"
import type { ArticleMeta } from "@/lib/mdx"

// Xiaohongshu Icon Component
function XiaohongshuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
  )
}

interface WritingContentProps {
  articlesEn: ArticleMeta[]
  articlesZh: ArticleMeta[]
}

export function WritingContent({ articlesEn, articlesZh }: WritingContentProps) {
  const { locale, t } = useLanguage()
  
  const articles = locale === 'zh' ? articlesZh : articlesEn
  
  // Separate external articles from internal blog posts
  const externalArticles = articles.filter(a => a.external)
  const blogPosts = articles.filter(a => !a.external)

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
              {t.common.articles}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === 'zh'
                ? '关于 AI、技术、商业模式和产品构建之旅的思考。我分享来自创业、黑客松和探索技术与人类需求交汇点的经历反思。'
                : 'Thoughts on AI, technology, business models, and the journey of building products. I share reflections from my experiences in entrepreneurship, hackathons, and exploring the intersection of technology and human needs.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Published Articles */}
      {externalArticles.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight mb-2">
                {locale === 'zh' ? '发表文章' : 'Published Articles'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'zh' ? '在外部刊物发表的文章' : 'Articles published in external publications'}
              </p>
            </div>

            <div className="max-w-3xl space-y-8">
              {externalArticles.map((article) => (
                <article key={article.id} className="group">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-accent">{article.publication}</span>
                      <span>&middot;</span>
                      <span>{article.date}</span>
                    </div>
                    
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      <a 
                        href={article.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        {article.title}
                        <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator className="mt-8" />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight mb-2">
                {locale === 'zh' ? '博客文章' : 'Blog Posts'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'zh' ? '个人反思与见解' : 'Personal reflections and insights'}
              </p>
            </div>

            <div className="max-w-3xl space-y-8">
              {blogPosts.map((article) => (
                <article key={article.id} className="group">
                  <Link href={`/writing/${article.slug}`} className="block">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{article.date}</span>
                      </div>
                      
                      <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                  <Separator className="mt-8" />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Topics */}
      <section className="py-12 md:py-16 border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold tracking-tight mb-6">
              {locale === 'zh' ? '我写作的主题' : 'Topics I Write About'}
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {(locale === 'zh' 
                ? ["AI", "技术", "创业", "产品开发", "商业模式", "黑客松", "社区建设", "学习"]
                : ["AI", "Technology", "Entrepreneurship", "Product Development", "Business Models", "Hackathons", "Community Building", "Learning"]
              ).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-sm py-1.5 px-3">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe / Follow CTA */}
      <section className="py-12 md:py-16 bg-secondary/20 border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4">
              {locale === 'zh' ? '保持更新' : 'Stay Updated'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {locale === 'zh'
                ? '我经常在小红书上分享想法和见解。欢迎关注并加入讨论。'
                : 'I regularly share thoughts and insights on Xiaohongshu (Little Red Book). Feel free to follow along and join the discussion.'
              }
            </p>
            <a 
              href={siteConfig.xiaohongshuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors font-medium"
            >
              <XiaohongshuIcon className="h-5 w-5" />
              {locale === 'zh' ? '关注小红书' : 'Follow on Xiaohongshu'}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
