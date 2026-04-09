import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WritingContent } from "@/components/writing-content"
import { getAllArticlesMeta } from "@/lib/mdx"

export default function WritingPage() {
  const articlesEn = getAllArticlesMeta('en')
  const articlesZh = getAllArticlesMeta('zh')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <WritingContent articlesEn={articlesEn} articlesZh={articlesZh} />
      </main>

      <Footer />
    </div>
  )
}
