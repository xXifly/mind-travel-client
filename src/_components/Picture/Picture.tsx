import React, { Component } from 'react';
import pictureService from '../../_services/picture.service';
import { AxiosResponse } from 'axios';

interface IPictureProps {
  // S3 key of the picture
  pictureKey: string;
}

interface IPictureState {
  pictureDataBase84: string;
}

class Picture extends Component<IPictureProps, IPictureState> {
  state = {
    pictureDataBase84: ''
  };
  componentDidMount() {
    pictureService
      .getPicture(this.props.pictureKey)
      .then((response: AxiosResponse) => {
        this.setState({
          pictureDataBase84:
            'data:image/jpeg;base64, ' +
            Buffer.from(response.data, 'binary').toString('base64')
        });
        console.log(this.state.pictureDataBase84);
      });
  }
  render() {
    return <img src={this.state.pictureDataBase84} />;
  }
}
export default Picture;
