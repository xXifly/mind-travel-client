import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumService from '../_services/album.service';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import classes from './AlbumPage.module.css';
import { Typography, CircularProgress } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import Album from '../_models/album.model';
import { timeout } from 'q';

interface IAlbumPageState {
  user: any;
  albums: Album[];
  isLoadingAlbums: boolean;
}

class AlbumPage extends Component<any, IAlbumPageState> {
  state = {
    user: {},
    albums: (null as unknown) as Album[],
    isLoadingAlbums: true
  };

  componentDidMount() {
    albumService.getAll().then((response: AxiosResponse) => {
      console.log('test');
      this.setState({
        user: JSON.parse(localStorage.getItem('user') || '{}'),
        albums: response.data
        // isLoadingAlbums: false
      });
      setTimeout(() => this.setState({ isLoadingAlbums: false }), 1000);
    });
  }

  render() {
    return (
      <>
        <h1>Album page</h1>
        {this.state.isLoadingAlbums ? (
          <div className={classes['circular-container']}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes['albums-container']}>
            {this.state.albums.map((album, index) => (
              <Card key={album.id} className={classes['album-card']}>
                <CardMedia
                  className={classes['album-card-media']}
                  image='https://source.unsplash.com/random/200x100'
                  title='Contemplative Reptile'
                />
                <CardContent>
                  <Typography>{album.name}</Typography>
                </CardContent>
                <CardActions>
                  <Button size='small'>Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )}
        <p>{/* <Link to='/'>Home</Link> */}</p>
        <Button variant='contained' color='primary'>
          Hello World (^o^)
        </Button>
      </>
    );
  }
}

export default AlbumPage;
