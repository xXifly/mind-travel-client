import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumService from '../_services/album.service';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import classes from './AlbumPage.module.css';
import {
  Typography,
  CircularProgress,
  CardActionArea
} from '@material-ui/core';
import { AxiosResponse } from 'axios';
import Album from '../_models/album.model';
import { timeout } from 'q';
import AlbumViewer from './AlbumViewer/AlbumViewer';

interface IAlbumPageState {
  user: any;
  albums: Album[];
  isLoading: boolean;
  isAlbumSelected: boolean;
  albumSelected: Album;
}

class AlbumPage extends Component<any, IAlbumPageState> {
  state = {
    user: {},
    albums: (null as unknown) as Album[],
    isLoading: true,
    isAlbumSelected: false,
    albumSelected: (null as unknown) as Album
  };

  componentDidMount() {
    albumService.getAll().then((response: AxiosResponse) => {
      this.setState({
        user: JSON.parse(localStorage.getItem('user') || '{}'),
        albums: response.data,
        isLoading: false
      });
      // setTimeout(() => this.setState({ isLoading: false }), 1000);
    });
  }

  handleSelectAlbum(album: Album) {
    this.setState({
      albumSelected: album,
      isAlbumSelected: true
      // isLoading: true
    });
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div className={classes['circular-container']}>
            <CircularProgress />
          </div>
        ) : this.state.isAlbumSelected ? (
          <AlbumViewer album={this.state.albumSelected} />
        ) : (
          // TODO place below code in AlbumSelector
          <div className={classes['albums-container']}>
            {this.state.albums.map((album, index) => (
              <Card className={classes['album-card']}>
                <CardActionArea onClick={() => this.handleSelectAlbum(album)}>
                  <CardMedia
                    className={classes['album-card-media']}
                    image={
                      'http://192.168.1.42:8080/api/pictures/' +
                      encodeURIComponent(album.thumbnail)
                    }
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography>{album.key}</Typography>
                  </CardContent>
                </CardActionArea>
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
