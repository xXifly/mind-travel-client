import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Album from '../../../_models/album.model';
import IronImage from 'react-image-lazy-load-component';
import { CircularProgress } from '@material-ui/core';
// import Gallery from 'react-photo-gallery';
import Picture from '../../../_models/picture.model';
import classes from './AlbumViewer.module.css';

import Gallery from 'react-grid-gallery';
import pictureService from '../../../_services/picture.service';
import { AxiosResponse } from 'axios';

import { getBase64UriFromImage } from '../../../_helpers/imageDataUriHelper';
interface IAlbumViewerProps {
  album: Album;
}

const AlbumViewer = (props: IAlbumViewerProps) => {
  //   const picturesGallery: Picture[] = [];
  const picturesGallery: any = [];

  let widthIterator = 0;
  let pictureDataBase64 = '';
  let pictureThumbDataBase64 = '';
  props.album.pictures.forEach((pictureKey: string) => {
    pictureService
      .getPicture(pictureKey)
      .then((response: AxiosResponse) => {
        pictureDataBase64 = getBase64UriFromImage(
          response.data,
          response.headers['content-type']
        );
      })
      .then(() => {
        pictureService
          .getPictureThumb(pictureKey)
          .then((response: AxiosResponse) => {
            pictureThumbDataBase64 = getBase64UriFromImage(
              response.data,
              response.headers['content-type']
            );
          });
      })
      .then(() => {
        //generate a 'random' width to get a masonry effect
        widthIterator = (widthIterator + 1) % 10;
        const picWidth = [200, 250, 300, 215, 255, 180, 225, 280, 240, 275][
          widthIterator
        ];

        picturesGallery.push({
          src: pictureDataBase64,
          //   height: 1,
          //   width: randomWitdh
          thumbnail: pictureThumbDataBase64,
          thumbnailWidth: picWidth,
          thumbnailHeight: 200
        });
      });
  });

  return (
    <div className={classes['gallery']}>
      <Gallery images={picturesGallery} enableImageSelection={false} />
    </div>
  );
};
export default AlbumViewer;
