import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import {
  StackNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  withNavigation
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import Projectoverview from "../screens/Projectoverview";
import LoginScreen from "../screens/LoginScreen";

let screen = Dimensions.get("window");

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" type="entypo" size={28} color={tintColor} />
      )
    }
  },
  Projectoverview: {
    screen: Projectoverview,
    navigationOptions: {
      tabBarLabel: "Projecten",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="folder-open" type="ionicon" size={28} color={tintColor} />
      )
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarLabel: "Inloggen",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="account" type="ionicon" size={28} color={tintColor} />
      )
    }
  }
});

const MainNavigator = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    }
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);

export const RootNavigator = createAppContainer(MainNavigator);
