import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { ImageBackground, Image, Text } from "react-native";
import "../global.css";

// type TabIconProps = {
//   icon: any;
//   name: string;
//   focused: boolean;
// };

const TabIcon = ({
  icon,
  name,
  focused,
}: {
  icon: any;
  name: string;
  focused: boolean;
}) => {
  return (
    <>
      {focused ? (
        <ImageBackground
          source={images.highlight}
          className="flex flex-row w-full flex-1 min-w-[100px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden gap-3"
        >
          <Image source={icon} tintColor="#151213" className="size-5" />
          <Text className="text-secondary text-base font-semibold">{name}</Text>
        </ImageBackground>
      ) : (
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      )}
    </>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D13",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 5,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D13",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} name={"search"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.save} name={"Save"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} name={"Profile"} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
