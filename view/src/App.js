import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './css/App.css'
import { useRoutes } from './hooks/useRoutes'


export default function App() {

    const isAuthorized = useSelector(state => state.registrationReducer.authorized)

    const Routes = useRoutes(isAuthorized)

    return (<>
        <Router>
            {Routes}
        </Router>
    </>)
}