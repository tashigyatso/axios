import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 在执行 xhr 函数前，先执行 processConfig
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 对 config 中的数据做处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 修改 url
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 转换 response body 的数据
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
