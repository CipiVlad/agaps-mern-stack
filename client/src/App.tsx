import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Overview } from './pages/app/Overview'
import HoleDetail from './pages/app/HoleDetail'
import Navbar from './components/Navbar'
import AddCourseInfo from './pages/app/AddCourseInfo'
import HoleCardStart from './components/HoleCardStart'
import Home from './pages/app/Home'
import TotalSummary from './pages/app/TotalSummary'
import EditHole from './pages/app/EditHole'
import ContinueHole from './pages/app/ContinueHole'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/add-round" element={<AddCourseInfo />} />
        <Route path="/details/:id" element={<HoleDetail />} />
        <Route path="/hole-card/:id" element={<HoleCardStart />} />
        <Route path="/edit/:id" element={< EditHole />} />
        <Route path="/continue/:id" element={<ContinueHole />} />
        <Route path="/stats" element={<TotalSummary />} />
      </Routes>
      <Navbar />
    </div>
  )
}

export default App
