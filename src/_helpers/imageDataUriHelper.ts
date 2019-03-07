export const getBase64UriFromImage = (
  imageBase64: string,
  responseHeader: string
) => {
  return (
    'data:' +
    responseHeader +
    ';base64, ' +
    Buffer.from(imageBase64, 'binary').toString('base64')
  );
};
