import axios from "axios";
import {
  GET_HOLDIGS_BEGINS,
  GET_HOLDIGS_FAILURE,
  GET_HOLDIGS_SUCCESS,
} from "./types";

export const getHoldingsBegin = () => ({
  type: GET_HOLDIGS_BEGINS,
});
export const getHoldingsSuccess = (myHoldings) => ({
  type: GET_HOLDIGS_SUCCESS,
  payload: { myHoldings },
});

export const getHoldingsFailure = (error) => ({
  type: GET_HOLDIGS_FAILURE,
  payload: { error },
});

export const getHoldings = (
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePercc = "7d",
  perPage = 10,
  page = 1
) => {
  return async (dispatch) => {
    dispatch(getHoldingsBegin());

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

    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePercc}&id=${ids}`;

    return axios({ url, method: "GET", header: { Accept: "Application/json" } })
      .then((res) => {
        // console.warn(res);
        if (res.status === 200) {
          let myHoldings = res.data.map((item) => {
            let coin = holdings.find((a) => a.id == item.id);
            // const qty = coin.qty;
            // let qty = qoin;

            let price7d =
              item.current_price /
              (1 + item.price_change_percentage_7d_in_currency * 0.01);
            const {
              name,
              symbol,
              id,
              image,
              current_price,
              price_change_percentage_7d_in_currency,
              sparkline_in_7d,
            } = item;

            return {
              id,
              symbol,
              image,
              // qty: coin.qty,
              name,
              current_price,
              total: current_price,
              // total: coin.qty * current_price,
              price_change_percentage_7d_in_currency,
              // holding_value_change_7d: (current_price - price7d) * coin.qty,
              // sparkline_in_7d: {
              //   value: sparkline_in_7d.price.map((price) => {
              //     return price * coin.qty;
              //   }),
              // },
            };
          });
          dispatch(getHoldingsSuccess(myHoldings));
        } else {
          dispatch(getHoldingsFailure(res.data));
        }
      })
      .catch((error) => {
        console.warn(error);
        dispatch(getHoldingsFailure(error));
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
