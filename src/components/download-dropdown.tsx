"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/i18n"
import { getStrings } from "@/lib/strings"
import { cn } from "@/lib/utils"

const PDF_EN = "/VenezuelaFirstWorld.pdf"
const PDF_ES = "/VenezuelaFirstWorld-ES.pdf"
const FILE_EN = "VenezuelaFirstWorld.pdf"
const FILE_ES = "VenezuelaFirstWorld-ES.pdf"

type Variant = "headerIcon" | "cta" | "hero" | "footer"

interface DownloadDropdownProps {
  variant?: Variant
  className?: string
}

function DownloadIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DownloadDropdown({ variant = "cta", className }: DownloadDropdownProps) {
  const { lang } = useLanguage()
  const strings = getStrings(lang)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  let trigger: React.ReactNode
  if (variant === "headerIcon") {
    trigger = (
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={strings.downloadPdf}
        aria-label={strings.downloadPdf}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <DownloadIcon size={16} className="text-black" />
      </button>
    )
  } else if (variant === "cta") {
    trigger = (
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-5 h-9 rounded-lg text-sm font-medium bg-[#1e2a3a] text-white hover:bg-[#2a3a4e] transition-colors cursor-pointer"
      >
        <DownloadIcon size={16} />
        {strings.downloadPdf}
      </button>
    )
  } else if (variant === "hero") {
    trigger = (
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center justify-center rounded-lg text-sm font-medium px-6 h-9 bg-black/50 text-white border border-white/15 hover:bg-black/40 transition-colors cursor-pointer"
      >
        {strings.downloadPdf}
      </button>
    )
  } else {
    // footer
    trigger = (
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="text-[11px] text-white/50 hover:text-white/80 transition-colors tracking-wide cursor-pointer"
      >
        {strings.downloadPdf}
      </button>
    )
  }

  // Position menu: above for footer, below for everything else.
  const menuPosition =
    variant === "footer"
      ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
      : variant === "hero"
      ? "top-full mt-2 left-1/2 -translate-x-1/2"
      : "top-full mt-2 right-0"

  return (
    <div ref={wrapRef} className={cn("relative inline-block", className)}>
      {trigger}
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 min-w-[160px] rounded-lg border border-gray-200 bg-white shadow-xl overflow-hidden",
            menuPosition
          )}
        >
          <a
            role="menuitem"
            href={PDF_EN}
            download={FILE_EN}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <span>{strings.downloadOptionEnglish}</span>
            <DownloadIcon size={14} className="text-gray-500" />
          </a>
          <div className="h-px bg-gray-100" />
          <a
            role="menuitem"
            href={PDF_ES}
            download={FILE_ES}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <span>{strings.downloadOptionSpanish}</span>
            <DownloadIcon size={14} className="text-gray-500" />
          </a>
        </div>
      )}
    </div>
  )
}
