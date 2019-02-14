import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:10010/v1';

// // return authorization header with basic auth credentials
// let user = JSON.parse(localStorage.getItem('user'));
// if (user && user.authdata) {
//     axios.defaults.headers.common['Authorization'] = 'Basic ' + user.authdata
// };


export default axios;