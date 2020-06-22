import axios from 'axios';

const api = axios.create({


  baseURL: 'https://pure-island-99817.herokuapp.com/'


});

export default api;