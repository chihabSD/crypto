import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const IconTextButton = ({ label, icon, containerStyle, onPress, bg }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        borderRadius: SIZES.radius,
        backgroundColor: bg ? bg : COLORS.primary,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          height: 20,
          tintColor: bg ? COLORS.secondary : COLORS.black,
          width: 20,
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.base,
          ...FONTS.h3,

          color: bg ? COLORS.secondary : COLORS.black,
          //  color: COLORS.white
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;
