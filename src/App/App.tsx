import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

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

  handleChangeTab = (tabIndex: number) => {
    this.setState({ tabIndex });
  };

  handleAccountMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <>
        <AppBar position='static'>
          <Toolbar>
            <Tabs
              className={classes['toolbar-tabs']}
              value={this.state.tabIndex}
              onChange={(e, tabIndex) => this.handleChangeTab(tabIndex)}>
              <Tab icon={<Home />} label='Home' />
              <Tab icon={<Collections />} label='Albums' />
              {/* <Tab label='Item Three' /> */}
            </Tabs>
            {/* {this.state.currentUser && ( */}
            {true && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup='true'
                  onClick={this.handleAccountMenu}
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
                  open={Boolean(this.props.anchorEl)}
                  onClose={this.handleClose}>
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {this.state.tabIndex === 0 && <LoginPage />}
        {this.state.tabIndex === 1 && <AlbumPage />}
      </>
    );
  }
}

export default App;
