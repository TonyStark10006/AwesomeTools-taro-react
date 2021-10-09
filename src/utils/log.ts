import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

export const logError = (name: string, action: string, info: Error) => {
  if (info.message.length == 0) {
    info.message = 'empty'
  }
  let device: string = ''
  try {
    let deviceInfo = Taro.getSystemInfoSync()
    device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message)
  }
  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.error(time, name, action, info, device)
  // 如果使用了 第三方日志自动上报
  // if (typeof action !== 'object') {
  // fundebug.notify(name, action, info)
  // }
  // fundebug.notifyError(info, { name, action, device, time })
  if (typeof info === 'object') {
    info.message = JSON.stringify(info)
  }
}
