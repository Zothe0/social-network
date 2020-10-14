import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './fonts/font-faces.css'
import './css/all.min.css'
import './css/App.css'
import Routes from './Routes'

export default function App() {
    return (
        <>
            <Router>
                <Routes />
            </Router>
        </>
    )
}
