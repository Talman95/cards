import axios from 'axios';

export const config = axios.create({
  baseURL:
    // process.env.REACT_APP_LOCAL_URL,
    process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});
