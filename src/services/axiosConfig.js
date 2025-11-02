import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Erro na API:', error.response.status, error.response.data);
    } else {
      console.error('Erro de rede ou servidor indisponível');
    }
    return Promise.reject(error);
  }
);

export default api;