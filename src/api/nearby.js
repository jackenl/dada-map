import service from '@/utils/request'

const request = (data) => {
  data.url = '/nearby' + data.url
  return service(data)
}

export function recommend() {
  return request({
    url: '/recommend',
    method: 'get',
  })
}
