import service from '@/utils/request'

const request = (data) => {
  data.url = '/sport' + data.url
  return service(data)
}

export function getSportRecordsByPage(data) {
  return request({
    url: '/getRecordsByPage',
    method: 'get',
    params: {
      pageSize: data.pageSize,
      page: data.page
    }
  })
}

export function getSportRecordById(data) {
  return request({
    url: '/getRecordById',
    method: 'get',
    params: {
      id: data.id
    }
  })
}

export function getSportData() {
  return request({
    url: '/sportData',
    method: 'get'
  })
}

export function insertSportRecord(data) {
  return request({
    url: '/insertRecord',
    method: 'post',
    data
  })
}