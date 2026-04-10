"use client"

import { useState } from "react"
import type { PartDefinition } from "@/data/types"

interface TableOfContentsProps {
  parts: PartDefinition[]
  onChapterClick?: (page: number) => void
  allExpanded?: boolean
  activeChapterNumber?: number | null
}

export function TableOfContents({ parts, onChapterClick, allExpanded, activeChapterNumber }: TableOfContentsProps) {
  // Start with Intro expanded
  const [expanded, setExpanded] = useState<string | null>("INTRO")

  function toggle(key: string) {
    if (allExpanded) return
    setExpanded(expanded === key ? null : key)
  }

  function isExpanded(key: string) {
    if (allExpanded) return true
    return expanded === key
  }

  function handleChapterClick(page: number) {
    if (onChapterClick) {
      onChapterClick(page)
    }
  }

  return (
    <div className={allExpanded ? "" : "mt-16 mb-20"}>
      {!allExpanded && <h3 className="font-serif text-3xl mb-8">Table of Contents</h3>}
      <div className="space-y-1">
        {parts.map((part, partIdx) => {
          const key = part.number || `intro-${partIdx}`
          const isIntro = part.number === "INTRO"
          const open = isExpanded(key)

          return (
            <div key={key} className="border-b border-gray-100">
              <button
                onClick={() => toggle(key)}
                className={`w-full flex items-center justify-between py-4 text-left transition-colors ${allExpanded ? "" : "cursor-pointer hover:bg-gray-50/50"}`}
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {isIntro ? part.number : `Part ${part.number}`}
                  </span>
                  <p className="text-base font-semibold mt-0.5">{part.title}</p>
                </div>
                {!allExpanded && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`flex-shrink-0 ml-4 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open
                    ? "max-h-[800px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4 pl-4 space-y-1">
                  {part.chapters.map((ch, chIdx) => {
                    const isActive = activeChapterNumber != null && ch.number === activeChapterNumber
                    return (
                      <button
                        key={chIdx}
                        onClick={() => handleChapterClick(ch.page)}
                        className={`block w-full text-left text-sm py-1.5 transition-colors cursor-pointer ${
                          isActive
                            ? "text-black font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {ch.number > 0 && (
                          <span className={isActive ? "mr-2" : "text-muted-foreground/60 mr-2"}>
                            {ch.number}.
                          </span>
                        )}
                        {ch.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
