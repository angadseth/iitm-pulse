import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useProgress } from './hooks/useProgress'
import LoginPage from './pages/LoginPage'
import SetupPage from './pages/SetupPage'
import DashboardPage from './pages/DashboardPage'

function AuthGate({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="text-gray-400 font-display">Loading…</span></div>
  if (!user)   return <Navigate to="/login" replace />
  return children
}

function SetupGate({ children }) {
  const { user } = useAuth()
  const { profile, loading } = useProgress(user?.uid)
  if (loading) return null
  if (!profile?.setupComplete) return <Navigate to="/setup" replace />
  return children
}

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/setup" element={
        <AuthGate><SetupPage /></AuthGate>
      } />
      <Route path="/" element={
        <AuthGate><SetupGate><DashboardPage /></SetupGate></AuthGate>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
