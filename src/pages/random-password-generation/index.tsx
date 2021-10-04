// import { Component } from 'react'
import React from 'react'
import { View, ScrollView, Picker, CommonEvent, Button } from '@tarojs/components'
import { AtList, AtListItem, AtCheckbox, AtButton, AtModal, AtModalContent, AtModalAction, AtInput } from "taro-ui"
import Taro from '@tarojs/taro'
import { CheckboxOption } from 'taro-ui/types/checkbox'
import { cShowToast, cSetStorage, setPwdToClipBorad } from '@utils'
// import { cSetStorage, setPwdToClipBorad } from '@utils/storage'
import RandomPassword from '@models/RandomPassword'
import { connect } from 'react-redux'
import './index.scss'

interface IndexState {
  checkboxOption: CheckboxOption<string>[]
  conditionsSelectedList: string[]
  windowHeight: number
  pwdList: { value: string, remark: string }[]
  newPassword: string
  pwdRemark: string
  lengthSelectedValue: number
  isGenModalOpened: boolean
  isModModalOpened: boolean
  indexForModification: number
}

@connect(({ cloudSyncSlice }) => ({ cloudSyncSlice }))
export default class Index extends React.Component<any, IndexState> {

  // public config: Taro.PageConfig = {
  //   navigationBarTitleText: '生成随机密码'
  // }
  // eslint-disable-next-line react/sort-comp
  public lengthRange: number[] = [8, 10, 12, 14, 16]
  private randomPwdObj: RandomPassword = new RandomPassword()
  private db: Taro.DB.Database

  // 没有初始化数据库数据，所以得加标识判断是add还是update数据
  private cloudHasHistory: boolean


