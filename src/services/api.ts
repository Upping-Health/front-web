import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: 'https://gestor-colmeia.squareweb.app/api/',
  //baseURL: 'http://localhost:80/api'
})

api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error

    if (response) {
      const originalConfig = config
      if (
        (response.status === 401 || response.status === 403) &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true

        try {
          const refreshResponse = await api.get('/users/refreshToken')
          const { token: newToken } = refreshResponse.data
          Cookies.set('token', newToken, { expires: 30 })

          api.defaults.headers.common['Authorization'] = 'Bearer ' + newToken

          return api(originalConfig)
        } catch (refreshError) {
          console.error('Refresh token error:', refreshError)
          return Promise.reject(refreshError)
        }
      }
    }

    return Promise.reject(error)
  },
)

export default api
