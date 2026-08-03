import "../global.css";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View, Text, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../contextt/authContext";
import { useRouter } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";

import {
  Menu,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuItem } from "./commonMenu";

const ios = Platform.OS === "ios";
const HomeHeader = () => {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const [imgSource, setImgSource] = useState(
    require("../assets/images/bersi1.png"),
  );

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

  useEffect(() => {
    if (user?.profileUrl) {
      setImgSource({ uri: user.profileUrl });
    } else if (user?.photoURL) {
      setImgSource({ uri: user.photoURL });
    } else {
      setImgSource(require("../assets/images/bersi1.png"));
    }
  }, [user?.profileUrl, user?.photoURL]);

  return (
    <View
      style={{ paddingTop: ios ? top : 0 }}
      className="bg-slate-700 flex-row justify-between items-center a px-4 h-28  rounded-b-3xl"
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
        <Text className="text-black font-bold text-2xl ">Chats</Text>
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
              source={imgSource}
              resizeMode="cover"
              onError={(e) => {
                console.log(
                  "Header image failed to load:",
                  e.nativeEvent?.error || e,
                );
                setImgSource(require("../assets/images/bersi1.png"));
              }}
              onLoad={() => console.log("Header image loaded")}
              accessibilityLabel="profile-image"
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                padding: 0,
                borderRadius: 28,
                overflow: "hidden",
                width: hp(20),
                backgroundColor: "bg-slate-700",
              },
            }}
          >
            <MenuItem
              item
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color={"#2E5D9F"} />}
            />
            <Divider />
            <MenuItem
              item
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
  return <View className="h-[1px] bg-gray-300 " />;
};
