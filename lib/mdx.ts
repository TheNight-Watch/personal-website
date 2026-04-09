import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Locale } from './i18n'

const contentDirectory = path.join(process.cwd(), 'content')

// Types for Home content
export interface ExperienceItem {
  role: string
  organization: string
  period: string
  description: string
}

export interface AwardItem {
  name: string
  event: string
  year: string
}

export interface EventItem {
  name: string
  type: string
  description: string
}

export interface TechStackCategory {
  category: string
  items: string[]
}

export interface HomeFrontmatter {
  name: string
  tagline: string
  subtitle: string
  description: string
  experience: ExperienceItem[]
  awards: AwardItem[]
  eventsHosted: EventItem[]
  techStack: TechStackCategory[]
}

export interface HomeContent extends HomeFrontmatter {
  content: string
}

// Types for Projects
export interface ProjectFrontmatter {
  id: string
  name: string
  tagline: string
  description: string
  status: string
  tags: string[]
  features: string[]
  challenges: string[]
  techStack: string[]
  timeline: string
  role: string
  category: 'current' | 'side'
  order?: number
  links?: {
    demo?: string
    github?: string
    article?: string
  }
}

export interface Project extends ProjectFrontmatter {
  content: string
  slug: string
}

// Types for Articles
export interface ArticleFrontmatter {
  id: string
  title: string
  titleChinese?: string
  publication: string
  date: string
  excerpt: string
  tags: string[]
  external?: boolean
  externalUrl?: string
  featured?: boolean
  order?: number
}

export interface Article extends ArticleFrontmatter {
  content: string
  slug: string
}

// Meta types for client components (without content to avoid serialization issues)
export type ProjectMeta = Omit<Project, 'content'>
export type ArticleMeta = Omit<Article, 'content'>

