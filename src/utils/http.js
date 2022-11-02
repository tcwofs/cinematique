import Axios from 'axios';
import { useToast } from 'vue-toastification';

const http = Axios.create({ baseURL: 'https://cinema-api-test.y-media.io/v1' });

http.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const content =
      error?.response?.data?.error_message ||
      'Unexpected error occurred. Try again later.';
    useToast().error(content);

    return Promise.reject(error);
  }
);

export default http;
