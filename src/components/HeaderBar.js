import React from "react";
import { View, Text, Platform } from "react-native";

import { isIphoneX } from "react-native-iphone-x-helper";
import { COLORS, FONTS, SIZES } from "../constants";

const HeaderBar = ({ title }) => {
  return (
    <View
      style={{
        height: isIphoneX() ? 100 : 70,
        paddingHorizontal: SIZES.radius,
        justifyContent: "flex-end",
        backgroundColor: COLORS.primary,
        // marginBottom: 13,
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
