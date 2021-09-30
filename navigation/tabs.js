import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Portfolio, Market, Profile } from "../screens";
import { COLORS, icons } from "../constants";
import TabIcon from "../components/TabIcon";
import { useRedux } from "../hooks/useRedux";
// import { TabIcon } from "../components";
const Tab = createBottomTabNavigator();
const CustomBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
const Tabs = () => {
  const { dispatch, isTradeModalVisible } = useRedux();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} label="home" icon={icons.home} />;
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                label="portfiolio"
                icon={icons.briefcase}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                label="trade"
                icon={icons.trade}
                isTrade={true}
              />
            );
          },
          tabBarButton: (props) => (
            <CustomBarButton
              {...props}
              onPress={() => console.warn("custom btn")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} label="market" icon={icons.market} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} label="profile" icon={icons.profile} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
