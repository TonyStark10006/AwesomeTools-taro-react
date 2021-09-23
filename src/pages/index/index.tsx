import { Component } from 'react'
import { View, Text } from '@tarojs/components'
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
          url: '../random-password-generation/index'
        },
        {
          value: '设置',
          iconInfo: {
            size: 30,
            value: 'settings'
          },
          url: '../settings/index'
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
        <AtGrid data={this.state.data} onClick={this.handleClick.bind(this)} />
      </View>
    )
  }
}
