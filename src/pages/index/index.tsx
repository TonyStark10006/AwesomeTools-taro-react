import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import { AtGridItem } from 'taro-ui/types/grid'
import Taro from '@tarojs/taro'
import './index.scss'

interface IndexState {
  data: AtGridItem[]
}

export default class Index extends Component<any, IndexState> {

  constructor(props: any) {
    super(props)
    this.state = {
      data: [
        {
          value: '随机密码生成',
          iconInfo: {
            size: 30,
            value: 'lock'
          },
          url: '/pages/random-password-generation/index'
        },
        {
          value: '反馈',
          iconInfo: {
            size: 30,
            value: 'help'
          },
          url: '/pages/settings/feedback/index'
        },
        {
          value: '设置',
          iconInfo: {
            size: 30,
            value: 'settings'
          },
          url: '/pages/settings/index'
        }
      ]
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  private handleClick(value: AtGridItem, index: number): void {
    Taro.navigateTo({
      url: value.url
    })
  }

  render() {
    return (
      <View className='index'>
        <View className='header'>
          <View className='header__title'>很赞工具箱</View>
        </View>
        <View className='body'>
          <AtGrid data={this.state.data} onClick={this.handleClick.bind(this)} />
        </View>
      </View>
    )
  }
}
