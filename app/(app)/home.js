import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

// Fixed folder path typo ('contextt' -> 'context')
import { useAuth } from "../../contextt/authContext";

const Home = () => {
  const { logout } = useAuth();

  const handlelogout = async () => {
    await logout();
  };

  return (
    <>
      <StatusBar style="dark" />

      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-2xl font-bold mb-4">Home</Text>

        <Pressable
          onPress={handlelogout}
          className="bg-red-600 px-6 py-2 rounded-lg active:opacity-80"
        >
          <Text className="text-white font-bold text-base">Log Out</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Home;
