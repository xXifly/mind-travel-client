import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Album from '../../../_models/album.model';
import IronImage from 'react-image-lazy-load-component';
import { CircularProgress } from '@material-ui/core';
// import Gallery from 'react-photo-gallery';
import Picture from '../../../_models/picture.model';
import classes from './AlbumViewer.module.css';

import Gallery from 'react-grid-gallery';

interface IAlbumViewerProps {
  album: Album;
}

const AlbumViewer = (props: IAlbumViewerProps) => {
  //   const picturesGallery: Picture[] = [];
  const picturesGallery: any = [];

  props.album.pictures.forEach((pictureKey: string) => {
    let randomRatio = Math.floor(Math.random() * 0.5) + 0.5;

    picturesGallery.push({
      src:
        'http://192.168.1.42:8080/api/pictures/' +
        encodeURIComponent(pictureKey),
      //   height: 1,
      //   width: randomWitdh
      thumbnail:
        'http://192.168.1.42:8080/api/pictures/thumb/' +
        encodeURIComponent(pictureKey),
      //generate a random width to get a masonry effect
      thumbnailWidth: [200, 225, 250, 275, 300][
        Math.floor(Math.random() * 4) + 1
      ],
      thumbnailHeight: 200
    });
  });

  return (
    <div className={classes['gallery']}>
      <Gallery images={picturesGallery} enableImageSelection={false} />
    </div>
    //  <div className={classes['gallery-container']}>
    //     <Gallery photos={picturesGallery} />
    //   </div>
  );
};
export default AlbumViewer;
