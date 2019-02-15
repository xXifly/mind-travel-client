import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from '../_components/PrivateRoute';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import AlbumPage from '../AlbumPage/AlbumPage';

import classes from './App.module.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function LinkTab(props) {
  return (
    <Tab component='a' onClick={event => event.preventDefault()} {...props} />
  );
}

class App extends Component {
  render() {
    return (
      <div className={classes['background']}>
        <AppBar position='static'>
          <Tabs>
            <LinkTab label='login' href='login' />
            <LinkTab label='album' href='album' />
          </Tabs>
        </AppBar>
        <div>This is a light header</div>
        <div className={classes['page-container']}>
          <Router>
            <div>
              <PrivateRoute exact path='/' component={HomePage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/album' component={AlbumPage} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
