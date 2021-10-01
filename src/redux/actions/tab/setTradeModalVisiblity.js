import { SET_TRADE_MODAL_VISIBLE } from "./types";

export const _setTradeActionVisbility = (isVisible) => {
  return async (dispatch) => {
    dispatch({ type: SET_TRADE_MODAL_VISIBLE, payload: isVisible });
  };
};
