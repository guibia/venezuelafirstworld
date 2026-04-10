"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { PdfViewer, type PdfViewerHandle } from "./pdf-viewer"
import { TableOfContents } from "./table-of-contents"
import { parts } from "@/data/toc"
import { preamble } from "@/data/preamble"

interface ActiveLocation {
  partLabel: string
  partTitle: string
  chapterNumber: number
  chapterTitle: string
}

export function ReaderLayout() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [active, setActive] = useState<ActiveLocation | null>(null)
  const readSectionRef = useRef<HTMLDivElement>(null)
  const pdfRef = useRef<PdfViewerHandle>(null)

  // Build a sorted lookup: [{ page, partLabel, partTitle, chapterNumber, chapterTitle }]
  const pageIndex = useMemo(() => {
    const entries: { page: number; partLabel: string; partTitle: string; chapterNumber: number; chapterTitle: string }[] = []
    for (const part of parts) {
      for (const ch of part.chapters) {
        entries.push({
          page: ch.page,
          partLabel: part.number,
          partTitle: part.title,
          chapterNumber: ch.number,
          chapterTitle: ch.title,
        })
      }
    }
    return entries.sort((a, b) => a.page - b.page)
  }, [])

  // Find the location for a given page number
  const findLocationForPage = useCallback(
    (page: number): ActiveLocation | null => {
      let best: (typeof pageIndex)[number] | null = null
      for (const entry of pageIndex) {
        if (entry.page <= page) best = entry
        else break
      }
      if (!best) return null
      return {
        partLabel: best.partLabel,
        partTitle: best.partTitle,
        chapterNumber: best.chapterNumber,
        chapterTitle: best.chapterTitle,
      }
    },
    [pageIndex]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      const loc = findLocationForPage(page)
      if (loc) setActive(loc)
    },
    [findLocationForPage]
  )

  useEffect(() => {
    const el = readSectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: "0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleChapterClick = useCallback((page: number) => {
    pdfRef.current?.goToPage(page)

    const loc = findLocationForPage(page)
    if (loc) setActive(loc)

    const pdfSection = document.getElementById("pdf-viewer")
    if (pdfSection) {
      pdfSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [findLocationForPage])

  // Format the header title
  const headerTitle = active
    ? active.chapterNumber > 0
      ? `${active.chapterNumber}. ${active.chapterTitle}`
      : active.chapterTitle
    : "Venezuela First World"

  const headerSubtitle = active
    ? active.partLabel === "INTRO"
      ? "Introduction"
      : `Part ${active.partLabel} — ${active.partTitle}`
    : "The Sovereign Reconstruction Blueprint"

  return (
    <>
      <div ref={readSectionRef} className="h-0" />

      {/* Sticky header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="min-w-0 flex-1 text-left cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2 max-w-full">
              <span className="text-sm font-semibold truncate">{headerTitle}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={`flex-shrink-0 transition-transform duration-200 ${navOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {headerSubtitle}
            </p>
          </button>
          <a
            href="/VenezuelaFirstWorld.pdf"
            download
            className="flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Download PDF"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </header>

      {/* Quick nav dropdown */}
      {navOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNavOpen(false)}>
          <div
            className="absolute top-14 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-[70vh] overflow-y-auto p-6">
              <TableOfContents
                parts={parts}
                allExpanded
                activeChapterNumber={active?.chapterNumber ?? null}
                onChapterClick={(page) => {
                  handleChapterClick(page)
                  setNavOpen(false)
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Preamble section */}
      <article className="max-w-[680px] mx-auto px-6 pt-24 pb-16">
        <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
          {preamble.title}
        </h2>

        <div className="space-y-6">
          {preamble.paragraphs.map((p, i) => (
            <p key={i} className="text-lg leading-[1.85] text-[#333]">
              {p}
            </p>
          ))}
        </div>

        {/* Author box */}
        <div className="mt-14 border-l-2 border-[#c8a74b] pl-6">
          <h3 className="text-lg font-semibold mb-1 text-[#111]">
            {preamble.author.name}
          </h3>
          <a
            href="https://x.com/RobertoSmithP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#555] hover:text-[#111] transition-colors mb-4"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            @RobertoSmithP
          </a>
          <div className="space-y-4">
            {preamble.author.bio.split("\n\n").map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.8] text-[#444]">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents parts={parts} onChapterClick={handleChapterClick} />
      </article>

      {/* Embedded PDF */}
      <div id="pdf-viewer" className="scroll-mt-14 max-w-5xl mx-auto px-2 sm:px-6 pb-32">
        <div className="flex items-center justify-center mb-4">
          <a
            href="/VenezuelaFirstWorld.pdf"
            download
            className="inline-flex items-center gap-2 px-5 h-9 rounded-lg text-sm font-medium bg-[#1e2a3a] text-white hover:bg-[#2a3a4e] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download PDF
          </a>
        </div>
        <div className="border border-gray-200 rounded-xl bg-gray-50 p-1 sm:p-3 md:p-4 shadow-sm overflow-hidden">
          <PdfViewer ref={pdfRef} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  )
}
