import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";

const Tabs = createBottomTabNavigator();

const TabBarIcon = ({ routeName, focused }) => {
  let iconSource, backgroundColor, iconColor;

  if (routeName === "Profile") {
    iconSource = require("../images/user.png");
  }
  if (routeName === "PostsScreen") {
    iconSource = require("../images/grid.png");
  }
  if (routeName === "CreatePosts") {
    iconSource = require("../images/new.png");
  }

  if (focused) {
    backgroundColor = "#FF6C00";
    iconColor = "#FFFFFF";
  } else {
    backgroundColor = "#FFFFFF";
    iconColor = "#000000";
  }

  return (
    <View style={[styles.tabIconContainer, { backgroundColor }]}>
      <Image
        source={iconSource}
        style={[styles.tabIcon, { tintColor: iconColor }]}
      />
    </View>
  );
};

const Home = ({ navigation, route }) => {
  let tabBarVisible = true;
  let routeName = getFocusedRouteNameFromRoute(route);
  if (routeName === "CreatePosts") {
    tabBarVisible = false;
    navigation.navigate("CreatePosts");
  }

  return (
    <View style={styles.page}>
      {tabBarVisible && (
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => (
              <TabBarIcon routeName={route.name} focused={focused} />
            ),
            headerShown: false,
            tabBarStyle: {
              borderTopColor: "rgba(0, 0, 0, 0.2)",
              borderTopStyle: "solid",
              borderTopWidth: 1,
              paddingTop: 9,
              paddingBottom: 9,
              justifyContent: "center",
              alignItems: "center",
            },
            tabBarItemStyle: {
              margin: 9,
              flex: 0,
              width: 70,
            },
          })}
          tabBarOptions={{
            activeTintColor: "#FF6C00",
            inactiveTintColor: "#212121",
            labelStyle: { display: "none" },
            style: styles.tabBarStyle,
            tabStyle: styles.tabStyle,
          }}
        >
          <Tabs.Screen name="PostsScreen" component={PostsScreen} />
          <Tabs.Screen name="CreatePosts" component={CreatePostsScreen} />
          <Tabs.Screen name="Profile" component={ProfileScreen} />
        </Tabs.Navigator>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  tabIconContainer: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});
