import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export default http;