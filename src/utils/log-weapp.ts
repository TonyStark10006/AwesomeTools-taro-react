import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

const device = JSON.stringify(Taro.getSystemInfoSync())

const logger = Taro.getRealtimeLogManager()

const error = (msg: string) => {
  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  logger.error(device, '  ', time, '  message: ', msg)
}

const info = (msg: string) => {
  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  logger.info(time, '  message: ', msg)
}

const weappLog = { error, info }

export default weappLog
