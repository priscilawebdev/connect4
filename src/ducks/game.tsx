import { Reducer } from 'redux'

export interface IGame {
  matrix: number[],
  userCurrentPlayer: boolean,
  score: number[]
}

const InitialState = {
  matrix: Array<number>(42).fill(0),
  userCurrentPlayer: false,
  score: [0, 0]
}

export const actions = {
  SET_SCORE: 'SET_SCORE',
  SET_WINNER: 'SET_WINNER',
  SET_DRAW: 'SET_DRAW',
  RESET: 'RESET',
  setScore: (position: number) => ({
    type: actions.SET_SCORE,
    position
  })
}

const reducer: Reducer<IGame> = (state: IGame = InitialState, { type, position }) => {
  switch (type) {
    case actions.SET_SCORE:
      const currentPLayer = state.userCurrentPlayer ? 1 : 2
      return {
        ...state,
        matrix: state.matrix.map((item, index) => index === position ? currentPLayer : item),
        userCurrentPlayer: !state.userCurrentPlayer
      }
    default:
      return state
  }
}

export default reducer
