import { useDispatch, useSelector } from "react-redux";
const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    tabReducer: { isTradeModalVisible },
  } = state;
  return {
    dispatch,
    isTradeModalVisible,
  };
};

export { useRedux };
