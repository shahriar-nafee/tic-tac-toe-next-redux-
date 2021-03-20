import {
  SETUP,
  HANDLE_TEXT_INPUT,
  BOARD_REST,
  GAME_RESULT_STORE,
  PLAYER_NAME,
} from "./types";

export const fullBoard = (board) => (dispatch) => {
  dispatch({ type: SETUP, payload: Array(9).fill(null) });
};

export const handleText = (value, i) => (dispatch) => {
  let data = {
    value: value,
    index: i,
  };
  dispatch({ type: HANDLE_TEXT_INPUT, payload: data });
};

export const boardReset = () => (dispatch) => {
  dispatch({ type: BOARD_REST, payload: null });
};

export const storeGameSingleResult = (data) => (dispatch) => {
  dispatch({ type: GAME_RESULT_STORE, payload: data });

  // Reset game, since game finished.
  // dispatch(boardReset());
};

export const handleNameAction = (name, value) => (dispatch) => {
  let form = {
    name: name,
    value: value,
  };
  dispatch({ type: PLAYER_NAME, payload: form });
};
