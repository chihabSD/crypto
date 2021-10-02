import React, { useCallback } from "react";
import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { MainLayout } from ".";
import BalanceInfo from "../components/BalanceInfo";
import IconTextButton from "../components/IconTextButton";
import { SIZES, dummyData, COLORS, icons, FONTS } from "../constants";
import { useRedux } from "../hooks/useRedux";
// import { getHoldings } from "../redux/actions/market/getHoldings";
import { getCoinMarket } from "../redux/actions/market/getMarket";
import Chart from "../components/Chart";
import { getHoldings, test } from "../redux/actions/market/getHoldings";
// import Chart from "../components/Chart";

const Home = () => {
  // Hooks
  const { dispatch, coins, myHoldings } = useRedux();
  // State
  const [selectedCoin, setSelectedCoin] = React.useState(null);

  // useEffects and callbacks
  useFocusEffect(
    useCallback(() => {
      dispatch(getHoldings((holdings = dummyData.holdings)));
      // dispatch(test((holdings = dummyData.holdings)));
      dispatch(getCoinMarket());
    }, [])
  );

  // Calculate total of wallet
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  // Method to render wallet info section
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
      </View>
    );
  };
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Render wallet info */}
        {renderWwalletInfoSection()}

        {/* Chart */}
        <Chart
          containerStyle={{ marginTop: SIZES.padding * 2 }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
        />

        {/* Top Cryptocurrency section */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>
                Top Cryptocurrency
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Logo */}
                <View
                  style={{
                    width: 35,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>

                {/* Name */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {item.name}
                  </Text>
                </View>

                {/* Figures */}
                <View>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    $ {item.current_price}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{ rotate: "45deg" }]
                              : [{ rotate: "125deg" }],
                        }}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: 50,
              }}
            />
          }
        />
      </View>
    </MainLayout>
  );
};

export default Home;
