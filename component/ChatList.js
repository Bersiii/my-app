import { View, FlatList } from "react-native";
import React from "react";
import ChatItem from "./chatitem";
import { useRouter } from "expo-router";

const ChatList = ({ users }) => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => item.id || item.userId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            item={item}
            router={router}
            noBorder={index + 1 === users.length}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
