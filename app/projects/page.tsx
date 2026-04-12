import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectsContent } from "@/components/projects-content"
import { getAllProjectsMeta } from "@/lib/mdx"

export default function ProjectsPage() {
  const allProjectsEn = getAllProjectsMeta('en')
  const allProjectsZh = getAllProjectsMeta('zh')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <ProjectsContent 
          allProjectsEn={allProjectsEn}
          allProjectsZh={allProjectsZh}
        />
      </main>

      <Footer />
    </div>
  )
}
