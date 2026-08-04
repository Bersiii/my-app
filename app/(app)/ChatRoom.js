import { View } from "react-native";
import React from "react";
import { useLocalSearchParams , useRouter} from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatHeader from "../../component/chatHeader";

export default function ChatRoom() {
  const item = useLocalSearchParams();  
  const router =useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <StatusBar style="dark"/>
      <ChatHeader user={item} router={router} />
    </View>
  );
}
