import {
  SETUP,
  HANDLE_TEXT_INPUT,
  BOARD_REST,
  PLAYER_NAME,
  GAME_RESULT_STORE,
  INCREMENT_ACTIVE_GAME_NO,
} from "./types";

const initialState = {
  activeGameNo: 1,

  playerName: {
    firstPlayer: "",
    secondPlayer: "",
  },

  scores: [],

  test: Array(9).fill(""),
  textInput: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAYER_NAME:
      const playerName = { ...state.playerName };
      playerName[action.payload.name] = action.payload.value;
      return {
        ...state,
        playerName,
      };

    case SETUP:
      console.log(`action.payload`, action.payload);
      return {
        ...state,
        boards: action.payload,
        test: initialState.test,
      };
    case HANDLE_TEXT_INPUT:
      const board = state.test;
      board[action.payload.index] = action.payload.value;

      return {
        ...state,
        textInput: action.payload.value,
        test: board,
      };

    case GAME_RESULT_STORE:
      return {
        ...state,
        scores: [...state.scores, action.payload],
        activeGameNo: state.activeGameNo + 1,
      };

    case BOARD_REST:
      return {
        ...state,
        test: Array(9).fill(""),
      };
    default:
      return state;
  }
}
