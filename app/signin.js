import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from "react-native-responsive-screen";
import Componenttext from "../component/componenttext";
import Loding from "../component/loding";
import { useAuth } from '../contextt/authContext';

const Signin = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const emailref = useRef("");
  const passwordref = useRef("");
  const handlelogin = async () => {
    if (!emailref.current || !passwordref.current) {
      Alert.alert("Sign in", "Please fill all the fields");
      return;
    }
    setLoading(true);
    let response = await login(emailref.current, passwordref.current);
    setLoading(false);

    console.log("got result: ", response);

    if (!response.success) {
      let msg = response.msg || "";

      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Invalid email or password.";
      } else if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email format.";
      } else if (msg.includes("(auth/email-already-in-use)")) {
        msg = "This email is already registered.";
      } else if (msg.includes("(auth/weak-password)")) {
        msg = "Password should be at least 6 characters.";
      }

      Alert.alert("Sign Up", msg);
      return; // Stop execution on failure
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/download1.jpg")}
      style={{ flex: 1, width: "100%", height: "100%" }}
      className="flex-1"
      resizeMode="cover"
    >
      <Componenttext>
        <StatusBar className="bg-black" />

        <View className="flex-1 justify-center gap-10 p-4 rounded-lg">
          <Text
            style={{ fontSize: hp(3), color: "#000000" }}
            className="font-bold tracking-wider text-center"
          >
            Sign in
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4   px-5 items-center bg-white  ml-8 mr-6 rounded-full"
            >
              <Octicons name="mail" size={hp(2.7)} color={"#000000"}></Octicons>
              <TextInput
                onChangeText={(Value) => (emailref.current = Value)}
                style={{ fontSize: hp(2) }}
                className=" bg-white flex-1 font-bold"
                placeholder="Enter an email"
                placeholderTextColor={"gray"}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="gap-2">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4   px-5 items-center  ml-8 mr-6 bg-white
                 rounded-full"
              >
                <Octicons
                  name="lock"
                  size={hp(2.7)}
                  color={"000000"}
                ></Octicons>
                <TextInput
                  onChangeText={(Value) => (passwordref.current = Value)}
                  style={{ fontSize: hp(2) }}
                  className=" bg-white flex-1 font-bold"
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                />
              </View>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="text-right font-bold text-slate-200"
              >
                Forgot password?
              </Text>
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
                    style={{ backgroundColor: "#000000" }}
                    className="px-20 py-2 rounded-2xl"
                    activeOpacity={0.7}
                    onPress={handlelogin}
                  >
                    <Text
                      style={{ fontSize: hp(2) }}
                      className="font-bold text-white  "
                    >
                      Sign in
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View className="flex-row">
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-slate-300"
                >
                  Don't have an account ?
                </Text>
                <Pressable onPress={() => route.push("signup")}>
                  <Text
                    style={{ fontSize: hp(1.9), color: "#FFFFFF" }}
                    className="font-bold "
                  >
                    Sign up
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

export default Signin;
