import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080'
});

export const fetchProjects = () => API.get('api/projects');
export const sendContact = (data) => API.post('api/contact', data);
