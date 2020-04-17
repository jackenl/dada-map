import axios from 'axios'
import { Toast } from 'vant';
import { getToken, removeToken } from '@/utils/auth';

function getBaseURL() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else if (process.env.NODE_ENV === 'production') {
    return 'http://120.79.60.230/api'
  }
}

const service = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['X-Token'] = token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code + '' !== '200') {
      Toast({
        message: res.msg || 'Error',
        duration: 2000
      })

      // need to re-login
      if (res.code + '' === '401') {
        Toast({
          message: '你需要重新登陆',
          duration: 2000
        })
        removeToken()
        location.reload() // reload to login
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return Promise.resolve(res.data);
    }
  },
  error => {
    console.log(error) // for debug
    Toast({
      message: error.message,
      duration: 2000
    })
    return Promise.resolve(error)
  }
)

export default service
