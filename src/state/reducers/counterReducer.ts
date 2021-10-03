import { Action } from 'redux'

const initialState = {
  num: 0
}

export const counterReducer = (state = initialState, action: Action): {} => {
  switch (action.type) {
    case 'counterReducer/add':
      return { ...state, num: state.num + 1 }
    default:
      return state
  }
}
