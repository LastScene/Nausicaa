import axios from 'axios';

export const createHttp = ({ baseURL }) => {
    const httpInstance = axios.create({
        baseURL
    });
    httpInstance.interceptors.response.use(
        (response) => {
            return Promise.resolve(response.data);
        },
        ({ response }) => {
            return Promise.reject(response);
        }
    );
    return httpInstance;
};

export const setToken = (httpService, token) => {
    httpService.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = (httpService, token) => {
    httpService.defaults.headers.common.Authorization = null;
};

export const setParam = (httpSerivce, key, value) => {
    httpSerivce.interceptors.request.use((config) => {
        config.params = config.params ?? {};
        config.params[key] = value;
        return config;
    });
};
