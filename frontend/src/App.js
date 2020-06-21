import React from 'react';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import TaskList from './pages/TaskList';
import Header from './components/Header';
import { Container, CssBaseline } from '@material-ui/core';
import RequireAuth from './components/RequireAuth';

const routes = [
    {
        path: '/login',
        component: Login,
        key: 'login',
        exact: true
    },
    {
        path: '/cadastro',
        component: Signup,
        key: 'cadastro',
        exact: true
    },
    {
        path: '/profile',
        component: RequireAuth(Profile),
        key: 'profile',
        exact: true
    },
    {
        path: '/list',
        component: RequireAuth(TaskList),
        key: 'list',
        exact: true
    },
    {
        path: '/welcome',
        component: Welcome,
        key: 'welcome',
        exact: true
    },
    {
        path: '/',
        component: () => <Redirect to="/welcome" />,
        key: 'root',
        exact: false
    }
];

const App = () => {
    return (
      <BrowserRouter keyLength={12}>
        <CssBaseline />
        <Header />
        <Container maxWidth="sm">
        <Switch>
            {routes.map(route => <Route exact={route.exact} path={route.path} component={route.component} key={route.key} />)}
        </Switch>
        </Container>
      </BrowserRouter>
    );
};

export default App;