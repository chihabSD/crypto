import axios from "axios";
// import config from '../config';

// const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePercc}&id=${ids}`
export const apiUserLogin = (
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePercc = "7d",
  perPage = 10,
  page = 1
) => {
  let ids = holdings
    .map((item) => {
      return item.id;
    })
    .join(",");
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePercc}&id=${ids}`
  );
};
