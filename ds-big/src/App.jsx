import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DsLayout       from './pages/DsLayout.jsx'
import DsDevPage      from './pages/DsDevPage.jsx'
import AtomsPage      from './pages/AtomsPage.jsx'
import MoleculesPage  from './pages/MoleculesPage.jsx'
import OrganismsPage  from './pages/OrganismsPage.jsx'
import Page1          from './pages/Page1.jsx'
import Page2          from './pages/Page2.jsx'
import Page3          from './pages/Page3.jsx'
import Page4          from './pages/Page4.jsx'
import Page5          from './pages/Page5.jsx'
import { PAGES_CONFIG } from './pagesConfig.js'

const PAGE_COMPONENTS = { 1: Page1, 2: Page2, 3: Page3, 4: Page4, 5: Page5 }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* /ds-dev — two-column layout shell with right sidebar */}
        <Route path="/ds-dev" element={<DsLayout />}>
          <Route index element={<Navigate to="styles" replace />} />
          <Route path="styles"    element={<DsDevPage />} />
          <Route path="atoms"     element={<AtomsPage />} />
          <Route path="molecules" element={<MoleculesPage />} />
          <Route path="organisms" element={<OrganismsPage />} />
        </Route>

        {/* Standalone test pages — no DsLayout wrapper */}
        {PAGES_CONFIG.map(p => {
          const Comp = PAGE_COMPONENTS[p.id]
          return <Route key={p.route} path={p.route} element={<Comp />} />
        })}

        {/* /preview-page redirects to /all_teams */}
        <Route path="/preview-page/*" element={<Navigate to="/all_teams" replace />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/ds-dev/styles" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
