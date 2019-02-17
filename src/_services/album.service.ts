import { get } from './base.service';
import Album from '../_models/album.model';

const albumService = {
  /* albums/ GET  Retrieve all albums */
  getAll: () => {
    return get('/albums');
  }
};

export default albumService;
