import {
  GET_HOLDIGS_BEGINS,
  GET_HOLDIGS_FAILURE,
  GET_HOLDIGS_SUCCESS,
  GET_MARKET_BEGINS,
  GET_MARKET_FAILURE,
  GET_MARKET_SUCCESS,
} from "../actions/market/types";

const INITIAL_STATE = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HOLDIGS_BEGINS:
      return { ...state, loading: true };
    case GET_HOLDIGS_SUCCESS:
      return { ...state, myHoldings: action.payload.myHoldings };

    case GET_HOLDIGS_FAILURE:
      return { ...state, error: action.payload.error };

    case GET_MARKET_BEGINS:
      return { ...state, laoding: true };

    case GET_MARKET_SUCCESS:
      return { ...state, coins: action.payload.coins };

    case GET_MARKET_FAILURE:
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};
