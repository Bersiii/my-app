import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../contextt/authContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-700 pt-12 ">
      {/* Top Bar with Back Button */}
      <View className="px-6 py-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Main Profile Content Grouped Together */}
      <View className="flex-1 justify-center items-center px-6 pb-20">
        {/* Profile Image with Local Fallback Fix */}
        <Image
          source={
            user?.profileUrl
              ? { uri: user.profileUrl }
              : require("../assets/images/bersi1.png")
          }
          className="w-72 h-72 rounded-full mb-6 border-4 border-black shadow-lg"
        />

        {/* Username */}
        <Text className="text-4xl font-bold text-white tracking-wide text-center">
          {user?.username || "User Name"}
        </Text>

        {/* Email */}
        {user?.email && (
          <Text className="text-base text-white mt-2 text-center">
            {user.email}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Profile;
