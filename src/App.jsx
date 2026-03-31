import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { AppContentProvider } from './context/AppContentContext.jsx'
import { AdminEditorPanel } from './components/AdminEditorPanel.jsx'
import { BottomNav } from './components/BottomNav.jsx'
import { InlineEditToggle } from './components/InlineEditToggle.jsx'
import { PortalPage } from './components/PortalPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.search])

  return null
}

function AppShell() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <div className="app-shell__aurora app-shell__aurora--left" />
      <div className="app-shell__aurora app-shell__aurora--right" />
      <main className="app-shell__content">
        <Outlet />
      </main>
      <InlineEditToggle />
      <BottomNav />
    </div>
  )
}

function EditorPage() {
  return (
    <div className="page">
      <AdminEditorPanel />
    </div>
  )
}

function App() {
  return (
    <AppContentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/instructional-support"
              element={<PortalPage portalId="instructionalSupport" />}
            />
            <Route
              path="/evaluation-support"
              element={<PortalPage portalId="evaluationSupport" />}
            />
            <Route path="/feedback-form" element={<PortalPage portalId="feedbackForm" />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContentProvider>
  )
}

export default App
