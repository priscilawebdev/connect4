import { Reducer } from 'redux'

export type TStatus = 'initial' | 'running' | 'winner' | 'draw'

export interface IGame {
  matrix: number[][],
  player: number, // Computer has 1 value and Human has 2 value
  status: TStatus
}

const InitialState: IGame = {
  matrix: Array<number>(7).fill(0).map(() => Array<number>(7).fill(0)),
  player: 1,
  status: 'initial'
}

export const actions = {
  SET_SCORE: 'SET_SCORE',
  SET_STATUS: 'SET_STATUS',
  RESET: 'RESET',
  setScore: (col: number, row: number) => ({
    type: actions.SET_SCORE,
    position: { col, row }
  }),
  setStatus: (status: TStatus) => ({
    type: actions.SET_STATUS,
    status
  }),
  reset: () => ({
    type: actions.RESET
  })
}

const reducer: Reducer<IGame> = (state = InitialState, { type, position, status }) => {
  switch (type) {
    case actions.SET_SCORE:
      const matrix = JSON.parse(JSON.stringify(state.matrix))
      matrix[position.col][position.row] = state.player
      return {
        ...state,
        matrix,
        player: state.player === 1 ? 2 : 1,
        status: 'running'
      }
    case actions.SET_STATUS:
      return {
        ...state,
        status
      }
    case actions.RESET:
      return InitialState
    default:
      return state
  }
}

export default reducer
