import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectDetailContent } from "@/components/project-detail-content"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug, 'en')
  
  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.name} | Haifeng Liu`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const projectEn = getProjectBySlug(slug, 'en')
  const projectZh = getProjectBySlug(slug, 'zh')

  if (!projectEn || !projectZh) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <ProjectDetailContent projectEn={projectEn} projectZh={projectZh} />
      </main>

      <Footer />
    </div>
  )
}
