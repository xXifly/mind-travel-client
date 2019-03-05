import authHeader from '../_helpers/auth-header';
import baseService from './base.service';

export const userService = {
  login,
  logout,
  getAll
};

const apiUrl = 'http://localhost:8080/api';

function login(username, password) {
  return baseService
    .post('/users/authenticate', { username, password })
    .then(response => {
      // user.authdata = window.btoa(username + ':' + password);
      localStorage.setItem('jwt', JSON.stringify(response.data.token));
      return response.data.token;
    })
    .catch(error => console.log(error));

  // const requestOptions = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     username,
  //     password
  //   })
  // };

  // return fetch(`${apiUrl}/users/authenticate`, requestOptions)
  //   .then(handleResponse)
  //   .then(user => {
  //     console.log('TESTEST' + user);
  //     // login successful if there's a user in the response
  //     if (user) {
  //       // store user details and basic auth credentials in local storage
  //       // to keep user logged in between page refreshes
  //       user.authdata = window.btoa(username + ':' + password);
  //       localStorage.setItem('user', JSON.stringify(user));
  //     }

  //     return user;
  // });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
