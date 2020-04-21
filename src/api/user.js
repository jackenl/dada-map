import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/map/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/map/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/map/user/logout',
    method: 'post'
  })
}

export function register() {
  return request({
    url: '/map/user/register',
    method: 'put'
  })
}