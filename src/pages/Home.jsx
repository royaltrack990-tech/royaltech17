import HeroSlider from '../components/HeroSlider'
import CompaniesSection from '../components/CompaniesSection'
import StatsSection from '../components/StatsSection'
import AboutSection from '../components/AboutSection'
import ParallaxSection from '../components/ParallaxSection'
import GlobalNetworkSection from '../components/GlobalNetworkSection'
import SisterCompaniesSection from '../components/SisterCompaniesSection'
import ProfileSection from '../components/ProfileSection'

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <CompaniesSection />
      <StatsSection />
      <AboutSection />
      <ParallaxSection />
      <GlobalNetworkSection />
      <SisterCompaniesSection />
      <ProfileSection />
    </main>
  )
}
