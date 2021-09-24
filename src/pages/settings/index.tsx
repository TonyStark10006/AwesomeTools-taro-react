import { Component } from 'react'
import { View, Text } from '@tarojs/components'
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
        <Text id='version'>版本 1.0.1(210923)</Text>
      </View>
    )
  }
}
