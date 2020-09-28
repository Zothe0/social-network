import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthorizationPage from '../pages/AuthorizationPage'
import PostsPage from '../pages/PostsPage'
import RegistrationPage from '../pages/RegistrationPage'
import ProfilePage from '../pages/ProfilePage'


export const useRoutes = (isAthenticated)=>{
    if(isAthenticated){
        return(
            <Switch>
                <Route path='/posts'>
                    <PostsPage/>
                </Route>
                <Route path='/profile/:id'>
                    <ProfilePage></ProfilePage>
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