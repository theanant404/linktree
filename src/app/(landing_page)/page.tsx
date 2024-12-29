import Hero from './components/Hero'
import Features from './components/Features'
import Sponsors from './components/Sponsors'
import SampleCard from './components/SampleCard'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Features />
      <Sponsors />
      <SampleCard />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}

