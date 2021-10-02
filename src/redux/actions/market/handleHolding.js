export const handleHoldings = (data, holdings) => {
  let myHoldings = data.data.map((item) => {
    // Retrieve our current holdings -> current quantity
    let coin = holdings.find((a) => a.id == item.id);

    // Price from 7 days ago
    let price7d =
      item.current_price /
      (1 + item.price_change_percentage_7d_in_currency * 0.01);

    return {
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      image: item.image,
      current_price: item.current_price,
      qty: coin.qty,
      total: coin.qty * item.current_price,
      price_change_percentage_7d_in_currency:
        item.price_change_percentage_7d_in_currency,
      holding_value_change_7d: (item.current_price - price7d) * coin.qty,
      sparkline_in_7d: {
        value: item.sparkline_in_7d.price.map((price) => {
          return price * coin.qty;
        }),
      },
    };
  });
  return myHoldings;
};
