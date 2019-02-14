import {
    get
} from '../_helpers/api-backend';

const albumService = {
    getAll: () => {
        return get('/album/all');
    }
};

export default albumService;