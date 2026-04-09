"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center border border-border/60 rounded-md overflow-hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLocale('en')}
        className={cn(
          "rounded-none px-2 py-1 h-7 text-xs font-medium",
          locale === 'en' 
            ? "bg-accent text-accent-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </Button>
      <div className="w-px h-4 bg-border/60" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLocale('zh')}
        className={cn(
          "rounded-none px-2 py-1 h-7 text-xs font-medium",
          locale === 'zh' 
            ? "bg-accent text-accent-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        中文
      </Button>
    </div>
  )
}
