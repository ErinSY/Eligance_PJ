import axios from 'axios';

const API = axios.create({ baseURl: 'http://localhost:5001' });

API.interceptors.request.use(req => {
  if (localStorage.getItem('userToken')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('userToken')}`;
  }
  return req;
});

export default API;
