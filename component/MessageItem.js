import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";

export default function MessageItem({ message, currentUser }) {
  const isMyMessage =
    currentUser?.uid === message?.userId ||
    currentUser?.userId === message?.userId;

  if (isMyMessage) {
    return (
      <View className="flex-row justify-end mb-3 mr-3 gap-2">
        <View style={{ maxWidth: wp(80) }}>
          <View className="self-end p-3 px-4 rounded-2xl bg-white border border-neutral-200">
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
        <Image
          source={{ uri: message?.profileUrl }}
          style={{ height: hp(4), width: hp(4), borderRadius: hp(2) }}
        />
      </View>
    );
  }

  return (
    <View className="flex-row justify-start mb-3 ml-3 items-end gap-2">
      <Image
        source={{ uri: message?.profileUrl }}
        style={{ height: hp(4), width: hp(4), borderRadius: hp(2) }}
      />

      <View style={{ maxWidth: wp(80) }}>
        <View className="self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200">
          <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
        </View>
      </View>
    </View>
  );
}
