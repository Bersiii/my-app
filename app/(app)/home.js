import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import ChatList from "../../component/ChatList";
import Loding from "../../component/loding";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firbaseconfig";
import { useAuth } from "../../contextt/authContext";
import { getRoomId } from "../../component/common";

const Home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user?.uid, getUsers]);

  const getUsers = useCallback(async () => {
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("userId", "!=", user?.uid));

      const querySnapshot = await getDocs(q);
      const usersData = [];

      for (const docSnap of querySnapshot.docs) {
        const userData = { id: docSnap.id, ...docSnap.data() };
        usersData.push(userData);
      }

      setUsers(usersData);
      setLoading(false);

      usersData.forEach((userData) => {
        if (!userData?.userId) return;

        const roomId = getRoomId(user.uid, userData.userId);
        const roomRef = doc(db, "rooms", roomId);
        const messagesRef = collection(roomRef, "messages");
        const messagesQuery = query(
          messagesRef,
          orderBy("createdAt", "desc"),
          limit(1),
        );

        onSnapshot(messagesQuery, (snapshot) => {
          const latestMessage = snapshot.docs[0]?.data();
          const nextText = latestMessage?.text || "Say Hello👋";
          const nextTime = latestMessage?.createdAt || null;

          setUsers((prevUsers) =>
            prevUsers.map((item) =>
              item.userId === userData.userId
                ? {
                    ...item,
                    lastMessageText: nextText,
                    lastMessageTime: nextTime,
                  }
                : item,
            ),
          );
        });
      });
    } catch (e) {
      console.error("Failed to load users:", e);
      setUsers([]);
      setLoading(false);
    }
  }, [user?.uid]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Loding size={hp(20)} />
        </View>
      ) : users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-neutral-500">No users found.</Text>
        </View>
      )}
    </View>
  );
};

export default Home;
