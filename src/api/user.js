import service from "@/utils/request";


/**
 * 获取角色信息
 */
export function GetRole(data = {}) {
  return service.request({
    method: "post",
    url: "/role/",
    data
  })
}

/**
 * 获取用户列表
 */
export function GetuserList(data = {}) {
  return service.request({
    method: "post",
    url: "/user/getList/",
    data
  })
}

/**
 * 添加用户
 */
export function AddUser(data = {}) {
  return service.request({
    method: "post",
    url: "/user/add/",
    data
  })
}

/**
 * 编辑用户
 */
export function EditUser(data = {}) {
  return service.request({
    method: "post",
    url: "/user/edit/",
    data
  })
}

/**
 * 删除用户
 */
export function DeleteUser(data) {
  return service.request({
    method: "post",
    url: "/user/delete/",
    data
  })
}

/**
 * 用户禁启用
 */
export function UserActives(data) {
  return service.request({
    method: "post",
    url: "/user/actives/",
    data
  })
}