import baseService from './base.service';

const userService = {
  login: (username: string, password: string) => {
    return baseService
      .post('/users/authenticate', { username, password })
      .then(response => {
        localStorage.setItem('jwt', JSON.stringify(response.data.token));
        return response.data.token;
      })
      .catch(error => console.log(error));
  },

  logout: () => {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
  }
};
export default userService;
