import { configureStore, Store } from '@reduxjs/toolkit'
// import { createStore } from 'redux'
import Taro from '@tarojs/taro'
import rootSlices from '../reducers/rootReducer'

// export const store = createStore(rootReducers)

const localAutoCloudSync: boolean = Taro.getStorageSync('autoCloudSync')
// var tasks: Promise<SuccessCallbackResult>[] = []

// const localSettings = Taro.getStorage({ key: 'settings' })
// tasks.push(localSettings)
// console.log(Taro.getStorage({ key: 'historyList' }))
// export default function genSliceStore(): Store {localSettings.autoCloudSync
//   return configureStore({
//     reducer: rootSlices,
//     preloadedState: { cloudSyncSlice: { sync: localSetting } }
//   })
// }

export const sliceStore =
  localAutoCloudSync == ('' || undefined)
    ? configureStore({ reducer: rootSlices })
    : configureStore({
        reducer: rootSlices,
        preloadedState: {
          cloudSyncSlice: { sync: localAutoCloudSync }
        }
      })

// localSettings != ('' || undefined) ??
//   Taro.setStorage({
//     key: 'settings',
//     // 初始化必要数据
//     data: {
//       cloudSyncSlice: { sync: localSettings.autoCloudSync },
//       thmemeMode: 0
//     },
//     fail: error => console.log(error)
//   })

export default sliceStore
