import axios from 'axios';

const API = axios.create({
  baseURL: 'https://portfolio-mysql.onrender.com'
});

export const fetchProjects = () => API.get('api/projects');
export const sendContact = (data) => API.post('api/contact', data);
