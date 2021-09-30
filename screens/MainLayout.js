import React from "react";
import { View, Text } from "react-native";
import { COLORS, icons, SIZES } from "../constants";

const MainLayout = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};

export default MainLayout;
