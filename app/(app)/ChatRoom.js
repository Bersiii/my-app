import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatHeader from "../../component/chatHeader";
import MessageList from "../../component/MessageList";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatHeader user={item} router={router} />
      <View className="border-b border-gray-300" />
      <View className="flex-1 bg-neutral-100 justify-between overflow-visible">
        <View className="flex1">
          <MessageList messages={messages} />
        </View>
      </View>
      <View className="pt2" style={{ marginBottom: hp(5) }}>
        <View className="flex-row justify-between items-center mx-3">
          <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full p">
            <TextInput placeholder="Type message..." 
            className="flex-1 mr-2"/>
          </View>
        </View>
      </View>
    </View>
  );
}
