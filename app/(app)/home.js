import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import ChatList from "../../component/ChatList";
import Loding from "../../component/loding";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firbaseconfig";
import { useAuth } from "../../contextt/authContext";

const Home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user?.uid]); // Track user.uid instead of the full user object

  const getUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      // Filter out the currently logged-in user directly in Firestore
      const q = query(usersCollection, where("userId", "!=", user?.uid));

      const querySnapshot = await getDocs(q);
      const usersData = [];

      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });

      setUsers(usersData);
    } catch (e) {
      console.error("Failed to load users:", e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

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
