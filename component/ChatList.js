import { View, FlatList } from "react-native";
import React from "react";
import ChatItem from "./chatitem";

const ChatList = ({ users }) => {
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => item.id || item.userId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <ChatItem user={item} Index={index} />}
      />
    </View>
  );
};

export default ChatList;
