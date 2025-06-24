import axios, { AxiosError } from 'axios';

export function setupAPIClient(signOut?: () => void) {
  const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
  });

  // Interceptor para adicionar o token a cada requisição
  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para tratar erros de resposta
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Se o ambiente for cliente, chame a função de logout
        if (typeof window !== 'undefined' && signOut) {
          signOut();
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
