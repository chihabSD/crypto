import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    tabReducer: { isTradeModalVisible },
    marketReducer: { myHoldings, coins, error, loading },
  } = state;
  return {
    dispatch,
    isTradeModalVisible,
    myHoldings,
    coins,
    error,
    loading,
  };
};

export { useRedux };
