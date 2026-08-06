import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatHeader from "../../component/chatHeader";
import MessageList from "../../component/MessageList";
import KeyboardIssue from "../../component/keyboardIssue";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../contextt/authContext";
import { getRoomId } from "../../component/common";
import {
  doc,
  setDoc,
  Timestamp,
  getDoc,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firbaseconfig";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const currentUserId = user?.uid || user?.userId;
  const targetUserId = item?.userId;

  const createRoomIfNotExist = useCallback(async () => {
    if (!currentUserId || !targetUserId) return;

    const roomId = getRoomId(currentUserId, targetUserId);
    const roomRef = doc(db, "rooms", roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      await setDoc(roomRef, {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
  }, [currentUserId, targetUserId]);

  useEffect(() => {
    if (!currentUserId || !targetUserId) return;

    createRoomIfNotExist();

    const roomId = getRoomId(currentUserId, targetUserId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(allMessages);
    });

    return unsub;
  }, [currentUserId, targetUserId, createRoomIfNotExist]);

  const handleSendMessage = async () => {
    if (!currentUserId || !targetUserId) {
      Alert.alert("Send failed", "User or chat data is missing.");
      return;
    }

    const message = text.trim();
    if (!message) return;

    try {
      await createRoomIfNotExist();

      const roomId = getRoomId(currentUserId, targetUserId);
      const roomRef = doc(db, "rooms", roomId);
      const messagesRef = collection(roomRef, "messages");

      await addDoc(messagesRef, {
        userId: currentUserId,
        text: message,
        profileUrl: user?.profileUrl || "",
        senderName: user?.username || "",
        createdAt: Timestamp.fromDate(new Date()),
      });
        setText("");
    } catch (err) {
      Alert.alert("Message", err.message);
    }
  };
  return (
    <KeyboardIssue>
      <View className="flex-1">
        <StatusBar style="dark" />
        <ChatHeader user={item} router={router} />
        <View className="border-b border-gray-300" />
        <View className="flex-1 bg-neutral-100 justify-between overflow-visible">
          <View className="flex1">
            <MessageList messages={messages} currentUser={user} />
          </View>
        </View>
        <View className="pt2" style={{ marginBottom: hp(2.7) }}>
          <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full p">
            <TextInput
              placeholder="Type message..."
              className="flex-1 mr-2"
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
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
