import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Componenttext from "../component/componenttext";
import Loding from "../component/loding";
import { useAuth } from "../contextt/authContext";

const avatarOptions = [
  "https://i.pinimg.com/736x/67/6b/55/676b555240b3019fa25ddaaffbc16a52.jpg",
  "https://i.pinimg.com/736x/03/3f/bd/033fbd165481691e17844bb47c6c0bad.jpg",
  "https://i.pinimg.com/736x/73/79/42/737942f79d76e4059b28163f9f5f53dc.jpg",
  "https://i.pinimg.com/736x/be/76/ca/be76ca4fc4f03b8f2ac1b8e8df671da9.jpg",
  "https://i.pinimg.com/736x/b8/d4/c5/b8d4c53ee4c06a19afefdc4014232b4e.jpg",
  "https://i.pinimg.com/736x/d7/ea/8b/d7ea8b44f6ae80d6ee22ae0afec52ee5.jpg",
  "https://i.pinimg.com/736x/fb/0f/0d/fb0f0d9fae2c6db8a7a3e30583023386.jpg",
  "https://i.pinimg.com/736x/cc/cf/83/cccf83665b8b8f0c947c155b00488962.jpg",
  "https://i.pinimg.com/736x/22/56/5c/22565ca627998ef0eb7e9d205740ec6f.jpg",
  "https://i.pinimg.com/736x/18/10/07/1810074c402dd36d7c09d1d44031813d.jpg",
  "https://i.pinimg.com/1200x/82/0e/31/820e31ac0a7df7d208b843ec99643e2f.jpg",
];

const Signup = () => {


  const route = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const usernameref = useRef("");
  const emailref = useRef("");
  const passwordref = useRef("");

  const handleregster = async () => {
    if (
      !emailref.current ||
      !passwordref.current ||
      !selectedAvatar ||
      !usernameref.current
    ) {
      Alert.alert("Sign Up", "Please fill all the fields");
      return;
    }

    setLoading(true);
    let response = await register(
      emailref.current,
      passwordref.current,
      usernameref.current,
      selectedAvatar,
    );
    setLoading(false);

    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
      return;
    }

    route.replace("home");
  };

  return (
    <ImageBackground
      source={require("../assets/images/download1.jpg")}
      style={{ flex: 1, width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <Componenttext>
        <StatusBar style="dark" />

        <View className="mt-6 p-4 rounded-lg">
          {/* <Image
            source={require("../assets/images/signup.png")}
            resizeMode="contain"
            style={{ height: hp(18) }}
            className="w-full"
          /> */}
        </View>

        <View className="gap-6 p-3 rounded-lg  mt-48">
          <Text
            style={{ fontSize: hp(3), color: "#000000" }}
            className="font-bold tracking-wider text-center"
          >
            Sign Up
          </Text>

          <View className="gap-4">
            {/* Username Input */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 rounded-2xl px-4 items-center bg-neutral-100 "
            >
              <Octicons name="person" size={hp(2.7)} color={"#000000"} />
              <TextInput
                onChangeText={(value) => (usernameref.current = value)}
                style={{ fontSize: hp(2) }}
                className="bg-neutral-100 flex-1 font-bold"
                placeholder="UserName"
                placeholderTextColor={"#94A3B8"}
              />
            </View>

            {/* Email Input */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 rounded-2xl px-4 items-center bg-neutral-100"
            >
              <Octicons name="mail" size={hp(2.7)} color={"#000000"} />
              <TextInput
                onChangeText={(value) => (emailref.current = value)}
                style={{ fontSize: hp(2) }}
                className="bg-neutral-100 flex-1 font-bold"
                placeholder="Enter an email"
                placeholderTextColor={"#94A3B8"}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 rounded-2xl px-4 items-center bg-neutral-100"
            >
              <Octicons name="lock" size={hp(2.7)} color={"#000000"} />
              <TextInput
                onChangeText={(value) => (passwordref.current = value)}
                style={{ fontSize: hp(2) }}
                className="bg-neutral-100 flex-1 font-bold"
                placeholder="Password"
                placeholderTextColor={"#94A3B8"} 
                secureTextEntry
              />
            </View>

            {/* Avatar Picker Component */}
            <View className="gap-3 my-2">
              <View className="flex-row items-center justify-between px-1">

                <Text className="text-xs font-bold uppercase tracking-wider text-white">
                  Choose an avatar
                </Text>
                
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 14, paddingHorizontal: 4 }}
                className="py-1"
              >
                {avatarOptions.map((avatar) => {
                  const isSelected = selectedAvatar === avatar;

                  return (
                    <Pressable
                      key={avatar}
                      onPress={() => setSelectedAvatar(avatar)}
                      className="relative items-center justify-center active:scale-95"
                    >
                      <View
                        className={`rounded-full p-1 ${
                          isSelected ? "bg-[#2E5D9F]" : "bg-neutral-200"
                        }`}
                      >
                        <Image
                          source={{ uri: avatar }}
                          className={`w-14 h-14 rounded-full border-2 ${
                            isSelected ? "border-white" : "border-transparent"
                          }`}
                        />
                      </View>

                      {isSelected && (
                        <View
                          style={{ backgroundColor: "#2E5D9F" }}
                          className="absolute -bottom-1 -right-1 rounded-full w-5 h-5 items-center justify-center border-2 border-white"
                        >
                          <Text className="text-[10px] text-white font-bold">
                            ✓
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Action Buttons */}
            <View className="justify-center items-center gap-4 mt-6">
              <View>
                {loading ? (
                  <View
                    className="justify-center items-center"
                    style={{ width: hp(10), height: hp(8) }}
                  >
                    <Loding size={hp(10)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{ backgroundColor: "#000000" }}
                    className="px-20 py-3 rounded-2xl"
                    activeOpacity={0.7}
                    onPress={handleregster}
                  >
                    <Text
                      style={{ fontSize: hp(2) }}
                      className="font-bold text-white text-center"
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View className="flex-row gap-1 items-center">
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-slate-400"
                >
                  Already have an account?
                </Text>
                <Pressable onPress={() => route.push("signin")}>
                  <Text
                    style={{ fontSize: hp(1.9), color: "#ffffff" }}
                    className="font-bold ml-1"
                  >
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Componenttext>
    </ImageBackground>
  );
};

export default Signup;
