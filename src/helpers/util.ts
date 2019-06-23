const toString = Object.prototype.toString

// 是否为 Date 类型
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 是否为 object 类型
/* export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
} */

// 是否为一个普通 JSON 对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 是否是 FormData 上传文件
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

// 将 from 里的属性都扩展到 to 中
export function extend<T, U>(to: T, from: T): T & U {
  for (const key in from) {
    // TODO: as T & U
    to[key] = from[key]
  }
  return to as T & U
}

// 深拷贝
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
