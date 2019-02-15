import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../_services/user.service';

interface IHomePageState {
  currentUser: any;
  users: any;
  isLoadingUsers: boolean;
}

class HomePage extends Component<any, IHomePageState> {
  state = {
    currentUser: null,
    users: null,
    isLoadingUsers: true
  };

  componentDidMount() {
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('user') || '{}')
    });
    userService.getAll().then((users: any) => this.setState({ users }));
  }

  render() {
    const { user, users } = this.state;
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React & Basic HTTP Authentication!!</p>
        <h3>Users from secure api end point:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.length && (
          <ul>
            {users.map((user, index) => (
              <li key={user.id}>{user.firstName + ' ' + user.lastName}</li>
            ))}
          </ul>
        )}
        <p>
          <Link to='/login'>Logout</Link>
          <br />
          <Link to='/album'>Album</Link>
        </p>
      </div>
    );
  }
}

export { HomePage };
