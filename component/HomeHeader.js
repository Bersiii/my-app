import "../global.css";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, Text, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../contextt/authContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const ios = Platform.OS === "ios";
const HomeHeader = () => {
  const { user } = useAuth();
  const { top } = useSafeAreaInsets();
  const [imgSource, setImgSource] = useState(
    require("../assets/images/bersi1.png"),
  );

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
      className="bg-indigo-400 flex-row justify-between items-center a px-4 h-28  rounded-b-3xl"
    >
      <Text className="text-black font-bold text-2xl ">Chats</Text>

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
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text="Save" />
            <MenuOption onSelect={() => alert(`Delete`)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => alert(`Not called`)}
              disabled={true}
              text="Disabled"
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;
