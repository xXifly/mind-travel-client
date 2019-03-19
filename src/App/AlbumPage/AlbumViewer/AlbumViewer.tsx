import React, { Component } from 'react';
import Album from '../../../_models/album.model';
import classes from './AlbumViewer.module.css';
import Gallery from 'react-grid-gallery';
import {
  getPictureUri,
  getPictureThumbUri,
} from '../../../_helpers/pictureUriHelper';
import { Button } from '@material-ui/core';

interface IAlbumViewerProps {
  album: Album;
}

interface IAlbumViewerState {
  picturesGallery: any;
}

class AlbumViewer extends Component<IAlbumViewerProps, IAlbumViewerState> {
  state = {
    picturesGallery: [] as any,
  };
  componentWillMount() {
    //generate a 'random' width to get a masonry effect
    const picturesGallery: any = [];
    let widthIterator = 0;
    this.props.album.pictures.forEach((pictureKey: string) => {
      widthIterator = (widthIterator + 1) % 10;
      const picWidth = [200, 250, 300, 215, 255, 180, 225, 280, 240, 275][
        widthIterator
      ];
      const pictureSrc = getPictureUri(pictureKey);
      const pictureThumb = getPictureThumbUri(pictureKey);
      encodeURIComponent(JSON.parse(localStorage.getItem('jwt') || ''));
      const newPicture = {
        src: pictureSrc,
        //   height: 1,
        //   width: randomWitdh
        thumbnail: pictureThumb,
        thumbnailWidth: picWidth,
        thumbnailHeight: 200,
      };
      picturesGallery.push(newPicture);
    });
    this.setState({ picturesGallery });
  }

  render() {
    return (
      <>
        <div className={classes['gallery']}>
          <Gallery
            images={this.state.picturesGallery}
            enableImageSelection={false}
          />
        </div>
      </>
    );
  }
}
export default AlbumViewer;
