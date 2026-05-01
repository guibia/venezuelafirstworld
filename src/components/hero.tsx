import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-caracas.png')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 max-w-2xl text-center">
        <p className="hero-animate text-xs uppercase tracking-[0.25em] text-white/75 mb-6">
          The Sovereign Reconstruction Blueprint
        </p>
        <h1 className="hero-animate-delay-1 font-serif text-5xl md:text-7xl leading-[1.1] mb-4 text-white">
          The Path to a First-World Venezuela
        </h1>
        <p className="hero-animate-delay-2 text-base text-white/80 mt-6 max-w-md mx-auto leading-relaxed">
          The 10-year Blueprint to Rebuild a First-Class Global Economy. The most
          comprehensive sovereign reconstruction undertaken in the 21st century.
        </p>
        <div className="hero-animate-delay-3 flex gap-4 mt-10 justify-center">
          <a
            href="#read"
            className={cn(
              "inline-flex items-center justify-center rounded-lg text-sm font-medium px-6 h-9 bg-white text-black hover:bg-white/90 transition-colors"
            )}
          >
            Read online
          </a>
          <a
            href="/VenezuelaFirstWorld.pdf"
            download
            className={cn(
              "inline-flex items-center justify-center rounded-lg text-sm font-medium px-6 h-9 bg-black/50 text-white border border-white/15 hover:bg-black/40 transition-colors"
            )}
          >
            Download PDF
          </a>
        </div>
      </div>
    </section>
  )
}
