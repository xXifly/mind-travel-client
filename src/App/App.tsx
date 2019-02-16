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

interface IAppState {
  tabIndex: number;
}

class App extends Component {
  state = {
    tabIndex: 1
  };

  handleChangeTab = (tabIndex: number) => {
    this.setState({ tabIndex });
  };

  render() {
    return (
      <>
        <AppBar position='static'>
          <Tabs
            value={this.state.tabIndex}
            onChange={(e, tabIndex) => this.handleChangeTab(tabIndex)}>
            <Tab label='Login' />
            <Tab label='Albums' />
            <Tab label='Item Three' />
          </Tabs>
        </AppBar>
        {this.state.tabIndex === 0 && <LoginPage />}
        {this.state.tabIndex === 1 && <AlbumPage />}
      </>
    );
  }
}

export default App;
