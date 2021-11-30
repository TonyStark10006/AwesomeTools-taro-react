import { Component } from 'react'
import { CommonEventFunction, Radio, RadioGroup, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton, AtImagePicker, AtModal, AtTextarea } from 'taro-ui'
import { File } from 'taro-ui/types/image-picker'
import xss from 'xss'
import { cUploadTask, uploaderHideLoading, uploadTaskProgress } from '@utils/uploader'
import { cRequest } from '@utils/request'
import { cShowToast } from '@utils'
import { feedbackUrl } from '../../../custom.config'
import './index.scss'

interface FeedbackState {
  files: File[],
  type: {}[],
  selectedType: string
  QAA: string
  modalStatus: boolean
}

export default class Feedback extends Component<any, FeedbackState> {

  constructor(props: any) {
    super(props)
    Taro.setNavigationBarTitle({ title: '反馈' })
    this.state = {
      files: [],
      type: [
        { value: 'question', checked: true },
        { value: 'advice', checked: false }
      ],
      selectedType: 'question',
      QAA: '',
      modalStatus: false
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  private handleChange(stateName: string, value: string): void {
    this.setState({
      [stateName]: value
    })
  }

  private onChange(files: any): void {
    console.log(files);

    this.setState({
      files
    })
  }

  private onRadioChange(e: CommonEventFunction<any>): void {
    console.log(e)
    this.setState({ selectedType: e.detail.value })
    setTimeout(() => {
      console.log(this.state.selectedType)
    }, 1000);
  }

  private handleReset(): void {
    this.setState({
      files: [],
      type: [
        { value: 'question', checked: true },
        { value: 'advice', checked: false }
      ],
      selectedType: 'question',
      QAA: ''
    })
  }

  private uploadForm(): Taro.RequestTask<any> {
    return cRequest(feedbackUrl,
      {
        type: xss(this.state.selectedType),
        content: xss(this.state.QAA),
        picAmount: this.state.files.length
      })
  }

  private uploadPicture(): any[] {
    let files = this.state.files
    let taskQueue: Array<any> = []
    for (let i = 0; i < files.length; i++) {
      let filePath = files[i].url;
      taskQueue[i] = cUploadTask(feedbackUrl, filePath, 'pic' + i.toString())
    }
    return taskQueue
  }

  private async handleCommit() {
    if (this.state.QAA.length == 0) {
      cShowToast('请填写内容')
      return
    }
    let formQueue = this.uploadForm()

    let taskQueue: Array<any> = []
    taskQueue.push(formQueue)
    if (this.state.files.length > 0) {
      let picQueue = this.uploadPicture()
      uploadTaskProgress(picQueue[picQueue.length - 1])
      taskQueue.concat(picQueue)
    }

    return await Promise.all(taskQueue).then((res) => {
      console.log(res)
      uploaderHideLoading()
      this.openModal()
    })
  }

  private abortUploading() {

  }

  private closeModal(): void {
    this.setState({
      modalStatus: false
    })
  }

  private openModal(): void {
    this.setState({
      modalStatus: true
    })
  }


  render() {
    return (
      <View className='feedback'>
        <View className='panel'>
          <View className='panel__title'>请选择业务类型</View>
          <View className='panel__content'>
            <RadioGroup onChange={this.onRadioChange.bind(this)} style='font-size: 32rpx;'>
              <Radio value={this.state.type[0].value} checked={this.state.type[0].checked} color='#6190e8'>反馈问题</Radio>
              <Radio value={this.state.type[1].value} checked={this.state.type[1].checked} color='#6190e8' style='margin-left: 20rpx'>投诉建议</Radio>
            </RadioGroup>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>问题或建议具体描述</View>
          <View className='panel__content'>
            <AtTextarea
              value={this.state.QAA}
              onChange={this.handleChange.bind(this, 'QAA')}
              maxLength={200}
              placeholder='请填问题或建议'
            />
          </View>
        </View>

        <View className='panel'>
          <View className='panel__title'>附件图片(可选)</View>
          <View className='panel__content'>
            <AtImagePicker
              files={this.state.files}
              onChange={this.onChange.bind(this)}
            />
          </View>
        </View>

        <View className='panel'>
          <View className='panel__content'>
            <View className='btn-item'>
              <AtButton loading={false} type='primary' onClick={this.handleCommit.bind(this)}>提交</AtButton>
            </View>
            <View className='btn-item'>
              <AtButton type='secondary' onClick={this.handleReset.bind(this)}>重置</AtButton>
            </View>
          </View>
        </View>

        <AtModal
          isOpened={this.state.modalStatus}
          content={this.state.selectedType == 'question' ?
            '上传完成，感谢你的反馈' : '上传完成，感谢你的建议'}
          onClose={this.closeModal.bind(this, 3, 'Modal被关闭了')}
          // onCancel={this.handleModal.bind(this, 3, '点击了取消')}
          onConfirm={this.closeModal.bind(this, 3, '点击了确认')}
          // cancelText='取消'
          confirmText='确认'
        ></AtModal>
      </View >
    )
  }
}
