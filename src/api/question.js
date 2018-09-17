import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/questions',
    method: 'get',
    params: query
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/question',
    method: 'post',
    data: data
  })
}

export function getQuestionInfo(query) {
  return request({
    url: '/question',
    method: 'get',
    params: query
  })
}

export function deleteQuestion(id) {
  return request({
    url: '/question/' + id,
    method: 'delete'
  })
}
