import React from "react";
import { View, Text } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import { COLORS, FONTS, SIZES } from "../constants";
import moment from "moment";
const Chart = ({ containerStyle, chartPrices }) => {
  // Points
  let startUnixTim = moment().subtract(7, "day").unix();
  let data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTim * (index + 1) * 3600,
          y: item,
        };
      })
    : [];
  let points = monotoneCubicInterpolation({ data, range: 40 });
  return (
    <View>
      {data.length > 0 && (
        <ChartPathProvider data={{ points, smoothingStrategy: "bezier" }}>
          <ChartPath
            height={150}
            width={SIZES.width}
            strokeWidth={2}
            stroke={COLORS.lightGreen}
          />
        </ChartPathProvider>
      )}
      <Text style={{ color: COLORS.white }}>CHart</Text>
    </View>
  );
};

export default Chart;

// import React from "react";
// import { Dimensions, View, Text } from "react-native";
// export const { width: SIZE } = Dimensions.get("window");
// import { COLORS, FONTS } from "../constants";

// };

// export default Chart;
