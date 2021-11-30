import Taro from '@tarojs/taro'

export const cRequest = function(
  url: string,
  data?: object,
  callback?: Function
) {
  return Taro.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function(res) {
      console.log(res)
      callback && callback()
    }
  })
}

export const cRequestAbort = function(task) {
  task.abort()
}
