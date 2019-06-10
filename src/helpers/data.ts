import { isPlainObject } from './util'

// 对 request 中的 data 做一层转换
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
