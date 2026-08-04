import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const ChatItem = ({ user, noBorder }) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center px-4 py-3 ${
        noBorder ? "" : "border-b border-neutral-200"
      }`}
    >
      {/* 1. Profile Avatar */}
      <View className="w-12 h-12 rounded-full overflow-hidden justify-center items-center bg-neutral-200">
        {user?.profileUrl ? (
          <Image
            source={{ uri: user.profileUrl }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <Image
            source={require("../assets/images/bersi1.png")}
            className="w-12 h-12 rounded-full"
          />
        )}
      </View>

      {/* 2. User Info & Message Details */}
      <View className="ml-4 flex-1 justify-center gap-1">
        <View className="flex-row justify-between items-center">
          {/* Full Username */}
          <Text className="text-base font-semibold text-neutral-800">
            {user?.username || "User"}
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
