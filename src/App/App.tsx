import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import PrivateRoute from '../_components/PrivateRoute';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import AlbumPage from '../AlbumPage/AlbumPage';

import classes from './App.module.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import User from '../_models/user.model';
import { IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Collections from '@material-ui/icons/Collections';
import Home from '@material-ui/icons/Home';
import { userService } from '../_services/user.service';

interface IAppState {
  tabIndex: number;
  currentUser: User | null;
  anchorEl: HTMLElement | null;
}

class App extends Component<any, IAppState> {
  state = {
    tabIndex: 1,
    currentUser: null,
    anchorEl: null
  };

  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem('user') || '{}'));
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('user') || '{}')
    });
  }

  handleChangeTab = (tabIndex: number) => {
    this.setState({ tabIndex });
  };

  handleOpenAccountMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseAccountMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    userService.logout();
    this.handleCloseAccountMenu();
  };

  render() {
    return (
      <Router>
        <>
          {localStorage.getItem('user') ? (
            <>
              <AppBar position='static'>
                <Toolbar>
                  <Tabs
                    className={classes['toolbar-tabs']}
                    value={this.state.tabIndex}
                    onChange={(e, tabIndex) => this.handleChangeTab(tabIndex)}>
                    <Tab
                      icon={<Home />}
                      label='Home'
                      component={({ innerRef, ...props }) => (
                        <Link {...props} to='/' />
                      )}
                    />
                    <Tab
                      icon={<Collections />}
                      label='Albums'
                      component={({ innerRef, ...props }) => (
                        <Link {...props} to='/albums' />
                      )}
                    />
                  </Tabs>
                  {localStorage.getItem('user') && (
                    <div>
                      <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup='true'
                        onClick={this.handleOpenAccountMenu}
                        color='inherit'>
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id='menu-appbar'
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleCloseAccountMenu}>
                        <MenuItem onClick={this.handleCloseAccountMenu}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  )}
                </Toolbar>
              </AppBar>
              <Route path='/albums' component={AlbumPage} />
            </>
          ) : (
            <Redirect
              to={{
                pathname: '/login'
              }}
            />
          )}
          <Route exact path='/login' component={LoginPage} />
        </>
      </Router>
    );
  }
}

export default App;
