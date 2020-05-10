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
 * 获取分类信息数据接口
 */
export function DeleteCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}