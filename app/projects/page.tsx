import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectsContent } from "@/components/projects-content"
import { getCurrentProjects, getSideProjects } from "@/lib/mdx"

export default function ProjectsPage() {
  const currentProjectsEn = getCurrentProjects('en')
  const currentProjectsZh = getCurrentProjects('zh')
  const sideProjectsEn = getSideProjects('en')
  const sideProjectsZh = getSideProjects('zh')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <ProjectsContent 
          currentProjectsEn={currentProjectsEn}
          currentProjectsZh={currentProjectsZh}
          sideProjectsEn={sideProjectsEn}
          sideProjectsZh={sideProjectsZh}
        />
      </main>

      <Footer />
    </div>
  )
}
