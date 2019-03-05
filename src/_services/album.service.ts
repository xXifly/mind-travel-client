import baseService from './base.service';
import Album from '../_models/album.model';

const albumService = {
  /* albums/ GET  Retrieve all albums */
  getAll: () => {
    return baseService.get('/albums');
  }
};

export default albumService;
