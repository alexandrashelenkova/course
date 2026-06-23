import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DsLayout        from './pages/DsLayout.jsx'
import DsDevPage       from './pages/DsDevPage.jsx'
import AtomsPage       from './pages/AtomsPage.jsx'
import MoleculesPage   from './pages/MoleculesPage.jsx'
import PreviewPage     from './pages/PreviewPage.jsx'
import ComingSoonPage  from './pages/ComingSoonPage.jsx'

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
          <Route path="organisms" element={<ComingSoonPage section="Organisms" />} />
          <Route path="specimens" element={<ComingSoonPage section="Specimens" />} />
        </Route>

        {/* /preview-page — independent, no ds layout */}
        <Route path="/preview-page/*" element={<PreviewPage />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/ds-dev/styles" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
