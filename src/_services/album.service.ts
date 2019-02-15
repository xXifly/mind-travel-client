import { get } from './base.service';
import Album from '../_models/album.model';

const albumService = {
  getAll: () => {
    return get('/album/all');
  }
};

export default albumService;
