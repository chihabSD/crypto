import React from "react";
import { View, Text, Image } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
  return (
    <View style={{ ...containerStyle }}>
      <Text style={{ color: COLORS.primary, ...FONTS.h1, marginBottom: 10 }}>
        {title}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>$</Text>
        <Text
          style={{ color: COLORS.white, ...FONTS.h2, marginLeft: SIZES.base }}
        >
          {displayAmount.toString()}
        </Text>
        <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>USD</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        {changePct != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: "center",
              tintColor: changePct > 0 ? COLORS.green : COLORS.red,
              transform:
                changePct > 0 ? [{ rotate: "45deg" }] : [{ rotate: "125deg" }],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            ...FONTS.h4,
            alignSelf: "flex-end",
            color:
              changePct == 0
                ? COLORS.green
                : changePct > 0
                ? COLORS.green
                : COLORS.red,
          }}
        >
          {changePct.toFixed(2)}%
        </Text>

        <Text
          style={{
            color: COLORS.lightGray3,
            ...FONTS.h5,
            marginLeft: SIZES.radius,
            alignSelf: "flex-end",
          }}
        >
          7d change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
