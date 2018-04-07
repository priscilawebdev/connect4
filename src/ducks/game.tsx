import { Reducer } from 'redux'

export interface IGame {
  matrix: number[][],
  userCurrentPlayer: boolean, // Computer has 1 value and Human has 2 value
  score: number[]
}

const InitialState: IGame = {
  matrix: Array<number>(7).fill(0).map(() => Array<number>(7).fill(0)),
  userCurrentPlayer: false,
  score: [0, 0]
}

export const actions = {
  SET_SCORE: 'SET_SCORE',
  SET_WINNER: 'SET_WINNER',
  SET_DRAW: 'SET_DRAW',
  RESET: 'RESET',
  setScore: (col: number, row: number) => ({
    type: actions.SET_SCORE,
    position: { col, row }
  }),
  reset: () => ({
    type: actions.RESET
  })
}

const reducer: Reducer<IGame> = (state = InitialState, { type, position }) => {
  switch (type) {
    case actions.SET_SCORE:
      const matrix = JSON.parse(JSON.stringify(state.matrix))
      matrix[position.col][position.row] = state.userCurrentPlayer ? 2 : 1
      return {
        ...state,
        matrix,
        userCurrentPlayer: !state.userCurrentPlayer
      }
    case actions.RESET:
      return InitialState
    default:
      return state
  }
}

export default reducer
