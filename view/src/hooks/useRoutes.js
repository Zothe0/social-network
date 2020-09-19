import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthenticationPage from '../pages/AuthenticationPage'
import RegistrationPage from '../pages/RegistrationPage'


export const useRoutes = (isAthenticated=false)=>{
    if(isAthenticated){
        return(
            <Switch>
                <Route path='/auth'>
                    <AuthenticationPage/>
                </Route>
                <Route path='/registration'>
                    <RegistrationPage/>
                </Route>
                <Route path='/'>
                    <Redirect to='registration'/>
                </Route>
            </Switch>
       )
    }else{
        return null
    }
}