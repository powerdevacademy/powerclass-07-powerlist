import React, { useState, useEffect } from "react";
import logo from "../logo.png";

import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from 'react-redux';
import { logout } from '../actions/session';
import { clearTodos} from '../actions/todos'; 

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: "40px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const session = useSelector(state => state.session);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const browseTo = (route) => {
      history.push(route);
      handleClose();
  }

  const performLogout = () => {
    dispatch(clearTodos());
    dispatch(logout());
  }

  useEffect(() => {
    //every session change, do not kep menu open!
    handleClose();
  }, [session]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => browseTo('/welcome')}>
          <img src={logo} className={classes.logo} alt="PowerList App" />
        </IconButton>
        <Typography variant="h6" color="inherit">
          PowerList App
        </Typography>

        <div className={classes.grow} />

        {session.isLogged ? (
          <div>
            <IconButton
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <Avatar alt={session.user.name} src={session.user.picture} />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={handleClose}>
              <MenuItem onClick={() => browseTo('/list')}>Lista de Tarefas</MenuItem>
              <MenuItem onClick={() => browseTo('/profile')}>Perfil</MenuItem>
              <MenuItem onClick={() => performLogout()}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button onClick={() => browseTo('/login')} color="inherit" type="button">
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
