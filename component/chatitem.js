import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const ChatItem = ({ user }) => {
  return (
    <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-neutral-200">
      <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center">
        {user.profileUrl ? (
          <Image
            source={{ uri: user.profileUrl }}
            className="w-12 h-12 rounded-full bg-gray-200"
          />
        ) : (
          <Image
            source={require("../assets/images/bersi1.png")}
            className="w-12 h-12 rounded-full"
          />
        )}
      </View>

      <View className="ml-4 flex">
        <View className="flex-row justify-between ">
          <Text className="text-base font-bold text-white">
            {user.username ? user.username[0]?.toUpperCase() : "U"}
          </Text>
          <Text>Time</Text>
        </View>

        <Text className="text-sm text-black pt-5">Last Text</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
