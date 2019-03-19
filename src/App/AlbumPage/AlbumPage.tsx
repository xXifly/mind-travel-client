import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import albumService from '../../_services/album.service';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import classes from './AlbumPage.module.css';
import {
  Typography,
  CircularProgress,
  CardActionArea,
  Paper,
} from '@material-ui/core';
import { AxiosResponse, AxiosError } from 'axios';
import Album from '../../_models/album.model';
import AlbumViewer from './AlbumViewer/AlbumViewer';
import Error from '@material-ui/icons/Error';
import env from '../../_helpers/env.helper';
import { getPictureUri } from '../../_helpers/pictureUriHelper';

interface IAlbumPageState {
  user: any;
  albums: Album[];
  isLoading: boolean;
  isAlbumSelected: boolean;
  albumSelected: Album;
  hasLoadingFailed: boolean;
}

class AlbumPage extends Component<any, IAlbumPageState> {
  state = {
    user: {},
    albums: (null as unknown) as Album[],
    isLoading: true,
    isAlbumSelected: false,
    albumSelected: (null as unknown) as Album,
    hasLoadingFailed: false,
  };

  componentDidMount() {
    this.handleGetAllAlbums();
  }

  handleGetAllAlbums = () => {
    this.setState({
      isLoading: true,
      hasLoadingFailed: false,
    });
    albumService
      .getAll()
      .then((response: AxiosResponse) => {
        this.setState({
          user: JSON.parse(localStorage.getItem('jwt') || '{}'),
          albums: response.data,
          isLoading: false,
        });
        // // retrieve image thumb data
        // response.data.forEach((album: Album) => {
        //   pictureService.getPicture(album.thumbnail);
        // });
      })
      .catch((error: AxiosError) => {
        this.setState({ hasLoadingFailed: true, isLoading: false });
      });
  };

  handleSelectAlbum(album: Album, history: any) {
    this.setState({
      albumSelected: album,
      isAlbumSelected: true,
      // isLoading: true
    });
    history.push('/albums/' + album.key);
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div className={classes['circular-container']}>
            <CircularProgress />
          </div>
        ) : this.state.hasLoadingFailed ? (
          <Paper className={classes['error-paper']} elevation={1}>
            <Error className={classes['error-paper-icon']} />
            Cannot load albums
            <Button onClick={this.handleGetAllAlbums}>Retry</Button>
          </Paper>
        ) : this.state.isAlbumSelected ? (
          <AlbumViewer album={this.state.albumSelected} />
        ) : (
          // TODO place below code in AlbumSelector
          <div className={classes['albums-container']}>
            {this.state.albums.map((album, index) => (
              <Card key={index} className={classes['album-card']}>
                <Route
                  // 'history' is used to set url to /albums/:album.key
                  render={({ history }) => (
                    <CardActionArea
                      onClick={() => this.handleSelectAlbum(album, history)}>
                      <CardMedia
                        className={classes['album-card-media']}
                        image={getPictureUri(album.thumbnail)}
                        title='Contemplative Reptile'
                      />
                      <CardContent>
                        {/* <Picture
                          className={classes['album-card-image']}
                          pictureKey={album.thumbnail}
                        /> */}
                        <Typography>{album.key}</Typography>
                      </CardContent>
                    </CardActionArea>
                  )}
                />
              </Card>
            ))}
          </div>
        )}
        <p>{/* <Link to='/'>Home</Link> */}</p>
        {/* <Button variant='contained' color='primary'>
          Hello World (^o^)
        </Button> */}
      </>
    );
  }
}

export default AlbumPage;
