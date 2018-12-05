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
import RegistrationScreenStart from "../screens/RegistrationScreenStart";
import RegistrationScreenPhone from "../screens/RegistrationScreenPhone";
import RegistrationScreenVerify from "../screens/RegistrationScreenVerify";
import LoginStack from "./LoginStackNavigator";

let screen = Dimensions.get("window");

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: RegistrationScreenVerify,
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
  LoginStack: {
    screen: LoginStack,
    navigationOptions: {
      tabBarLabel: "Inloggen",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="account" type="ionicon" size={28} color={tintColor} />
      )
    }
  }
});

export const Register = createStackNavigator({
    RegisterStart: {
        screen: RegistrationScreenStart,
        navigationOptions: ({ navigation }) => ({
            gesturesEnabled: false
        })
    },

    RegisterPhone: {
        screen: RegistrationScreenPhone,
        navigationOptions: ({ navigation }) => ({
            gesturesEnabled: false
        })
    }},
    {
        headerMode: "none",
    })

const MainNavigator = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false
      })
    },
    Register: {
        screen: Register,
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