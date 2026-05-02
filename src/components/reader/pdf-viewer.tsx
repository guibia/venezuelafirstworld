"use client"

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react"

const PDF_URL = "/VenezuelaFirstWorld.pdf"
const WORKER_URL = "/pdf.worker.min.mjs"
const INITIAL_PAGE = 9
const PIXEL_RATIO = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1
// Minimum render width on mobile — keeps A4 text comfortably readable (~14px body text)
const MOBILE_MIN_WIDTH = 600

export interface PdfViewerHandle {
  goToPage: (page: number) => void
}

interface Props {
  onPageChange?: (page: number) => void
}

export const PdfViewer = forwardRef<PdfViewerHandle, Props>(
  function PdfViewer({ onPageChange }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRefs = useRef<Map<number, HTMLCanvasElement>>(new Map())
    const [totalPages, setTotalPages] = useState(0)
    const [pageHeight, setPageHeight] = useState(0) // estimated height per page in CSS px
    const [renderWidth, setRenderWidth] = useState(0) // actual CSS px width each page is drawn at
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
    const [loadError, setLoadError] = useState<string | null>(null)
    const loadedPagesRef = useRef<Set<number>>(new Set())
    const pdfDocRef = useRef<unknown>(null)
    const currentPageRef = useRef(INITIAL_PAGE)
    const renderingRef = useRef<Set<number>>(new Set())

    // Load pdfjs dynamically (client-only) and compute page dimensions
    useEffect(() => {
      let cancelled = false

      async function init() {
        try {
          // Legacy build includes Map/WeakMap polyfills (e.g. getOrInsertComputed) required
          // by some browsers; the default build expects very new JS engines.
          const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")
          pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL

          const doc = await pdfjs.getDocument(PDF_URL).promise
          if (cancelled) return
          pdfDocRef.current = doc

          // Read first page to get aspect ratio for placeholders
          const firstPage = await doc.getPage(1)
          const vp = firstPage.getViewport({ scale: 1 })
          const container = containerRef.current
          if (container) {
            const isMobile = window.innerWidth < 640
            const containerWidth = container.clientWidth - (isMobile ? 0 : 32)
            const rw = isMobile ? Math.max(containerWidth, MOBILE_MIN_WIDTH) : containerWidth
            const estimatedHeight = (rw / vp.width) * vp.height
            setRenderWidth(rw)
            setPageHeight(estimatedHeight)
          }

          setTotalPages(doc.numPages)
        } catch (e) {
          if (!cancelled) {
            const msg = e instanceof Error ? e.message : String(e)
            setLoadError(msg)
          }
        }
      }

      init()
      return () => { cancelled = true }
    }, [])

    // Render a single page into its canvas
    const renderPage = useCallback(async (pageNum: number) => {
      const doc = pdfDocRef.current as { getPage: (n: number) => Promise<{ getViewport: (opts: { scale: number }) => { width: number; height: number }; render: (opts: unknown) => { promise: Promise<void> } }> } | null
      if (!doc) return
      if (renderingRef.current.has(pageNum)) return
      if (loadedPagesRef.current.has(pageNum)) return

      renderingRef.current.add(pageNum)

      try {
        const page = await doc.getPage(pageNum)
        const canvas = canvasRefs.current.get(pageNum)
        if (!canvas) return

        const viewport = page.getViewport({ scale: 1 })
        const container = containerRef.current
        if (!container) return

        const isMobile = window.innerWidth < 640
        const containerWidth = container.clientWidth - (isMobile ? 0 : 32)
        const rw = isMobile ? Math.max(containerWidth, MOBILE_MIN_WIDTH) : containerWidth
        const scale = (rw / viewport.width) * PIXEL_RATIO

        const scaledViewport = page.getViewport({ scale })
        const cssWidth = scaledViewport.width / PIXEL_RATIO
        const cssHeight = scaledViewport.height / PIXEL_RATIO
        canvas.width = scaledViewport.width
        canvas.height = scaledViewport.height
        canvas.style.width = `${cssWidth}px`
        canvas.style.height = `${cssHeight}px`

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        await page.render({ canvasContext: ctx, canvas, viewport: scaledViewport } as unknown).promise

        loadedPagesRef.current.add(pageNum)
      } finally {
        renderingRef.current.delete(pageNum)
      }
    }, [])

    // Observe which canvases are visible and render them on demand
    useEffect(() => {
      if (totalPages === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const pageNum = Number(entry.target.getAttribute("data-page"))
              if (pageNum) renderPage(pageNum)
            }
          }
        },
        { root: containerRef.current, rootMargin: "200% 0px" }
      )

      canvasRefs.current.forEach((canvas) => {
        observer.observe(canvas)
      })

      return () => observer.disconnect()
    }, [totalPages, renderPage])

    // Track current page on scroll
    useEffect(() => {
      const container = containerRef.current
      if (!container || totalPages === 0) return

      function handleScroll() {
        let bestPage = INITIAL_PAGE
        let bestVisibility = 0

        canvasRefs.current.forEach((canvas, pageNum) => {
          const rect = canvas.getBoundingClientRect()
          const containerRect = container!.getBoundingClientRect()
          const top = Math.max(rect.top, containerRect.top)
          const bottom = Math.min(rect.bottom, containerRect.bottom)
          const visible = Math.max(0, bottom - top)

          if (visible > bestVisibility) {
            bestVisibility = visible
            bestPage = pageNum
          }
        })

        if (bestPage !== currentPageRef.current) {
          currentPageRef.current = bestPage
          setCurrentPage(bestPage)
          onPageChange?.(bestPage)
        }
      }

      container.addEventListener("scroll", handleScroll, { passive: true })
      return () => container.removeEventListener("scroll", handleScroll)
    }, [totalPages, onPageChange])

    // Scroll to initial page once pages are laid out with correct heights
    useEffect(() => {
      if (totalPages === 0 || pageHeight === 0) return
      // Wait a frame for layout to settle with the correct placeholder heights
      requestAnimationFrame(() => {
        const canvas = canvasRefs.current.get(INITIAL_PAGE)
        const container = containerRef.current
        if (canvas && container) {
          const canvasTop = canvas.offsetTop - container.offsetTop
          container.scrollTo({ top: canvasTop })
        }
      })
    }, [totalPages, pageHeight])

    // goToPage imperative handle
    const goToPage = useCallback((page: number) => {
      const canvas = canvasRefs.current.get(page)
      const container = containerRef.current
      if (canvas && container) {
        const canvasTop = canvas.offsetTop - container.offsetTop
        container.scrollTo({ top: canvasTop, behavior: "smooth" })
        renderPage(page)
      }
    }, [renderPage])

    useImperativeHandle(ref, () => ({ goToPage }), [goToPage])

    return (
      <div className="relative w-full">
        {/* Scrollable viewer — on mobile: overflow both axes so users can pan after pinch-zoom */}
        <div
          ref={containerRef}
          className="w-full overflow-auto rounded-lg bg-gray-100"
          style={{
            height: "calc(100dvh - 56px)",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {totalPages > 0 && pageHeight > 0 ? (
            <div className="flex flex-col items-center gap-2 py-2 px-0 sm:p-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <canvas
                  key={pageNum}
                  ref={(el) => {
                    if (el) canvasRefs.current.set(pageNum, el)
                    else canvasRefs.current.delete(pageNum)
                  }}
                  data-page={pageNum}
                  className="shadow-md bg-white flex-shrink-0"
                  style={{ width: renderWidth || "100%", height: pageHeight }}
                />
              ))}
            </div>
          ) : loadError ? (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center gap-2">
              <p className="text-sm font-medium text-destructive">Could not load the PDF.</p>
              <p className="text-xs text-muted-foreground max-w-md break-words">{loadError}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Loading document…
            </div>
          )}
        </div>

        {/* Page counter — bottom-right, only when loaded */}
        {totalPages > 0 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 text-white text-xs rounded-full px-3 py-1.5 select-none pointer-events-none backdrop-blur-sm">
            <span>{currentPage} / {totalPages}</span>
          </div>
        )}
      </div>
    )
  }
)
