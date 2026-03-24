import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ThePxFramework from '@/components/sections/ThePxFramework'
import TechNexus from '@/components/sections/TechNexus'
import TrustBanner from '@/components/sections/TrustBanner'
import LeadCaptureForm from '@/components/sections/LeadCaptureForm'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      {/* Scroll targets that live outside overflow-hidden sections */}
      <div id="solutions" className="relative" style={{ scrollMarginTop: '80px' }} />
      <ThePxFramework />
      <TechNexus />
      <TrustBanner />
      <LeadCaptureForm />
      <Footer />
    </main>
  )
}
