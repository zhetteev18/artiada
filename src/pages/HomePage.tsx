import { useCallback, useState } from 'react'

import { ParticipationForm } from '../components/forms/ParticipationForm'
import { MediaRefreshProvider } from '../hooks/useMediaRefresh'

import { Footer } from '../components/layout/Footer'

import { Header } from '../components/layout/Header'

import { MobileFormFab } from '../components/layout/MobileFormFab'

import { ParticipationModal } from '../components/layout/ParticipationModal'

import { NewsSection } from '../components/sections/NewsSection'

import { AboutSection } from '../components/sections/AboutSection'

import { CodexSection } from '../components/sections/CodexSection'

import { ContactsSection } from '../components/sections/ContactsSection'

import { ContestsSection } from '../components/sections/ContestsSection'
import { ContestRegulationsSection } from '../components/sections/ContestRegulationsSection'

import { ContestResultsSection } from '../components/sections/ContestResultsSection'

import { FestivalCalendarSection } from '../components/sections/FestivalCalendarSection'

import { FoundersSection } from '../components/sections/FoundersSection'

import { Hero } from '../components/sections/Hero'

import { GallerySection } from '../components/sections/GallerySection'

import { VideosSection } from '../components/sections/VideosSection'

import { FadeIn } from '../components/ui/FadeIn'

import { ScrollProgress } from '../components/ui/ScrollProgress'



export function HomePage() {

  const [formOpen, setFormOpen] = useState(false)



  const openForm = useCallback(() => {

    if (window.matchMedia('(min-width: 1280px)').matches) {

      document.querySelector('#participate-mobile')?.scrollIntoView({ behavior: 'smooth' })

      return

    }

    setFormOpen(true)

  }, [])



  return (
    <MediaRefreshProvider>
    <>
      <ScrollProgress />

      <Header onParticipateClick={openForm} />



      {/* Hero и лента — на всю ширину экрана */}

      <Hero onParticipateClick={openForm} />



      {/* Основной контент — полноширинно на десктопе, без сжатия боковой формой */}

      <div className="site-shell">

          <main className="min-w-0">

            <NewsSection />

            <AboutSection />

            <CodexSection />

            <FoundersSection />

            <ContestsSection onParticipateClick={openForm} />

            <ContestRegulationsSection />

            <FestivalCalendarSection />

            <ContestResultsSection />

            <GallerySection />

            <VideosSection />

            <ContactsSection />



            <section

              id="participate-mobile"

              className="section-alt border-t border-line py-12 md:py-16"

            >

              <div className="relative mx-auto max-w-lg">

                <FadeIn>

                  <ParticipationForm variant="inline" />

                </FadeIn>

              </div>

            </section>

          </main>

      </div>



      <Footer />

      {!formOpen && <MobileFormFab onClick={openForm} />}

      <ParticipationModal open={formOpen} onClose={() => setFormOpen(false)} />
    </>
    </MediaRefreshProvider>
  )
}
