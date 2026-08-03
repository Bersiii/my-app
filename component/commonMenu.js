import { MenuOption } from "react-native-popup-menu";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const MenuItem = ({
  text = "",
  action = () => {},
  value = null,
  icon = null,
}) => {
  return (
    <MenuOption onSelect={() => action && action(value)} value={value}>
      <View
        style={{
          paddingHorizontal: wp(2),
          paddingVertical: hp(0.2),
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: 10,
          marginVertical: hp(0.5),
          marginHorizontal: wp(2),
          backgroundColor: "#f8fafc",
          borderWidth: 1,
          borderColor: "#e2e8f0",

        
        }}
      >
        {icon ? <View style={{ marginRight: wp(3) }}>{icon}</View> : null}
        <Text style={{ fontSize: hp(2), color: "#111", fontWeight: "600" }}>
          {text}
        </Text>
      </View>
    </MenuOption>
  );
};

export default MenuItem;
