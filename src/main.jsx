import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AddVehiclePage from './pages/AddVehiclePage.jsx'
import SearchBookPage from './pages/SearchBookPage.jsx'

function Layout() {
  return (
    <div style={{ backgroundColor:'skyblue' }}>
    <div style={{ maxWidth: 960, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h1>Vehicle Fleet Booking</h1>
      <nav style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <Link to="/">Add Vehicle</Link>
        <Link to="/search">Search & Book</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddVehiclePage />} />
        <Route path="/search" element={<SearchBookPage />} />
      </Routes>
    </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>
)
