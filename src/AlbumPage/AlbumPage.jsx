import React from "react";
import { Link } from "react-router-dom";

import albumService from "../_services/album.service";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import classes from "./AlbumPage.module.css";
import { Typography } from "@material-ui/core";

class AlbumPage extends React.Component {
  state = {
    user: {},
    albums: [],
    loadingAlbums: true
  };

  componentDidMount() {
    albumService.getAll().then(reponse => {
      this.setState({
        user: JSON.parse(localStorage.getItem("user")),
        albums: reponse.data,
        loadingAlbums: false
      });
    });
  }

  render() {
    return (
      <>
        <h1>Album page</h1>
        {this.state.loadingAlbums ? (
          <em>Loading albums...</em>
        ) : (
          <div className={classes["albums-container"]}>
            {this.state.albums.map((album, index) => (
              <Card key={album.id} className={classes["album-card"]}>
                <CardMedia
                  className={classes["album-card-media"]}
                  image='https://picsum.photos/200/100'
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
        <p>
          <Link to='/'>Home</Link>
        </p>
        <Button variant='contained' color='primary'>
          Hello World (^o^)
        </Button>
      </>
    );
  }
}

export { AlbumPage };
