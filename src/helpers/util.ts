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

// 将 from 里的属性都扩展到 to 中
export function extend<T, U>(to: T, from: T): T & U {
  for (const key in from) {
    // TODO: as T & U
    to[key] = from[key]
  }
  return to as T & U
}
