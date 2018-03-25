import { Reducer } from 'redux'

export interface IAuth {
  name: string
}

const InitialState = {
  name: ''
}

export const actions = {
  SET_USER_NAME: 'SET_USER_NAME',
  setUserName: (name: string) => ({
    type: actions.SET_USER_NAME,
    name
  })
}

const reducer: Reducer<IAuth> = (state: IAuth = InitialState, { type, name }) => {
  switch (type) {
    case actions.SET_USER_NAME:
      return {
        ...state,
        name
      }
    default:
      return state
  }
}

export default reducer
