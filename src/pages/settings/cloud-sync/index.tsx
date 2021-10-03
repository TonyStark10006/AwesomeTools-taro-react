import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtForm, AtSwitch } from 'taro-ui'
import { connect } from 'react-redux'
import { cSetStorage } from '@utils'
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

  private handleChange(): void {
    this.props.sync()
    cSetStorage('autoCloudSync', !this.props.cloudSyncSlice.sync)
  }

  render() {
    // Taro.setStorageSync('setting', this.props.cloudSyncSlice.sync)

    return (
      <View className='cloud-sync'>
        <AtForm>
          <AtSwitch title='开启自动云同步' checked={this.props.cloudSyncSlice.sync} onChange={this.handleChange.bind(this)} />
        </AtForm>
      </View>
    )
  }
}
