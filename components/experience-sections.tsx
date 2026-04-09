"use client"

import type { ExperienceEntry, ExperienceSection } from "@/lib/mdx"

interface ExperienceSectionsProps {
  sections: ExperienceSection[]
}

function compareExperienceEntries(a: ExperienceEntry, b: ExperienceEntry) {
  const startComparison = b.start.localeCompare(a.start)
  if (startComparison !== 0) {
    return startComparison
  }

  if (a.end === null && b.end !== null) {
    return -1
  }
  if (a.end !== null && b.end === null) {
    return 1
  }

  return (b.end ?? "").localeCompare(a.end ?? "")
}

export function ExperienceSections({ sections }: ExperienceSectionsProps) {
  return (
    <div className="space-y-12">
      {sections.map((section) => {
        const sortedItems = [...section.items].sort(compareExperienceEntries)

        return (
          <div key={section.id}>
            <h3 className="font-serif text-xl md:text-2xl font-semibold tracking-tight mb-6">
              {section.title}
            </h3>

            <div className="space-y-8">
              {sortedItems.map((item) => (
                <div key={`${section.id}-${item.title}-${item.period}`} className="relative pl-6 border-l-2 border-border/80">
                  <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-accent" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-accent font-medium text-sm">{item.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