// Get home content by locale
export function getHomeContent(locale: Locale = 'en'): HomeContent | null {
  const filePath = path.join(contentDirectory, 'home', `${locale}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    // Fallback to English if locale file doesn't exist
    const fallbackPath = path.join(contentDirectory, 'home', 'en.mdx')
    if (!fs.existsSync(fallbackPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fallbackPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      ...(data as HomeFrontmatter),
      content,
    }
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    ...(data as HomeFrontmatter),
    content,
  }
}

// Get all projects for a locale
export function getAllProjects(locale: Locale = 'en'): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects', locale)
  
  if (!fs.existsSync(projectsDirectory)) {
    // Fallback to English
    const fallbackDir = path.join(contentDirectory, 'projects', 'en')
    if (!fs.existsSync(fallbackDir)) {
      return []
    }
    return getAllProjectsFromDir(fallbackDir)
  }
  
  return getAllProjectsFromDir(projectsDirectory)
}

function getAllProjectsFromDir(directory: string): Project[] {
  const fileNames = fs.readdirSync(directory)
  const projects = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(directory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        ...(data as ProjectFrontmatter),
        content,
        slug,
      }
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
  
  return projects
}

// Get project by slug for a locale
export function getProjectBySlug(slug: string, locale: Locale = 'en'): Project | null {
  const projectsDirectory = path.join(contentDirectory, 'projects', locale)
  const mdxPath = path.join(projectsDirectory, `${slug}.mdx`)
  const mdPath = path.join(projectsDirectory, `${slug}.md`)
  
  let fullPath = ''
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    // Fallback to English
    const fallbackMdx = path.join(contentDirectory, 'projects', 'en', `${slug}.mdx`)
    const fallbackMd = path.join(contentDirectory, 'projects', 'en', `${slug}.md`)
    if (fs.existsSync(fallbackMdx)) {
      fullPath = fallbackMdx
    } else if (fs.existsSync(fallbackMd)) {
      fullPath = fallbackMd
    } else {
      return null
    }
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    ...(data as ProjectFrontmatter),
    content,
    slug,
  }
}

// Get all projects (meta only for client components)
export function getAllProjectsMeta(locale: Locale = 'en'): ProjectMeta[] {
  return getAllProjects(locale)
    .map(({ content, ...meta }) => meta)
}

// Get current projects (meta only for client components)
export function getCurrentProjects(locale: Locale = 'en'): ProjectMeta[] {
  return getAllProjects(locale)
    .filter(p => p.category === 'current')
    .map(({ content, ...meta }) => meta)
}

// Get side projects (meta only for client components)
export function getSideProjects(locale: Locale = 'en'): ProjectMeta[] {
  return getAllProjects(locale)
    .filter(p => p.category === 'side')
    .map(({ content, ...meta }) => meta)
}

// Get all articles for a locale
export function getAllArticles(locale: Locale = 'en'): Article[] {
  const articlesDirectory = path.join(contentDirectory, 'writing', locale)
  
  if (!fs.existsSync(articlesDirectory)) {
    // Fallback to English
    const fallbackDir = path.join(contentDirectory, 'writing', 'en')
    if (!fs.existsSync(fallbackDir)) {
      return []
    }
    return getAllArticlesFromDir(fallbackDir)
  }
  
  return getAllArticlesFromDir(articlesDirectory)
}

function getAllArticlesFromDir(directory: string): Article[] {
  const fileNames = fs.readdirSync(directory)
  const articles = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(directory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        ...(data as ArticleFrontmatter),
        content,
        slug,
      }
    })
    .sort((a, b) => {
      // Sort by date descending
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  
  return articles
}

// Get article by slug for a locale
export function getArticleBySlug(slug: string, locale: Locale = 'en'): Article | null {
  const articlesDirectory = path.join(contentDirectory, 'writing', locale)
  const mdxPath = path.join(articlesDirectory, `${slug}.mdx`)
  const mdPath = path.join(articlesDirectory, `${slug}.md`)
  
  let fullPath = ''
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    // Fallback to English
    const fallbackMdx = path.join(contentDirectory, 'writing', 'en', `${slug}.mdx`)
    const fallbackMd = path.join(contentDirectory, 'writing', 'en', `${slug}.md`)
    if (fs.existsSync(fallbackMdx)) {
      fullPath = fallbackMdx
    } else if (fs.existsSync(fallbackMd)) {
      fullPath = fallbackMd
    } else {
      return null
    }
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    ...(data as ArticleFrontmatter),
    content,
    slug,
  }
}

// Get featured articles (meta only for client components)
export function getFeaturedArticles(locale: Locale = 'en'): ArticleMeta[] {
  return getAllArticles(locale)
    .filter(a => a.featured)
    .map(({ content, ...meta }) => meta)
}

// Get all articles as meta (for client components)
export function getAllArticlesMeta(locale: Locale = 'en'): ArticleMeta[] {
  return getAllArticles(locale).map(({ content, ...meta }) => meta)
}

// Get all project slugs for static generation
export function getAllProjectSlugs(): string[] {
  const enDir = path.join(contentDirectory, 'projects', 'en')
  const zhDir = path.join(contentDirectory, 'projects', 'zh')
  
  const slugs = new Set<string>()
  
  if (fs.existsSync(enDir)) {
    fs.readdirSync(enDir)
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .forEach(fileName => slugs.add(fileName.replace(/\.mdx?$/, '')))
  }
  
  if (fs.existsSync(zhDir)) {
    fs.readdirSync(zhDir)
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .forEach(fileName => slugs.add(fileName.replace(/\.mdx?$/, '')))
  }
  
  return Array.from(slugs)
}

// Get all article slugs for static generation
export function getAllArticleSlugs(): string[] {
  const enDir = path.join(contentDirectory, 'writing', 'en')
  const zhDir = path.join(contentDirectory, 'writing', 'zh')
  
  const slugs = new Set<string>()
  
  if (fs.existsSync(enDir)) {
    fs.readdirSync(enDir)
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .forEach(fileName => slugs.add(fileName.replace(/\.mdx?$/, '')))
  }
  
  if (fs.existsSync(zhDir)) {
    fs.readdirSync(zhDir)
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .forEach(fileName => slugs.add(fileName.replace(/\.mdx?$/, '')))
  }
  
  return Array.from(slugs)
}
