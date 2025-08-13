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
import ViewResultsPage from './pages/ViewResultsPage'
import ManageResultsPage from './pages/ManageResultsPage'
import ResetDBPage from './pages/ResetDBPage'
import Header from './components/Header'




const backendPort = 2228;
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;


function App() {


  return (

    <Router>
      <div className="app">
          
            <Header />
            <div className="content">
            <Routes>
              <Route path="/" element={<HomePage backendURL={backendURL} />} />
              <Route path="/manage_events" element={<ManageEventsPage backendURL={backendURL} />} />
              <Route path="/manage_races" element={<ManageRacesPage backendURL={backendURL} />} /> 
              <Route path="/manage_athletes" element={<ManageAthletesPage backendURL={backendURL} />} /> 
              <Route path="/manage_results" element={<ManageResultsPage backendURL={backendURL} />} /> 
              <Route path="/view_events" element={<ViewEventsPage backendURL={backendURL} />} />
              <Route path="/view_races" element={<ViewRacesPage backendURL={backendURL} />} />
              <Route path="/view_athletes" element={<ViewAthletesPage backendURL={backendURL} />} />
              <Route path="/view_results" element={<ViewResultsPage backendURL={backendURL} />} />
              <Route path="/reset_database" element={<ResetDBPage backendURL={backendURL} />} />
            </Routes> 
          </div>
      </div>
    </Router>
  )
}

export default App