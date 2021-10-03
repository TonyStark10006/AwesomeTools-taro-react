// import configStore from '@state/store'
import { Component } from 'react'
import { Provider } from 'react-redux'
import sliceStore from '@state/store'
import './app.scss'

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    //
    return <Provider store={sliceStore}>{this.props.children}</Provider>
  }
}
// store.subscribe(() => { })

export default App
