import { apiUrl } from '../_services/base.service';

export const getPictureUri = (pictureKey: string) => {
  return apiUrl + 'pictures/' + formatParameters(pictureKey);
};
export const getPictureThumbUri = (pictureKey: string) => {
  return apiUrl + 'pictures/thumb/' + formatParameters(pictureKey);
};

const formatParameters = (pictureKey: string) => {
  return (
    encodeURIComponent(pictureKey) +
    '/' +
    encodeURIComponent(JSON.parse(localStorage.getItem('jwt') || ''))
  );
};
