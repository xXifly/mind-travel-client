import React, { Component } from 'react';

import userService from '../../_services/user.service';
import {
  Paper,
  Avatar,
  CssBaseline,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormControlLabel,
  Button,
  Checkbox
} from '@material-ui/core';
import BeachAccess from '@material-ui/icons/BeachAccess';

import classes from './LoginPage.module.css';
import { Redirect } from 'react-router';

interface ILoginPageState {
  username: string;
  password: string;
  submitted: boolean;
  loading: boolean;
  error: string;
  redirectToReferrer: boolean;
}

class LoginPage extends Component<any, ILoginPageState> {
  state = {
    username: '',
    password: '',
    submitted: false,
    loading: false,
    error: '',
    redirectToReferrer: false
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.error) this.setState({ error: '' });
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
        this.setState({ loading: false, redirectToReferrer: true });
      },
      error => this.setState({ error, loading: false })
    );
  };

  render() {
    if (this.state.redirectToReferrer) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to={from} />;
    } else {
      return (
        <CssBaseline>
          <Paper className={classes.paper}>
            <div className={classes['avatar-container']}>
              <img
                className={classes['avatar-img']}
                src='https://i.giphy.com/media/Cgf0AymdEvEVG/giphy.webp'
                alt='avatar'
              />
              {/* <BeachAccess /> */}
            </div>
            <Typography component='h1' variant='h5' className={classes.title}>
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl
                margin='normal'
                required
                fullWidth
                error={Boolean(this.state.error)}>
                <InputLabel htmlFor='username'>Username</InputLabel>
                <Input
                  id='username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl
                margin='normal'
                required
                fullWidth
                error={Boolean(this.state.error)}>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  name='password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Sign in
              </Button>
            </form>
          </Paper>
        </CssBaseline>
      );
    }
  }
}

export default LoginPage;
