import React from "react";
import { View, Image, TextInput } from "react-native";
import "../app/global.css";
import { icons } from "@/constants/icons";


interface props{
    placeholder:string,
    onpress?:()=>void,
}

const Search = ({ placeholder, onpress }: props) => {

  
  return (
    <View className="flex-row items-center px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      ></Image>
      <TextInput
        onPress={onpress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#ab8bff"
        className="flex-1 ml-10 text-white"
      />
    </View>
  );
};

export default Search;
