import LottieView from "lottie-react-native";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

const Loding = ({ size }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!hasError ? (
        <LottieView
          source={require("../assets/images/K7C1dqOwOM.json")}
          autoPlay
          loop
          resizeMode="contain"
          style={{ width: size, height: size }}
          onError={() => setHasError(true)}
        />
      ) : (
        <ActivityIndicator size="large" color="green" />
      )}
    </View>
  );
};

export default Loding;
