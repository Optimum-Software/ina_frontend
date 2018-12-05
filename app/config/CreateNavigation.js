import React from "react";
import {Dimensions} from "react-native";
import {createAppContainer, createBottomTabNavigator, createStackNavigator, StackNavigator} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import LoginStack from "./LoginStackNavigator";
import ProjectStack from "./ProjectStackNavigator"

let screen = Dimensions.get("window");

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({tintColor}) => (
        <Icon name="home" type="entypo" size={28} color={tintColor}/>
      )
    }
  },
  ProjectStack: {
    screen: ProjectStack,
    navigationOptions: {
      tabBarLabel: "Projecten",
      tabBarIcon: ({tintColor}) => (
        <Icon name="lightbulb-on" type="ionicon" size={28} color={tintColor}/>
      )
    }
  },
  LoginStack: {
    screen: LoginStack,
    navigationOptions: {
      tabBarLabel: "Inloggen",
      tabBarIcon: ({tintColor}) => (
        <Icon name="account" type="ionicon" size={28} color={tintColor}/>
      )
    }
  }
});

const MainNavigator = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: ({navigation}) => ({
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
