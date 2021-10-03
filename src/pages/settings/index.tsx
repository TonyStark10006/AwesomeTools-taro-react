import { Component } from 'react'
import { View, Text } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import { AtList, AtListItem } from 'taro-ui'
import { cNavigateTo } from '@utils/navigation'
import { sliceStore } from '@state/store'
import './index.scss'


export default class Settings extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='settings'>
        <AtList>
          <AtListItem title='深色模式' note='深色背景 可按时间开启' arrow='right' />
          <AtListItem onClick={() => {
            console.log(sliceStore.getState())
          }} title='密码锁' note='进入工具箱或者切换回工具箱需要输入密码' arrow='right'
          />
          <AtListItem title='云同步设置' note='同步密码到微信云' arrow='right' onClick={() => cNavigateTo('/pages/settings/cloud-sync/index')} />
        </AtList>
        <Text id='version'>版本 1.0.1(210923)</Text>
      </View>
    )
  }
}
