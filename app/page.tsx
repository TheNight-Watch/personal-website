import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HomeContent } from "@/components/home-content"
import { getHomeContent, getAllProjectsMeta, getFeaturedArticles } from "@/lib/mdx"

export default function HomePage() {
  // Fetch both language versions on the server
  const homeDataEn = getHomeContent('en')
  const homeDataZh = getHomeContent('zh')
  const allProjectsEn = getAllProjectsMeta('en')
  const allProjectsZh = getAllProjectsMeta('zh')
  const featuredArticlesEn = getFeaturedArticles('en')
  const featuredArticlesZh = getFeaturedArticles('zh')

  // Provide fallback if content is not available
  if (!homeDataEn || !homeDataZh) {
    return <div>Content not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HomeContent 
          homeDataEn={homeDataEn}
          homeDataZh={homeDataZh}
          allProjectsEn={allProjectsEn}
          allProjectsZh={allProjectsZh}
          featuredArticlesEn={featuredArticlesEn}
          featuredArticlesZh={featuredArticlesZh}
        />
      </main>

      <Footer />
    </div>
  )
}
