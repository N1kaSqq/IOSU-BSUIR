import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes, publickRoutes } from './routes';
import { MAIN_ROUTE } from '../utils/constants';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../store/userStore/selectors';


function AppRouter() {
    const isAuth = useSelector(getIsAuth);

    return (
        <Switch>
            {isAuth && authRoutes.map(({ path, Component }) => 
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
