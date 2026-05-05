"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { getStrings } from "@/lib/strings"
import { LangPill } from "@/components/lang-pill"
import { DownloadDropdown } from "@/components/download-dropdown"

export function Hero() {
  const { lang } = useLanguage()
  const strings = getStrings(lang)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-caracas.png')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Subtle EN/ES toggle in top-right corner */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20">
        <LangPill variant="hero" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        <p className="hero-animate text-xs uppercase tracking-[0.25em] text-white/75 mb-6">
          {strings.heroKicker}
        </p>
        <h1 className="hero-animate-delay-1 font-serif text-5xl md:text-7xl leading-[1.1] mb-4 text-white">
          {strings.heroTitle}
        </h1>
        <p className="hero-animate-delay-2 text-base text-white/80 mt-6 max-w-md mx-auto leading-relaxed">
          {strings.heroLead}
        </p>
        <div className="hero-animate-delay-3 flex gap-4 mt-10 justify-center">
          <a
            href="#read"
            className={cn(
              "inline-flex items-center justify-center rounded-lg text-sm font-medium px-6 h-9 bg-white text-black hover:bg-white/90 transition-colors"
            )}
          >
            {strings.heroReadOnline}
          </a>
          <DownloadDropdown variant="hero" />
        </div>
      </div>
    </section>
  )
}
