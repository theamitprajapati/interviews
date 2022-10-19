import axios from 'axios'

const API_URL = `http://localhost:8000`;

console.log(API_URL)
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (!error.response) {
      //console.log("Please check your internet connection.");
      return Promise.reject('Network Error');
  }
    if (error.response.status === 401) {
      console.log('Error')
    }
    return Promise.reject(error);
  });

export default axios
