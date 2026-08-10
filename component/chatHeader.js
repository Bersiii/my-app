import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";

import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";

const ChatHeader = ({ user, router }) => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false ,
        headerLeft: () => (
          <View className="flex-row items-center gap-1 mt-5">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="black" />
            </TouchableOpacity>
            <View className="bg-neutral-100 flex-row items-center  px-2 py-1 rounded-full gap-5 mb-2">
              <Image
                source={user?.profileUrl}
                style={{ height: hp(5), width: hp(5), borderRadius: hp(2.5) }}
              />
              <Text className="text-lg font-medium text-neutral-700">
                {user?.username || "User"}{" "}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-5 mt-5">
            <TouchableOpacity>
              <Ionicons name="call" size={hp(3)} color="#737373" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="videocam" size={hp(3)} color="#737373" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
};

export default ChatHeader;
