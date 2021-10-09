import Taro from '@tarojs/taro'
import weappLog from './log-weapp'

export const cSetStorage = (key: string, data: any): void => {
  Taro.setStorage({
    key: key,
    data: data,
    fail: res => {
      console.log(res)
      process.env.TARO_ENV === 'weapp' && weappLog.error(res.errMsg)
    }
  })
}

export const setPwdToClipBorad = (data: string): void => {
  Taro.setClipboardData({
    data: data,
    success() {
      Taro.showToast({
        title: '已写入到粘贴板',
        icon: 'success',
        duration: 2000
      })
    },
    fail(res) {
      console.log(res)
      process.env.TARO_ENV === 'weapp' && weappLog.error(res.errMsg)
    }
  })
}
