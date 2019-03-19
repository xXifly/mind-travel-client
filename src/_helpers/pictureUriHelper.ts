import env from './env.helper';

export const getPictureUri = (pictureKey: string) => {
  return env.apiEndpoint + '/pictures/' + formatParameters(pictureKey);
};
export const getPictureThumbUri = (pictureKey: string) => {
  return env.apiEndpoint + '/pictures/thumb/' + formatParameters(pictureKey);
};

const formatParameters = (pictureKey: string) => {
  return (
    encodeURIComponent(pictureKey) +
    '/' +
    encodeURIComponent(JSON.parse(localStorage.getItem('jwt') || ''))
  );
};
