const IInitialState = {
  name: null
}

export interface IAuth {
  name: boolean
}

export default function reducer(state: IAuth = IInitialState, { type, name }): IAuth {
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

export const actions = {
  SET_USER_NAME: 'SET_USER_NAME',
  setUserName: name => ({
    type: actions.SET_USER_NAME,
    name
  })
}
