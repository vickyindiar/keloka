import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({component: Component, ...props}) {
    const isAuthenticated = props.authenticed;
    delete props.authenticed;
    return (
     <Route {...props} render={ e => ( isAuthenticated ? <Component {...e} /> : <Redirect to={{pathname: "/login", state: { from: e.locataion }}}/> ) }/>
    )
  }
