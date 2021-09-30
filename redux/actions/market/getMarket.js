import axios from "axios";
import {
  GET_MARKET_BEGINS,
  GET_MARKET_FAILURE,
  GET_MARKET_SUCCESS,
} from "./types";

export const getCoinMarketBegin = () => ({
  type: GET_MARKET_BEGINS,
});
export const getCoinMarketSuccess = (coins) => ({
  type: GET_MARKET_SUCCESS,
  payload: { coins },
});

export const getCoinMarketFailure = (error) => ({
  type: GET_MARKET_FAILURE,
  payload: { error },
});

export const getCoinMarket = (
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePercc = "7d",
  perPage = 10,
  page = 1
) => {
  return async (dispatch) => {
    dispatch(getCoinMarketBegin());

    let ids = holdings
      .map((item) => {
        return item.id;
      })
      .join(",");
    // let ids = holdings
    //   .map((item) => {
    //     return item.id;
    //   })
    //   .join(",");

    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePercc}`;

    return axios({ url, method: "GET", header: { Accept: "Application/json" } })
      .then((res) => {
        // console.warn(res);
        if (res.status === 200) {
          dispatch(getCoinMarketSuccess(res.data));
        } else {
          dispatch(getCoinMarketFailure(res.data));
        }
      })
      .catch((error) => {
        console.warn(error);
        dispatch(getCoinMarketFailure(error));
      });
    //   const data = await axios(apiUrl);
    //   //   console.warn(data);
    //     dispatch({ type: GET_HOLDIGS_SUCCESS, payload: myHoldings });
    //   //   console.warn(data.data);
    // } catch (e) {
    //   console.warn(e);
    // }
  };
};
