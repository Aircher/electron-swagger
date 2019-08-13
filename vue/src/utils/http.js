import Axios from 'axios'
const instance = Axios.create({
  timeout: 1000 * 60
})
instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    window.$vm.$Message.error(error.message)
    return Promise.reject(error)
  }
)

export default instance
