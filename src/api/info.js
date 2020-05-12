import service from '@/utils/request'
/**
 * 信息分类添加一级
 */
export function AddfirstCategoty(data) {
  return service.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data
  })
}

/**
 * 获取分类信息数据接口
 */
export function GetCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/getCategory/',
    data
  })
}

/**
 * 获取分类信息数据接口
 */
export function GetCategoryAll(data) {
  return service.request({
    method: 'post',
    url: '/news/getCategoryAll/',
    data
  })
}

/**
 * 编辑分类信息数据接口
 */
export function EditCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/editCategory/',
    data
  })
}

/**
 * 删除分类信息数据接口
 */
export function DeleteCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}

/**
 * 新增信息数据接口
 */
export function AddInfo(data) {
  return service.request({
    method: 'post',
    url: '/news/add/',
    data
  })
}


/**
 * 编辑信息数据接口
 */
export function EditInfo(data) {
  return service.request({
    method: 'post',
    url: '/news/editInfo/',
    data
  })
}

/**
 * 删除/批量信息数据接口  {id: ''} {id: ['','','']}
 */
export function DeleteInfo(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteInfo/',
    data
  })
}

/**
 * 获取信息列表
 */
export function GetInfoList(data) {
  return service.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}

/**
 * 添加分类子级接口
 */
export function AddChildrenCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/addChildrenCategory/',
    data
  })
}