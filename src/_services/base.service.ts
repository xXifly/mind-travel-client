import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/';

const setAuthHeader = () => {
  // return authorization header with basic auth credentials
  let userToken = JSON.parse(localStorage.getItem('jwt') || '{}');
  if (userToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken;
  }
};

const baseService = {
  get(path: string) {
    setAuthHeader();
    return axios.get(path);
  },

  post(path: string, data: any) {
    setAuthHeader();
    return axios.post(path, data);
  }
};
export default baseService;
