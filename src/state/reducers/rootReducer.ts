import { combineReducers } from 'redux'
// import { cloudSyncReducer } from '@state/reducers/cloudSyncReducer'
// import { counterReducer } from '@state/reducers/counterReducer'
import cloudSyncSlice from '@state/reducers/slices/cloudSyncSlice' //reducer

// const rootReducers = combineReducers({
//   cloudSyncReducer,
//   counterReducer
// })

const rootSlices = combineReducers({
  cloudSyncSlice
})

export default rootSlices
