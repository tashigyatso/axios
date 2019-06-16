import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

// 处理 Content-Type 大小写
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toLowerCase() === normalizedName.toLowerCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 对 request 中的 headers 做一层加工
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  // 只有参数为普通对象时，才需要修改 Content-Type
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// 对 response 返回的 headers 进行处理，将字符串类型转变为对象类型
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)

  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

// 通过 deepMerge 的方式把 common、post 的属性拷贝到 headers 这一级，然后再将 common、post 这些属性删掉
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
