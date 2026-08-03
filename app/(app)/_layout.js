import HomeHeader from "../../component/HomeHeader";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ header: ()=> <HomeHeader/>}} />
    </Stack>
  );
};

export default _layout;
