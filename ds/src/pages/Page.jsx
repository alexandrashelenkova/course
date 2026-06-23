import Navbar from '../sections/Navbar.jsx'
import Hero from '../sections/Hero.jsx'
import FeatureRow from '../sections/FeatureRow.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import Footer from '../sections/Footer.jsx'

/**
 * /page/ — assembled from the Figma "05 Page" frame (node 44-172).
 * Composition order is taken directly from Figma — no assumptions:
 *   Navbar (44-173) → Hero (44-174) → Feature Row (44-175) →
 *   CTA Band (44-176) → Footer (44-177)
 *
 * Each section is already fully self-contained (own background, padding,
 * width: 100%, box-sizing: border-box), so this file is intentionally
 * thin — just the composition shell.
 */
export default function Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <FeatureRow />
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}
