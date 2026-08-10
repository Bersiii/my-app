import React from "react";
import { View, Text, Platform, Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../contextt/authContext";
import { useRouter } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { MenuItem } from "./commonMenu";

const ios = Platform.OS === "ios";
const defaultAvatar = require("../assets/images/bersi1.png");

const HomeHeader = () => {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  
  const avatarUrl = user?.profileUrl || user?.photoURL;
  const imageSource = avatarUrl ? { uri: avatarUrl } : defaultAvatar;

  const handleProfile = () => {
    try {
      if (user) {
        router.push("/profile");
      } else {
        router.push("/signup");
      }
    } catch (e) {
      console.log("handleProfile navigation error:", e);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="bg-slate-700 flex-row justify-between items-center px-4 h-28 rounded-b-3xl"
    >
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
        <Text className="text-black font-bold text-2xl">Chats</Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{
                width: hp(5),
                height: hp(5),
                borderRadius: 100,
                backgroundColor: "#ddd",
              }}
              source={imageSource}
              defaultSource={defaultAvatar}
              resizeMode="cover"
              accessibilityLabel="profile-image"
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                padding: 0,
                borderRadius: 20,
                overflow: "hidden",
                width: hp(20),
                backgroundColor: "#ffffff",
                marginTop: hp(6),
              },
            }}
          >
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color={"#2E5D9F"} />}
            />
            <Divider />
            <MenuItem
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={
                <AntDesign name="logout" size={hp(2.5)} color={"#2E5D9F"} />
              }
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;

const Divider = () => {
  return <View className="h-[1px] bg-gray-200" />;
};
