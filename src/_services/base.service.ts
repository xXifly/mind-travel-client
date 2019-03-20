import axios, { AxiosRequestConfig } from 'axios';
import env from '../_helpers/env.helper';

axios.defaults.baseURL = env.apiUrl + '/api';

const setAuthHeader = () => {
  // return authorization header with basic auth credentials
  let userToken = JSON.parse(localStorage.getItem('jwt') || '{}');
  if (userToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken;
  }
};

const baseService = {
  get(path: string, config?: AxiosRequestConfig) {
    setAuthHeader();
    return axios.get(path, config);
  },

  post(path: string, data: any) {
    setAuthHeader();
    return axios.post(path, data);
  },
};
export default baseService;
