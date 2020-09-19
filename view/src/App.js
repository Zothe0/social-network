import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './css/App.css'
import { useRoutes } from './hooks/useRoutes'

const Routes = useRoutes(true)

export default function App() {
    return (<>
        <Router>
            {Routes}
        </Router>
    </>)
}