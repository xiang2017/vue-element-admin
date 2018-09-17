import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/knowledge',
    method: 'get',
    params: query
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/knowledge',
    method: 'post',
    data: data
  })
}

export function getKnowledgeInfo(id) {
  return request({
    url: '/knowledge/' + id,
    method: 'get'
  })
}

export function deleteKnowledge(id) {
  return request({
    url: '/knowledge/' + id,
    method: 'delete'
  })
}
