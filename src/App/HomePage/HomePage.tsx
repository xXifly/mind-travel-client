import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import userService from '../../_services/user.service';
import User from '../../_models/user.model';
import classes from './HomePage.module.css';
import { Paper, Typography } from '@material-ui/core';

interface IHomePageState {
  currentUser: User;
  users: User[];
  isLoadingUsers: boolean;
}

class HomePage extends Component<any, IHomePageState> {
  state = {
    currentUser: (null as unknown) as User,
    users: (null as unknown) as User[],
    isLoadingUsers: true,
  };

  componentDidMount() {
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('jwt') || '{}'),
    });
  }

  render() {
    return (
      <>
        <Paper className={classes['paper']} elevation={1}>
          <Typography variant='h5' component='h3'>
            Hello you :D
          </Typography>
          <Typography component='p'>
            This app is currently in development ! I hope you will enjoy it,
            feel free to share your feedback :)
          </Typography>
        </Paper>
        <div className={classes['animation-container']}>
          <img
            className={classes['animation']}
            src='https://i.giphy.com/media/sQ5jimwRnCqkw/giphy.webp'
          />
        </div>
      </>
    );
  }
}

export default HomePage;
