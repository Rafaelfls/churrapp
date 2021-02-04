import axios from 'axios';

// // Prod
// const api = axios.create({baseURL: 'https://churrapp-back-prod.herokuapp.com/'});

// Dev
const api = axios.create({baseURL: 'https://churrapp-back-dev.herokuapp.com/'});

export default api;