import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { MainLayout } from ".";
import BalanceInfo from "../components/BalanceInfo";
import IconTextButton from "../components/IconTextButton";
import { SIZES, dummyData, COLORS, icons } from "../constants";
import { useRedux } from "../hooks/useRedux";
import { getHoldings } from "../redux/actions/market/getHoldings";
import { getCoinMarket } from "../redux/actions/market/getMarket";
import { Dimensions, View } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import Chart from "../components/Chart";

export const { width: SIZE } = Dimensions.get("window");

const Home = () => {
  //   console.warn(dummyData.holdings);
  const { dispatch, coins, myHoldings } = useRedux();

  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings((holdings = dummyData.holdings)));
      dispatch(getCoinMarket());
    }, [])
  );

  // Calculate total of wallet
  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;
  const renderWwalletInfoSection = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.gray,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Balance info section */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{ marginTop: 50 }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            onPress={() => console.warn("sssss")}
            containerStyle={{ flex: 1, height: 40, marginRight: SIZES.radius }}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            onPress={() => console.warn("sssss")}
            containerStyle={{ flex: 1, height: 40 }}
          />
        </View>
        <Chart
          containerStyle={{ marginTop: SIZES.padding * 2 }}
          chartPrices={coins[0]?.sparkline_in_7d?.price}
        />
      </View>
    );
  };
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {renderWwalletInfoSection()}
      </View>
    </MainLayout>
  );
};

export default Home;
