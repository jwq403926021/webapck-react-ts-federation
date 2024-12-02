import Axios, { AxiosRequestConfig } from 'axios';
export declare const $get: (url: string, params?: any, options?: AxiosRequestConfig) => Promise<Axios.AxiosResponse<any, any>>;
export declare const $post: (url: string, params?: any, options?: AxiosRequestConfig) => Promise<Axios.AxiosResponse<any, any>>;
export declare const $postForm: (url: string, params?: any, options?: AxiosRequestConfig) => Promise<Axios.AxiosResponse<any, any>>;
