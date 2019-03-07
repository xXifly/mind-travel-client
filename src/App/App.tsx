import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

import PrivateRoute from '../_components/PrivateRoute';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import AlbumPage from './AlbumPage/AlbumPage';

import User from '../_models/user.model';
import NavBar from '../_components/NavBar/NavBar';
import { render } from 'react-dom';
interface IAppState {
  currentUser: User | null;
}

class App extends Component<any, IAppState> {
  state = {
    currentUser: null
  };

  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem('jwt') || '{}'));
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('jwt') || '{}')
    });
  }

  DefaultContainer = () => {
    return <></>;
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/home' />} />
          <Route path='/login' component={LoginPage} />
          <Route>
            <>
              <NavBar />
              <PrivateRoute path='/home' component={HomePage} />
              <PrivateRoute path='/albums' component={AlbumPage} />
            </>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
