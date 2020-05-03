import service from '@/utils/request'

const request = (data) => {
  data.url = '/users' + data.url
  return service(data)
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/userInfo',
    method: 'get',
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}