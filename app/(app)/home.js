import { StatusBar } from "expo-status-bar";
import { useState,useEffect } from "react";
import { View} from "react-native";
import ChatList from "../../component/ChatList";
import Loding from "../../component/loding";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { collection, getDocs } from "firebase/firestore";
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
  }, [user]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (e) {
      console.error("Failed to load users:", e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="light" />

      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex-1 justify-center items-center ">
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
          <Loding size={hp(20)} />
        </View>
      )}
    </>
  );
};

export default Home;
