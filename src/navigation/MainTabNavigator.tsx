import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import BottomNav from "../component/home/BottomNav";
import { BOTTOM_NAV_ITEMS } from "../constants/home/homeData";
import { MainTabParamList } from "../../types";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import KuranSureListScreen from "../screens/KuranSureListScreen";
import NamazScreen from "../screens/NamazScreen";
import ProfilScreen from "../screens/ProfilScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const activeId = state.routes[state.index].name;

  return (
    <BottomNav
      items={BOTTOM_NAV_ITEMS}
      activeId={activeId}
      onTabPress={(tabId) => {
        const route = state.routes.find((r) => r.name === tabId);
        if (!route || tabId === activeId) return;

        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (!event.defaultPrevented) {
          navigation.navigate(tabId);
        }
      }}
    />
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MainTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="chat" component={ChatScreen} />
      <Tab.Screen name="quran" component={KuranSureListScreen} />
      <Tab.Screen name="prayer" component={NamazScreen} />
      <Tab.Screen name="profile" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
