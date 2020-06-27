import axios from 'axios'
import { Toast } from 'vant'

function getBaseURL() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001'
  } else if (process.env.NODE_ENV === 'production') {
    return 'http://120.79.60.230:3001'
  }
}

const service = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000,
})

const request = (options, loading = true) => {
  if (loading) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 2000,
    })
  }
  return service(options)
}

export const getList = (params) => {
  return request({
    url: '/meishi/getList',
    method: 'get',
    params
  })
}