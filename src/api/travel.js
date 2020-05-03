import service from '@/utils/request'

const request = (data) => {
  data.url = '/travel' + data.url
  return service(data)
}

export function getTravelRecordsByPage(data) {
  return request({
    url: '/getRecordsByPage',
    method: 'get',
    params: {
      pageSize: data.pageSize,
      page: data.page,
    },
  })
}

export function getTravelReCordById(data) {
  return request({
    url: '/getRecordById',
    method: 'get',
    params: {
      id: data.id,
    },
  })
}

export function getTravelData() {
  return request({
    url: '/travelData',
    method: 'get',
  })
}

export function insertTravelRecord(data) {
  return request({
    url: '/insertRecord',
    method: 'post',
    data,
  })
}
