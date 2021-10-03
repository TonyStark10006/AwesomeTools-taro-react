import { Component } from 'react'
import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtForm, AtSwitch } from 'taro-ui'
import { connect } from 'react-redux'
import './index.scss'


@connect(({ cloudSyncSlice }) => ({ cloudSyncSlice }), (dispatch) => ({
  sync() { dispatch({ type: 'cloudSyncSlice/switchAutoCloudSync', payload: 123 }) }
}))

export default class CloudSync extends Component {

  // constructor(props: any) {
  // super(props)
  // Taro.setNavigationBarTitle({
  //   title: '云同步设置'
  // })
  // console.log(this.props);
  // }

  componentWillMount() { }

  componentDidMount() {
    // store.subscribe(() => {
    //   console.log(store.getState().switchCloudSync);
    //   // this.setState({ value: store.getState().switchCloudSync.sync.toString() })
    // })
  }

  // componentWillReceiveProps(nextPros: object) {
  //   console.log(this.props, nextPros)
  // }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    Taro.setStorageSync('setting', this.props.cloudSyncSlice.sync)

    return (
      <View className='cloud-sync'>
        <AtForm>
          <AtSwitch title='开启自动云同步' checked={this.props.cloudSyncSlice.sync} onChange={this.props.sync} />
        </AtForm>
      </View>
    )
  }
}
