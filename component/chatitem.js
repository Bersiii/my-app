import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ChatItem = ({ item, router, noBorder }) => {

  const OpenChatRoom = () => {
    router.push({ pathname: "/ChatRoom", params: item });
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center px-4 py-3 ${
        noBorder ? "" : "border-b border-neutral-200"
      }`}
      onPress={OpenChatRoom}
    >
      {/* 1. Profile Avatar */}
      <View className="w-12 h-12 rounded-full overflow-hidden justify-center items-center bg-neutral-200">
        <Image
          source={
            item?.profileUrl
              ? { uri: item.profileUrl }
              : require("../assets/images/bersi1.png")
          }
          style={{ height: hp(6), width: hp(6), borderRadius: hp(3) }}
          resizeMode="cover"
        />
      </View>

      {/* 2. User Info & Message Details */}
      <View className="ml-4 flex-1 justify-center gap-1">
        <View className="flex-row justify-between items-center">
          {/* Full Username */}
          <Text className="text-base font-semibold text-neutral-800">
            {item?.username || "User"}
          </Text>
          {/* Timestamp */}
          <Text className="text-xs text-neutral-500">12:30 PM</Text>
        </View>

        {/* Last Message */}
        <Text
          className="text-sm text-neutral-500 font-medium"
          numberOfLines={1}
        >
          Last text message...
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
