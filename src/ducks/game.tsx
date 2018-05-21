import { Reducer } from 'redux'

export type TStatus = 'thinking' | 'running' | 'winner' | 'draw'

export interface IGame {
  matrix: number[][],
  player: number, // Computer has 1 value and Human has 2 value
  status: TStatus
}

const InitialState: IGame = {
  matrix: Array<number>(6).fill(0).map(() => Array<number>(7).fill(0)),
  player: 1,
  status: 'running'
}

export const actions = {
  SET_SCORE: 'SET_SCORE',
  RESET: 'RESET',
  setScore: (row: number, col: number, status: TStatus) => ({
    type: actions.SET_SCORE,
    move: { row, col, status }
  }),
  reset: () => ({
    type: actions.RESET
  })
}

const reducer: Reducer<IGame> = (state = InitialState, { type, move }) => {
  switch (type) {
    case actions.SET_SCORE:
      const matrix = JSON.parse(JSON.stringify(state.matrix))
      matrix[move.row][move.col] = state.player
      return {
        ...state,
        matrix,
        status: move.status,
        player: state.player === 1 ? 2 : 1
      }
    case actions.RESET:
      return InitialState
    default:
      return state
  }
}

export default reducer
