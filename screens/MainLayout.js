import React from "react";
import { View, Text, Animated } from "react-native";
import IconTextButton from "../components/IconTextButton";
import { COLORS, icons, SIZES } from "../constants";
import { useRedux } from "../hooks/useRedux";
const MainLayout = ({ children }) => {
  const { isTradeModalVisible, dispatch } = useRedux();

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start(0);
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(0);
    }
  }, [isTradeModalVisible]);
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });
  return (
    <View style={{ flex: 1 }}>
      {children}
      {/** Dim Background */}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
            opacity: modalAnimatedValue,
          }}
          //   opacity={modalAnimatedValue}
        />
      )}
      {/** Modal */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modalY,
          width: "100%",
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.warn("sssss")}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          onPress={() => console.warn("sssss")}
          containerStyle={{ marginTop: SIZES.base }}
        />
      </Animated.View>
    </View>
  );
};

export default MainLayout;
