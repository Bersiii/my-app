import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ChatItem = ({ item, router, noBorder }) => {
  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";

    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

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
          <Text className="text-xs text-neutral-500">
            {formatMessageTime(item?.lastMessageTime)}
          </Text>
        </View>

        {/* Last Message */}
        <Text
          className="text-sm text-neutral-500 font-medium"
          numberOfLines={1}
        >
          {item?.lastMessageText || "No messages yet"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
