import request from '@/utils/request'

// 查询前端用户列表
export function listUser(query) {
  return request({
    url: '/cuser/user/list',
    method: 'get',
    params: query
  })
}

// 查询前端用户详细
export function getUser(cid) {
  return request({
    url: '/cuser/user/' + cid,
    method: 'get'
  })
}

// 新增前端用户
export function addUser(data) {
  return request({
    url: '/cuser/user',
    method: 'post',
    data: data
  })
}

// 修改前端用户
export function updateUser(data) {
  return request({
    url: '/cuser/user',
    method: 'put',
    data: data
  })
}

// 删除前端用户
export function delUser(cid) {
  return request({
    url: '/cuser/user/' + cid,
    method: 'delete'
  })
}
