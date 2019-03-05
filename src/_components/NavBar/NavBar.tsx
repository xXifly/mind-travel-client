import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Tabs,
  Tab
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { userService } from '../../_services/user.service';
import classes from './NavBar.module.css';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Collections from '@material-ui/icons/Collections';
import Home from '@material-ui/icons/Home';

interface INavBarState {
  tabIndex: number;
  anchorEl: HTMLElement | null;
}

class NavBar extends Component {
  state = {
    tabIndex: 0,
    anchorEl: null
  };

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
                <Link {...props} to='/home' />
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
          {localStorage.getItem('jwt') && (
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
                <MenuItem
                  onClick={this.handleLogout}
                  component={({ innerRef, ...props }) => (
                    <Link {...props} to='/login' />
                  )}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
export default NavBar;
