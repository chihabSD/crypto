import axios from "axios";
import { handleHoldings } from "./handleHolding";
import {
  GET_HOLDIGS_BEGINS,
  GET_HOLDIGS_FAILURE,
  GET_HOLDIGS_SUCCESS,
} from "./types";

export const getHoldings = (
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1
) => {
  return async (dispatch) => {
    // loading
    dispatch({ type: GET_HOLDIGS_BEGINS });
    let ids = holdings
      .map((item) => {
        return item.id;
      })
      .join(",");
    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;
    try {
      const data = await axios.get(apiUrl);

      const myHoldings = handleHoldings(data, holdings);

      dispatch({ type: GET_HOLDIGS_SUCCESS, payload: { myHoldings } });
    } catch (e) {
      dispatch({
        type: GET_HOLDIGS_FAILURE,
        payload: { e },
      });
    }
  };
};
