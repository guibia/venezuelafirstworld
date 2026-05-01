import { Hero } from "@/components/hero"
import { ReaderLayout } from "@/components/reader/reader-layout"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="read">
        <ReaderLayout />
      </div>
      <Footer />
    </main>
  )
}
