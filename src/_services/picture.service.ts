import baseService from './base.service';

const pictureService = {
  /* get a picture and return base64 formatted data */
  getPicture: (pictureKey: string) => {
    return baseService.get('/pictures/' + encodeURIComponent(pictureKey), {
      responseType: 'arraybuffer'
    });
  }
};

export default pictureService;
