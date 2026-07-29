import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, View, ScrollView } from "react-native";
import Search from "@/component/search";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-2">
          <Search
            onpress={() => router.push("/search")}
            placeholder="Search for movies"
          />
        </View>
      </ScrollView>
    </View>
  );
}
