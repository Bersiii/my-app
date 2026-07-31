import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <StatusBar className="bg-black" />
        <View className="bg-red-300 justify-center items-center flex-1">
          <Text className="text-2xl font-bold">Home</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
