import Axios, {AxiosRequestConfig} from 'axios'
const axios = Axios.create({
  // add some config if you need
})
axios.interceptors.request.use(config => {
  config.headers.traceid = crypto.randomUUID()
  return config
})
axios.interceptors.response.use(res => {
  return res
}, err => {
  console.error('Axios response interceptors error:', err)
})
export const $get = (url: string, params?, options?: AxiosRequestConfig) => {
  return axios.post(url, params, options)
}
export const $post = (url: string, params?, options?: AxiosRequestConfig) => {
  return axios.post(url, params, options)
}
export const $postForm = (url: string, params?, options?: AxiosRequestConfig) => {
  const fd = new FormData()
  for (const [k, v] of Object.entries<string | Blob>(params)) {
    fd.append(k, v)
  }
  return axios.post(url, fd, options)
}

