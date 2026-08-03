import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Starterpage(){
  return (
    
      <View className="flex-1 justify-center items-center bg-slate-600">
        <ActivityIndicator size="large" color="#22c55e"/>
      </View>
    
  );
};


