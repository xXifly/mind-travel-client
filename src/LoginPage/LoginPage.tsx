import React, { Component } from 'react';

import { userService } from '../_services/user.service';

interface ILoginPageState {
  username: string;
  password: string;
  submitted: boolean;
  loading: boolean;
  error: string;
}

class LoginPage extends Component<any, ILoginPageState> {
  state = {
    username: '',
    password: '',
    submitted: false,
    loading: false,
    error: ''
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        this.setState({ username: value });
        break;
      case 'password':
        this.setState({ password: value });
        break;
    }
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({ submitted: true });

    // stop here if form is invalid
    if (!(this.state.username && this.state.password)) {
      return;
    }

    this.setState({ loading: true });
    userService.login(this.state.username, this.state.password).then(
      user => {
        this.setState({ loading: false });
      },
      error => this.setState({ error, loading: false })
    );
  };

  render() {
    return (
      <div className='col-md-6 col-md-offset-3'>
        <div className='alert alert-info'>
          Username: test
          <br />
          Password: test
        </div>
        <h2>Login</h2>
        <form name='form' onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' +
              (this.state.submitted && !this.state.username ? ' has-error' : '')
            }>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='form-control'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.submitted && !this.state.username && (
              <div className='help-block'>Username is required</div>
            )}
          </div>
          <div
            className={
              'form-group' +
              (this.state.submitted && !this.state.password ? ' has-error' : '')
            }>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.submitted && !this.state.password && (
              <div className='help-block'>Password is required</div>
            )}
          </div>
          <div className='form-group'>
            <button className='btn btn-primary' disabled={this.state.loading}>
              Login
            </button>
            {this.state.loading && (
              <img src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' />
            )}
          </div>
          {this.state.error && (
            <div className={'alert alert-danger'}>{this.state.error}</div>
          )}
        </form>
      </div>
    );
  }
}

export default LoginPage;
