import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ComposedComponent => {
    const HOF = () => {
        const isUserLogged = useSelector(state => state.session.isLogged);
        return isUserLogged ? <ComposedComponent /> : <Redirect to="/login" />
    }
    return HOF;
};

export default RequireAuth;
