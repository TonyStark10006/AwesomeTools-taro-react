import { configureStore, Store } from '@reduxjs/toolkit'
// import { createStore } from 'redux'
import rootSlices from '../reducers/rootReducer'

// export const store = createStore(rootReducers)

export const sliceStore = configureStore({
  reducer: rootSlices
})

export default sliceStore
