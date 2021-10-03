import { createSlice } from '@reduxjs/toolkit'

export const cloudSyncSlice = createSlice({
  name: 'cloudSyncSlice',
  initialState: {
    sync: false
  },
  reducers: {
    //caseReducers
    switchAutoCloudSync: (state, action) => {
      console.log(action)
      return { sync: !state.sync }
    },
    switch: (state, action) => {
      console.log(action)
      console.log(!state.sync)
      return { sync: !state.sync }
    }
  }
})

export const { switchAutoCloudSync } = cloudSyncSlice.actions
export default cloudSyncSlice.reducer
