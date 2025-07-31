import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ManageAthletesPage from './pages/ManageAthletesPage'
import ManageEventsPage from './pages/ManageEventsPage'
import ManageRacesPage from './pages/ManageRacesPage'
import ViewAthletesPage from './pages/ViewAthletesPage'
import ViewEventsPage from './pages/ViewEventsPage'
import ViewRacesPage from './pages/ViewRacesPage'


function App() {


  return (
    <Router>
    <>
      <div className="app">
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manage_events" element={<ManageEventsPage />} />
              <Route path="/manage_races" element={<ManageRacesPage />} /> 
              <Route path="/manage_athletes" element={<ManageAthletesPage />} /> 
              <Route path="/view_events" element={<ViewEventsPage />} />
              <Route path="/view_races" element={<ViewRacesPage />} />
              <Route path="/view_athletes" element={<ViewAthletesPage />} />
            </Routes>
          </div>
      </div>
    </>
    </Router>
  )
}

export default App
