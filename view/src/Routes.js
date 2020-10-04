import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthorizationPage from './pages/AuthorizationPage'
import PostsPage from './pages/PostsPage'
import RegistrationPage from './pages/RegistrationPage'
import ProfilePage from './pages/ProfilePage'
import { useSelector } from 'react-redux'


export default function Routes(){
    const isAthorized = useSelector(state=>state.authReducer.authorized)
    if(isAthorized){
        return(
            <Switch>
                <Route path='/posts'>
                    <PostsPage/>
                </Route>
                <Route path='/profile/:id'>
                    <ProfilePage/>
                </Route>
                <Route path='/'>
                    <Redirect to='/posts'/>
                </Route>
            </Switch>
        )
    }else{
        return(
            <Switch>
                <Route path='/auth'>
                    <AuthorizationPage/>
                </Route>
                <Route path='/registration'>
                    <RegistrationPage/>
                </Route>
                <Route path='/'>
                    <Redirect to='/auth'/>
                </Route>
            </Switch>
       )
    }
}