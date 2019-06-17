import { AxiosTransformer } from '../types'

// 定义一个 transform 函数来对请求数据和响应数据进行处理
// fns 表示一个或者多个转换函数
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
