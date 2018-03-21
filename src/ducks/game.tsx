export interface IGame {
  matrix: number[],
  userCurrentPlayer: boolean,
  score: string[number]
}

const IInitialState = {
  matrix: Array<number>(42).fill(null),
  userCurrentPlayer: false,
  score: [0, 0]
}

export default function reducer(state = IInitialState, { payload, type, position }) {
  switch (type) {
    case actions.SET_SCORE:
      const currentPLayer = state.userCurrentPlayer ? 1 : 0
      return {
        ...state,
        matrix: state.matrix.map((item, index) => index === position ? currentPLayer : item),
        userCurrentPlayer: !state.userCurrentPlayer
      }
    default:
      return state
  }
}

export const actions = {
  SET_SCORE: 'SET_SCORE',
  SET_WINNER: 'SET_WINNER',
  SET_DRAW: 'SET_DRAW',
  RESET: 'RESET',
  setScore: position => ({
    type: actions.SET_SCORE,
    position
  })
}
