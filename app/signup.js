import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { useAuth } from "../contextt/authContext";
import Componenttext from "../component/componenttext";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Loding from "../component/loding";

const Signin = () => {
  const route = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const usernameref = useRef("");
  const emailref = useRef("");
  const passwordref = useRef("");
  const profileref = useRef("");
  const handleregster = async () => {
    if (
      !emailref.current ||
      !passwordref.current ||
      !profileref.current ||
      !usernameref.current
    ) {
      Alert.alert("Sign in", "Please fill all the fields");
      return;
    }

    setLoading(true);

    let response = await register(
      emailref.current,
      passwordref.current,
      usernameref.current,
      profileref.current,
    );
    setLoading(false);

    console.log("got result: ", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <Componenttext>
      <StatusBar className="bg-black" />
      <View className="mt-10  p-4 rounded-lg">
        <Image
          source={require("../assets/images/signup.png")}
          resizeMode="contain"
          style={{ height: hp(20) }}
          className="w-full"
        />
      </View>
      <View className="gap-10 p-3 rounded-lg">
        <Text
          style={{ fontSize: hp(3), color: "#2E5D9F" }}
          className="font-bold tracking-wider text-center"
        >
          Sign Up
        </Text>
        <View className="gap-4">
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4  rounded-2xl px-4 items-center bg-neutral-200"
          >
            <Octicons name="person" size={hp(2.7)} color={"#2E5D9F"}></Octicons>
            <TextInput
              onChangeText={(Value) => (usernameref.current = Value)}
              style={{ fontSize: hp(2) }}
              className=" bg-neutral-200 flex-1 font-bold"
              placeholder="UserName"
              placeholderTextColor={"gray"}
            />
          </View>
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4  rounded-2xl px-4 items-center bg-neutral-200"
          >
            <Octicons name="mail" size={hp(2.7)} color={"#2E5D9F"}></Octicons>
            <TextInput
              onChangeText={(Value) => (emailref.current = Value)}
              style={{ fontSize: hp(2) }}
              className=" bg-neutral-200 flex-1 font-bold"
              placeholder="Enter an email"
              placeholderTextColor={"gray"}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="gap-2">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4  rounded-2xl px-4 items-center bg-neutral-200"
            >
              <Octicons name="lock" size={hp(2.7)} color={"#2E5D9F"}></Octicons>
              <TextInput
                onChangeText={(Value) => (passwordref.current = Value)}
                style={{ fontSize: hp(2) }}
                className=" bg-neutral-200 flex-1 font-bold"
                placeholder="Password"
                placeholderTextColor={"gray"}
                secureTextEntry
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4  rounded-2xl px-4 items-center bg-neutral-200"
            >
              <Octicons
                name="image"
                size={hp(2.7)}
                color={"#2E5D9F"}
              ></Octicons>
              <TextInput
                onChangeText={(Value) => (profileref.current = Value)}
                style={{ fontSize: hp(2) }}
                className=" bg-neutral-200 flex-1 font-bold"
                placeholder="Profile URL"
                placeholderTextColor={"gray"}
              />
            </View>
          </View>

          <View className="justify-center items-center gap-4 mt-10">
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
                  style={{ backgroundColor: "#2E5D9F" }}
                  className="px-20 py-2 rounded-2xl"
                  activeOpacity={0.7}
                  onPress={handleregster}
                >
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-white  "
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="flex-row">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Already have an account ?
              </Text>
              <Pressable onPress={() => route.push("signin")}>
                <Text
                  style={{ fontSize: hp(1.9), color: "#2E5D9F" }}
                  className="font-bold "
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Componenttext>
  );
};

export default Signin;
