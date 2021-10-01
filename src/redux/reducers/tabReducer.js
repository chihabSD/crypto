import { SET_TRADE_MODAL_VISIBLE } from "../actions/tab/types";

const INITIAL_STATE = { isTradeModalVisible: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TRADE_MODAL_VISIBLE:
      return { ...state, isTradeModalVisible: action.payload };
    default:
      return state;
  }
};
