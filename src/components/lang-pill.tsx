"use client"

import { useLanguage, type Lang } from "@/lib/i18n"
import { getStrings } from "@/lib/strings"
import { cn } from "@/lib/utils"

type Variant = "header" | "hero"

interface LangPillProps {
  variant?: Variant
  className?: string
}

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
]

export function LangPill({ variant = "header", className }: LangPillProps) {
  const { lang, setLang } = useLanguage()
  const strings = getStrings(lang)

  const wrapperClass =
    variant === "hero"
      ? "inline-flex items-center rounded-full p-0.5 bg-white/10 border border-white/15 backdrop-blur-md"
      : "inline-flex items-center rounded-full p-0.5 bg-gray-100 border border-gray-200"

  return (
    <div
      role="group"
      aria-label={strings.langSwitchLabel}
      className={cn(wrapperClass, className)}
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.value
        const segmentClass =
          variant === "hero"
            ? active
              ? "bg-white text-black"
              : "text-white/80 hover:text-white"
            : active
            ? "bg-white text-black shadow-sm"
            : "text-gray-500 hover:text-gray-900"

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            className={cn(
              "px-2.5 h-6 rounded-full text-[11px] font-semibold tracking-wide transition-colors cursor-pointer",
              segmentClass
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