  constructor(props: any) {
    super(props)
    let historyList = Taro.getStorageSync('historyList')
    let windowHeight = Taro.getSystemInfoSync().windowHeight

    console.log(this.props);

    this.state = {
      checkboxOption: [{
        value: '1',
        label: '0-9',
      }, {
        value: '2',
        label: 'a-z'
      }, {
        value: '3',
        label: 'A-Z',
      }, {
        value: '4',
        label: '!@#$%^&*',
      }],
      conditionsSelectedList: ['1', '2'],
      // conditions: [],
      windowHeight: windowHeight,
      pwdList: historyList.length != 0 ? historyList : [],
      newPassword: '',
      lengthSelectedValue: 0,
      isGenModalOpened: false,
      isModModalOpened: false,
      pwdRemark: '',
      indexForModification: 0
    }

    if (this.props.cloudSyncSlice.sync) {
      // 获取云数据库的数据
      Taro.cloud.init()
      this.db = Taro.cloud.database()
      let that = this
      // this.cloudHistory =
      this.db.collection('pwd_list')
        .where({ _openid: '{openid}' })
        .get()
        .then((res) => {
          // console.log(res)
          // 判断是否有数据库记录，有则update否则add
          let data = res.data//[0].pwd_list
          if (data.length == 0 || data.length == undefined) {
            that.cloudHasHistory = false
          } else {
            that.cloudHasHistory = true
            // 本地数据为主，只要本地有数据都不会被云端数据覆盖，但是本地数据变化则会覆盖云端
            if (that.state.pwdList.length == 0) {
              that.setState({ pwdList: data[0].pwd_list })
              cSetStorage('historyList', data[0].pwd_list)
            }
          }
        })
    }

  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  Hello = (props: any) => {
    return <AtList><AtListItem title={props.name} /></AtList>
  }

  private handleChange(value: string[]): void {
    this.setState({
      conditionsSelectedList: value
    })
  }

  private handlePwdLength(e: CommonEvent): void {
    console.log(e);
    this.setState({
      lengthSelectedValue: e.detail.value
    })
  }

  private transformConditions() {
    let {
      conditionsSelectedList,
      lengthSelectedValue,
    } = this.state

    let conditions: any[] = []
    conditions.push(conditionsSelectedList.includes('1') ? true : false)
    conditions.push(conditionsSelectedList.includes('2') ? true : false)
    conditions.push(conditionsSelectedList.includes('3') ? true : false)
    conditions.push(conditionsSelectedList.includes('4') ? true : false)
    conditions.push(this.lengthRange[lengthSelectedValue])

    return conditions
    // this.setState({
    //   conditions: conditions
    // })
  }


  private genRandomPassword(): void {
    // document.getElementsByTagName('scroll-view')[0].setAttribute('scrollY', 'false')
    // document.getElementsByTagName('scroll-view')[1].setAttribute('scrollY', 'false')
    // document.getElementsByTagName('scroll-view')[2].setAttribute('show-scrollbar', 'false')
    // console.log(document.getElementsByTagName('scroll-view'));

    console.log(this.cloudHasHistory);

    if (this.state.conditionsSelectedList.length == 0) {
      cShowToast('请勾选密码组成条件')
      return
    }

    let conditions = this.transformConditions()

    let newPassword = this.randomPwdObj.genRandomPassword(...conditions)

    this.setState({
      newPassword: newPassword,
      isGenModalOpened: true
    })
  }

  private handleCopy(): void {
    let { newPassword, pwdRemark, pwdList } = this.state
    // 复制到粘贴板
    setPwdToClipBorad(newPassword)
    // console.log(pwdList);

    // 写入到历史生成列表
    pwdList.push({ value: newPassword, remark: pwdRemark })

    // 写入到缓存
    cSetStorage('historyList', pwdList)

    // 同步密码到微信云数据库
    this.handlePwdlistCloudSync(pwdList)

    // cloudList.then((res) => console.log(res), (res) => console.log(res))

    //关闭modal
    this.closeModal()
  }

  private handleGenOnceMore(): void {
    // if (this.state.conditionsSelectedList.length == 0) {
    //   cShowToast('请勾选条件')
    //   return
    // }

    let conditions = this.transformConditions()
    this.setState({
      newPassword: this.randomPwdObj.genRandomPassword(...conditions)
    })
  }

  private handleDelete(i: number): void {
    let { pwdList } = this.state
    pwdList.splice(i, 1)
    this.setState({
      pwdList: pwdList
    })

    this.handlePwdlistCloudSync(pwdList)

    cSetStorage('historyList', pwdList)

    // Array.prototype.remove = function (from, to) {
    //   var rest = this.slice((to || from) + 1 || this.length);
    //   this.length = from < 0 ? this.length + from : from;
    //   return this.push.apply(this, rest);
    // };
  }

  private handleListItemCopy(i: number): void {
    let { pwdList } = this.state
    setPwdToClipBorad(pwdList[i].value)
  }

  private showRemarks(i: number): void {
    let { pwdList } = this.state
    let remark = pwdList[i].remark
    remark != '' ? cShowToast(pwdList[i].remark) : cShowToast('么有备注')
  }

  private closeModal(): void {
    this.setState({ isModModalOpened: false, isGenModalOpened: false, pwdRemark: '' })
  }

  private handleRemarkInput(value: string): void {
    let filtered = value.replace(/<\/?.+?>/g, '')
    console.log(value);
    this.setState({ pwdRemark: filtered })
    // console.log(document.getElementById('pwd'))

    // return value
  }

  private showModifyRemark(i: number): void {
    let { pwdList } = this.state
    this.setState({ pwdRemark: pwdList[i].remark, isModModalOpened: true, indexForModification: i })
    console.log(pwdList[i].remark);
  }

  private handleModifyRemark(): void {
    let { pwdRemark, pwdList, indexForModification } = this.state
    // 写入到历史生成列表
    pwdList[indexForModification].remark = pwdRemark

    // 同步到云端
    this.handlePwdlistCloudSync(pwdList)

    // 写入到缓存
    cSetStorage('historyList', pwdList)

    //关闭modal
    this.closeModal()
  }

  private genList(): JSX.Element[] {
    var list: JSX.Element[] = [];
    let { pwdList } = this.state

    for (let i = 0; i < pwdList.length; i++) {
      list[i] = (
        <View className='at-row' >
          <View className='at-col at-col-8'>
            <View onClick={this.showRemarks.bind(this, i)}
              onLongPress={this.showModifyRemark.bind(this, i)}
            >
              {pwdList[i].value}
            </View>
          </View>
          <View className='at-col at-col-2' id={i.toString()}>
            <AtButton className='button' type='secondary' size='small' circle onClick={this.handleDelete.bind(this, i)}>
              删除
            </AtButton>
          </View>
          <View className='at-col at-col-2' id={i.toString()}>
            <AtButton className='button' type='secondary' size='small' circle onClick={this.handleListItemCopy.bind(this, i)}>
              复制
            </AtButton>
          </View>
        </View >)
    }
    return list
  }

  private handlePwdlistCloudSync(pwdList: Array<object> | []): void {
    // let _ = this.db.command
    if (this.props.cloudSyncSlice.sync) {
      let that = this
      this.cloudHasHistory ?
        this.db.collection('pwd_list')
          .where({ _openid: '{openid}' })
          .update({
            data: {
              pwd_list: pwdList,
              update_time: new Date()
            }
          })
          .then(res1 => {
            console.log(res1);
          })
        :
        this.db.collection('pwd_list')
          .add({
            data: {
              pwd_list: pwdList,
              update_time: new Date()
            }
          })
          .then(res1 => {
            console.log(res1)
            that.cloudHasHistory = true
          })
    }

  }

  render() {
    let {
      windowHeight,
      checkboxOption,
      conditionsSelectedList,
      lengthSelectedValue,
      isGenModalOpened,
      newPassword,
      isModModalOpened
    } = this.state

    return (
      <View className='container'>
        {/* 历史密码列表 */}
        <ScrollView
          className='scrollView'
          scrollY
          scrollWithAnimation
          style={'height: ' + windowHeight * 0.4 + 'px'}
        >
          {this.genList()}
        </ScrollView>
        {/* 密码组合条件 */}
        <AtCheckbox
          className='view'
          options={checkboxOption}
          selectedList={conditionsSelectedList}
          onChange={this.handleChange.bind(this)}
        />
        <Picker
          className='view'
          mode='selector'
          range={this.lengthRange}
          value={lengthSelectedValue}
          onChange={this.handlePwdLength.bind(this)}
        >
          <AtList>
            <AtListItem
              title='密码长度'
              extraText={this.lengthRange[lengthSelectedValue].toString()}
            />
          </AtList>
        </Picker>
        {/* 生成按钮 */}
        <AtButton
          type='primary'
          className='view'
          onClick={this.genRandomPassword.bind(this)}
        >
          濑 滋 苟
        </AtButton>

        {/* modal框 */}
        <AtModal isOpened={isGenModalOpened}
          onClose={this.closeModal.bind(this)}
        >
          {/* <AtModalHeader>标题</AtModalHeader> */}
          <AtModalContent>
            <View className='modalContent' id='pwd'>{newPassword}</View>
            <AtInput
              name='remark-gen'
              title='备注:'
              type='text'
              placeholder='点击历史密码即可显示备注'
              value={this.state.pwdRemark}
              onChange={this.handleRemarkInput.bind(this)}
              className='modalContent'
            />
          </AtModalContent>
          <AtModalAction>
            <Button className='modalButton' onClick={this.closeModal.bind(this)}>取消</Button>
            <Button className='modalButton' onClick={this.handleGenOnceMore.bind(this)}>再来一次</Button>
            <Button className='modalButton' onClick={this.handleCopy.bind(this)}>复制</Button>
          </AtModalAction>
        </AtModal>

        <AtModal isOpened={isModModalOpened}
          onClose={this.closeModal.bind(this)}
        >
          {/* <AtModalHeader>标题</AtModalHeader> */}
          <AtModalContent>
            <AtInput
              name='remake-mod'
              title='备注:'
              type='text'
              placeholder='点击历史密码即可显示备注'
              value={this.state.pwdRemark}
              onChange={this.handleRemarkInput.bind(this)}
              id='modInput'
            />
          </AtModalContent>
          <AtModalAction>
            <Button className='modalButton' onClick={this.closeModal.bind(this)}>取消</Button>
            <Button className='modalButton' onClick={this.handleModifyRemark.bind(this)}>修改</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

// export default connect(({ cloudSyncSlice }) => ({ cloudSyncSlice }))(Index)
