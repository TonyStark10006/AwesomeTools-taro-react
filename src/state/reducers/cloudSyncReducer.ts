import { Action } from 'redux'
// import Switch from '../constants/cloud-sync'

export const initialState = {
  sync: false
}

// export const action1 = {
//   type: 'switchAutoCloudSync'
// }

export const cloudSyncReducer = (
  state = initialState,
  action: Action
): object => {
  switch (action.type) {
    case 'cloudSyncReducer/switchAutoCloudSync':
      return {
        ...state,
        sync: !state.sync
      }

    default:
      return state
  }
}

export default cloudSyncReducer
