import { ActivityIndicator, View, ImageBackground } from "react-native";

export default function Starterpage() {
  return (
    <ImageBackground
      source={require("../assets/images/download1.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    </ImageBackground>
  );
}
