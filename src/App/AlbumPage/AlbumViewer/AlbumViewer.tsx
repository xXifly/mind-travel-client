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

  let widthIterator = 0;

  props.album.pictures.forEach((pictureKey: string) => {
    let randomRatio = Math.floor(Math.random() * 0.5) + 0.5;

    //generate a 'random' width to get a masonry effect
    widthIterator = (widthIterator + 1) % 10;
    const picWidth = [200, 250, 300, 215, 255, 180, 225, 280, 240, 275][
      widthIterator
    ];

    picturesGallery.push({
      src:
        'http://192.168.1.42:8080/api/pictures/' +
        encodeURIComponent(pictureKey),
      //   height: 1,
      //   width: randomWitdh
      thumbnail:
        'http://192.168.1.42:8080/api/pictures/thumb/' +
        encodeURIComponent(pictureKey),
      thumbnailWidth: picWidth,
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
