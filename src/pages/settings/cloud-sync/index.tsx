import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class CloudSync extends Component {

  constructor(props: any) {
    super(props)
    Taro.setNavigationBarTitle({
      title: '云同步设置'
    })
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='cloud-sync'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
