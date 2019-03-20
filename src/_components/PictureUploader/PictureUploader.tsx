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
import classes from './PictureUploader.module.css';
import CloseIcon from '@material-ui/icons/Close';

import { Uppy } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import AwsS3 from '@uppy/aws-s3';
import env from '../../_helpers/env.helper';

interface IPictureUploaderProps {
  open: boolean;
  handleClose: () => void;
  albumName: string;
}

interface IPictureUploaderState {
  uppy: Uppy;
}

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class PictureUploader extends Component<
  IPictureUploaderProps,
  IPictureUploaderState
> {
  state = {
    uppy: new Uppy().use(AwsS3, {
      serverUrl: env.apiUrl,
      serverHeaders: {
        Album: this.props.albumName,
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('jwt') || '{}'),
      },
    }),
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
              Upload pictures
            </Typography>
            <Button color='inherit' onClick={this.props.handleClose}>
              ok
            </Button>
          </Toolbar>
        </AppBar>
        <Dashboard uppy={this.state.uppy} />
      </Dialog>
    );
  }
}
export default PictureUploader;
