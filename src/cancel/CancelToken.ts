import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

// 取消请求的相关逻辑
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    // 实例化一个 pending 状态的 Promise 对象
    this.promise = new Promise<Cancel>(resolve => {
      // 用一个 resolvePromise 变量指向 resolve 函数
      resolvePromise = resolve
    })

    // 执行 executor 函数，传入一个 cancel 函数
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      // 调用 resolvePromise 把 Promise 对象从 pending 状态变为 resolved 状态
      resolvePromise(this.reason)
    })
  }

  // 如果存在 this.reason，说明这个 token 已经被使用过了，直接抛错
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    // 实例化一个 CancelToken 类型的对象
    const token = new CancelToken(c => {
      // 将 cancel 指向参数 c 这个取消函数
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}
