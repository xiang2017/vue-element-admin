import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/labels',
    method: 'get',
    params: query
  })
}

export function fetchLable(id) {
  return request({
    url: '/label/' + id,
    method: 'get'
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/label',
    method: 'post',
    data: data
  })
}

export function deleteLabel(id) {
  return request({
    url: '/label/' + id,
    method: 'delete'
  })
}
