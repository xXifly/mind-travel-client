import baseService from './base.service';
import hash from 'hash.js';

const userService = {
  login: (username: string, password: string) => {
    // user sha512 to avoid to send clear password to server
    password = hash
      .sha512()
      .update(password)
      .digest('hex');
    return baseService
      .post('/users/authenticate', { username, password })
      .then(response => {
        localStorage.setItem('jwt', JSON.stringify(response.data.token));
        return;
      });
  },

  logout: () => {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
  },
};
export default userService;
