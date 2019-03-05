export default function authHeader() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem('jwt'));

  if (user && user.authdata) {
    return { Authorization: 'Basic ' + user.authdata };
  } else {
    return {};
  }
}
