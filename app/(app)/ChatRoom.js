import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatHeader from "../../component/chatHeader";
import MessageList from "../../component/MessageList";
import KeyboardIssue from "../../component/keyboardIssue";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  return (
    <KeyboardIssue>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatHeader user={item} router={router} />
        <View className="border-b border-gray-300" />
        <View className="flex-1 bg-neutral-100 justify-between overflow-visible">
          <View className="flex1">
            <MessageList messages={messages} />
          </View>
        </View>
        <View className="pt2" style={{ marginBottom: hp(2.7) }}>
          <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full p">
            <TextInput placeholder="Type message..." className="flex-1 mr-2" />
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-neutral-100 p-2.5 rounded-full border border-neutral-200 items-center justify-center"
            >
              <Feather name="send" size={hp(2.4)} color="#525252" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardIssue>
  );
}
