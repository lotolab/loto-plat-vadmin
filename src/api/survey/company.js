import request from '@/utils/request'

// 查询公司信息列表
export function listCompany(query) {
  return request({
    url: '/survey/company/list',
    method: 'get',
    params: query
  })
}

// 查询公司信息详细
export function getCompany(compId) {
  return request({
    url: '/survey/company/' + compId,
    method: 'get'
  })
}

// 新增公司信息
export function addCompany(data) {
  return request({
    url: '/survey/company',
    method: 'post',
    data: data
  })
}

// 修改公司信息
export function updateCompany(data) {
  return request({
    url: '/survey/company',
    method: 'put',
    data: data
  })
}

// 删除公司信息
export function delCompany(compId) {
  return request({
    url: '/survey/company/' + compId,
    method: 'delete'
  })
}
