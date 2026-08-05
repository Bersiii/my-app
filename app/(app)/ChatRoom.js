import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { use, useEffect, useState } from "react";
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
import { useAuth } from "../../contextt/authContext";
import { getRoomId } from "../../component/common";
import { doc, setDoc, Timestamp,getDoc } from "firebase/firestore";
import { db } from "../../firbaseconfig";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    <creatRoomifnoexists/>;
  }, []);

  const creatRoomifnoexists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    const roomRef = doc(db, "rooms", roomId);

    // 1. ክፍሉ በዳታቤዝ ውስጥ መኖሩን ማረጋገጥ
    const roomSnap = await getDoc(roomRef);

    // 2. ክፍሉ ከሌለ ብቻ አዲስ መፍጠር
    if (!roomSnap.exists()) {
      await setDoc(roomRef, {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
  };
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
