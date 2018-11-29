import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import {
  StackNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  withNavigation
} from "react-navigation";
import { Icon } from "react-native-elements";

import Home from "../screens/Home";
import Projectoverview from "../screens/Projectoverview";

let screen = Dimensions.get("window");

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="open-book" type="entypo" size={28} color={tintColor} />
      )
    }
  },
  Projectoverview: {
    screen: Projectoverview,
    navigationOptions: {
      tabBarLabel: "Projectoverview",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-map" type="ionicon" size={28} color={tintColor} />
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
