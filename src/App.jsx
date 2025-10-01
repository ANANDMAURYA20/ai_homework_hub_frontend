import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import RootRedirect from './components/RootRedirect'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Pricing from './pages/Pricing'
import Security from './pages/Security'
import Features from './pages/Features'
import Documentation from './pages/Documentation'
import HomeworkList from './sections/HomeworkList'
import HomeworkForm from './sections/HomeworkForm'
import { USERS } from './api/client'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/security" element={<Security />} />
          <Route path="/features" element={<Features />} />
          <Route path="/docs" element={<Documentation />} />
        

          <Route element={<ProtectedRoute />}> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/homework" element={<HomeworkList />} />
            <Route path="/create-homework" element={<HomeworkForm />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
