import React, { Component } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
} from '@material-ui/core';
import classes from './AlbumCreationDialog.module.css';
import CloseIcon from '@material-ui/icons/Close';

import { Uppy } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import AwsS3 from '@uppy/aws-s3';

interface IAlbumCreationDialogProps {
  open: boolean;
  handleClose: () => void;
}

interface IAlbumCreationDialogState {}

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class AlbumCreationDialog extends Component<
  IAlbumCreationDialogProps,
  IAlbumCreationDialogState
> {
  state = {
    uppy: new Uppy().use(AwsS3, {
      serverUrl: 'http://localhost:8080/',
      serverHeaders: {
        authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('jwt') || '{}'),
      },
    }),
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}>
        <AppBar className={classes['appBar']}>
          <Toolbar>
            <IconButton
              color='inherit'
              onClick={this.props.handleClose}
              aria-label='Close'>
              <CloseIcon />
            </IconButton>
            <Typography
              variant='h6'
              color='inherit'
              className={classes['flex']}>
              Sound
            </Typography>
            <Button color='inherit' onClick={this.props.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Dashboard uppy={this.state.uppy} />
        npm
      </Dialog>
    );
  }
}
export default AlbumCreationDialog;
