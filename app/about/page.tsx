import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"
import { getHomeContent } from "@/lib/mdx"

export default function AboutPage() {
  const homeDataEn = getHomeContent('en')
  const homeDataZh = getHomeContent('zh')

  if (!homeDataEn || !homeDataZh) {
    return <div>Content not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <AboutContent homeDataEn={homeDataEn} homeDataZh={homeDataZh} />
      </main>

      <Footer />
    </div>
  )
}
