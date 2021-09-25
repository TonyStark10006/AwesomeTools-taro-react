import Taro from '@tarojs/taro'

export const cNavigateTo = (
  url: string,
  parameter: string = ''
  // sendData: any = {}
): void => {
  Taro.navigateTo({
    url: parameter == '' ? url : url + '?' + parameter
    // events: {
    //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    //   acceptDataFromOpenedPage: function (data) {
    //     console.log(data)
    //   },
    //   someEvent: function (data) {
    //     console.log(data)
    //   }
    // },
    // success: function (res) {
    //   // 通过eventChannel向被打开页面传送数据
    //   if (sendData != {})
    //     res.eventChannel.emit('acceptDataFromOpenerPage', sendData) //{ data: 'test' })
    // }
  })
}
