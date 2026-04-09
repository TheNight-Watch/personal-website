import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WritingDetailContent } from "@/components/writing-detail-content"
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/mdx"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug, 'en')
  
  if (!article) {
    return { title: "Article Not Found" }
  }

  return {
    title: `${article.title} | Haifeng Liu`,
    description: article.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const articleEn = getArticleBySlug(slug, 'en')
  const articleZh = getArticleBySlug(slug, 'zh')

  if (!articleEn || !articleZh) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <WritingDetailContent articleEn={articleEn} articleZh={articleZh} />
      </main>

      <Footer />
    </div>
  )
}
