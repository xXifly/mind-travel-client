import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.42:8080/api/';

function setAuthHeader() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && user.authdata) {
    axios.defaults.headers.common['Authorization'] = 'Basic ' + user.authdata;
  }
}

export function get(path: string) {
  setAuthHeader();
  return axios.get(path);
}
