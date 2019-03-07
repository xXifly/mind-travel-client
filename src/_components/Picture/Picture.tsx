import React, { Component } from 'react';
import pictureService from '../../_services/picture.service';
import { AxiosResponse } from 'axios';
import { getBase64UriFromImage } from '../../_helpers/imageDataUriHelper';

interface IPictureProps {
  // S3 key of the picture
  pictureKey: string;
  // styles for <img/> component
  className: string;
}

interface IPictureState {
  pictureDataBase64: string;
}

class Picture extends Component<IPictureProps, IPictureState> {
  state = {
    pictureDataBase64: ''
  };
  componentDidMount() {
    pictureService
      .getPicture(this.props.pictureKey)
      .then((response: AxiosResponse) => {
        this.setState({
          pictureDataBase64: getBase64UriFromImage(
            response.data,
            response.headers['content-type']
          )
        });
      });
  }
  render() {
    return (
      <img
        className={this.props.className}
        src={this.state.pictureDataBase64}
      />
    );
  }
}
export default Picture;
