import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage/LandingPage'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Allinvoices from './pages/Invoices/Allinvoices'
import InvoiceDetail from './pages/Invoices/InvoiceDetail'
import CreateInvoice from './pages/Invoices/CreateInvoice'
import ProfilePage from './pages/Profile/ProfilePage'
import ProtectedRoute from './components/auth/ProtectedRoute'

const App = () => {


  return (
    <div>
      <Router>
        <Routes>
          {/*public routes*/ }
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/*protected routes*/ }
          <Route path="/" element={<ProtectedRoute />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoices" element={<Allinvoices />} />
            <Route path="/invoices/new" element={<CreateInvoice />} />
            <Route path="/invoices/:invID" element={<InvoiceDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>


          {/* if unknown routes redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>


      <Toaster
      toastOptions={{
        className:"",
        style:{
          fontSize: '13px',
        }
      }} />
    </div>
  )
}

export default App
