import Taro, { UploadTask } from '@tarojs/taro'

export const cUploadTask = function(
  url: string,
  filePath: string,
  name: string,
  callback?: CallableFunction
) {
  return Taro.uploadFile({
    url: url, //仅为示例，非真实的接口地址
    filePath: filePath,
    name: name,
    // formData: {
    //   user: 'test'
    // },
    success(res) {
      const data = res.data
      callback && callback()
      //do something
    }
  })
}

// only weapp blow
export const uploadTaskProgress = function(task): void {
  task.progress(res => {
    uploaderShowLoading(res.progress)
    console.log('上传进度', res.progress)
    console.log('已经上传的数据长度', res.totalBytesSent)
    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
  })
}

const uploadTaskAbort = function(task) {
  task.abort() // 取消上传任务
}

const showModal = function(progress: number) {
  Taro.showModal({
    content: '上传进度  ' + progress.toString() + '%',
    success: function(res) {
      res.cancel && uploadTaskAbort(cUploadTask)
    }
  })
}

export const uploaderShowLoading = (progress: number, msg?: string) => {
  Taro.showLoading({
    title: msg
      ? msg + '上传中 ' + progress.toString() + '%'
      : '上传中 ' + progress.toString() + '%'
  })
}

export const uploaderHideLoading = () => {
  Taro.hideLoading()
}
