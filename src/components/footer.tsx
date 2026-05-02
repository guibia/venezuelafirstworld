export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Venezuelan flag — three horizontal bands: yellow, blue, red */}
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 bg-[#FFCD00]" />
        <div className="flex-1 bg-[#003893]" />
        <div className="flex-1 bg-[#CF142B]" />
      </div>
      {/* Heavy blur to soften the bands into a blended wash */}
      <div className="absolute inset-0 backdrop-blur-3xl" />
      {/* Dark overlay to deepen it */}
      <div className="absolute inset-0 bg-[#001a4d]/50" />

      {/* Content in normal flow so nothing gets hidden */}
      <div className="relative z-10">
        {/* Large title */}
        <div className="flex items-end justify-center pt-10 pb-4 md:pb-6 px-4">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white/[0.08] leading-tight select-none text-center pointer-events-none">
            Venezuela First World
          </h2>
        </div>

        {/* Glass bar */}
        <div className="relative -mt-4 md:-mt-8">
          <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-xl border-t border-white/10" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-4 flex flex-col items-center gap-3">
            {/* Links row */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a
                href="/VenezuelaFirstWorld.pdf"
                download
                className="text-[11px] text-white/50 hover:text-white/80 transition-colors tracking-wide"
              >
                Download PDF
              </a>
              <span className="text-white/20 text-[10px]">|</span>
              <a
                href="#read"
                className="text-[11px] text-white/50 hover:text-white/80 transition-colors tracking-wide"
              >
                Read Online
              </a>
              <span className="text-white/20 text-[10px]">|</span>
              <a
                href="https://x.com/RobertoSmithP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white/80 transition-colors tracking-wide"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                @RobertoSmithP
              </a>
            </div>

            {/* Credit line */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              The Sovereign Reconstruction Blueprint
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
