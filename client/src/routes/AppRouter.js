import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes, publickRoutes } from './routes';
import { MAIN_ROUTE } from '../utils/constants';

const user = {
    isAuth: true,
}

function AppRouter() {
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publickRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
    )
}

export default AppRouter
