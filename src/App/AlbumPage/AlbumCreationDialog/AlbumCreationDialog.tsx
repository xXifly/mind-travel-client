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
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
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
  handleSubmit: (albumName: string) => void;
}

interface IAlbumCreationDialogState {
  albumName: string;
}

class AlbumCreationDialog extends Component<
  IAlbumCreationDialogProps,
  IAlbumCreationDialogState
> {
  state = {
    albumName: '',
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Create an album</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please specify a name for your album, before uploading some
            pictures.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='albumName'
            label='Album name'
            type='text'
            value={this.state.albumName}
            onChange={event => this.setState({ albumName: event.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => this.props.handleSubmit(this.state.albumName)}
            color='primary'>
            Create &amp; Upload
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default AlbumCreationDialog;
