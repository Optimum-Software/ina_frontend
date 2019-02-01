import React, { Component } from "react";

import { Dimensions, Platform } from "react-native";

import {
  StackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SavedProjectScreen from "../screens/SavedProjectScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import InProgres from "../screens/InProgres";

import HomeStack from "./HomeStackNavigator";
import GroupStack from "./GroupStackNavigator";
import ChatStack from "./ChatStackNavigator";
import LoginStack from "./LoginStackNavigator";
import ProjectStack from "./ProjectStackNavigator";

import ExploreNavigateButton from "./ExploreNavigateButton";

import DrawerContentComponent from "../components/DrawerContentComponent";

let screen = Dimensions.get("window");

const { width, height } = Dimensions.get("window");

const tabbarVisible = navigation => {
  const { routes } = navigation.state;

  let showTabbar = true;
  routes.forEach(route => {
    if (route.routeName === "ProjectDetailScreen") {
      showTabbar = false;
    }
  });

  return showTabbar;
};

export const Tabs = createBottomTabNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: tabbarVisible(navigation),
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home-outline" size={28} color={tintColor} />
        )
      })
    },
    ProjectStack: {
      screen: ProjectStack,
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: tabbarVisible(navigation),
        tabBarLabel: "Projecten",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="lightbulb-on-outline" size={28} color={tintColor} />
        )
      })
    },
    Ontdekken: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarVisible: false,
        tabBarIcon: <ExploreNavigateButton />
      }
    },
    Market: {
      screen: InProgres,
      navigationOptions: {
        tabBarLabel: "Markt",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="pillar" size={28} color={tintColor} />
        )
      }
    },
    Challenge: {
      screen: InProgres,
      navigationOptions: {
        tabBarLabel: "Uitdagingen",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="trophy-outline" size={28} color={tintColor} />
        )
      }
    }
  },
  {
    headerMode: "none",
    tabBarOptions: { showLabel: false }
  }
);

export const Drawer = createDrawerNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor} />
        )
      }
    },
    ChatStack: {
      screen: ChatStack,
      navigationOptions: {
        drawerLabel: "Chat",
        drawerIcon: ({ tintColor }) => (
          <Icon name="message" size={25} color={tintColor} />
        )
      }
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        drawerLabel: "Meldingen",
        drawerIcon: ({ tintColor }) => (
          <Icon name="bell" size={25} color={tintColor} />
        )
      }
    },
    SavedProjectScreen: {
      screen: SavedProjectScreen,
      navigationOptions: {
        drawerLabel: "Mijn projecten",
        drawerIcon: ({ tintColor }) => (
          <Icon name="bookmark" size={25} color={tintColor} />
        )
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerLabel: "Instellingen",
        drawerIcon: ({ tintColor }) => (
          <Icon name="settings" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tabs",
    drawerWidth: Dimensions.get("window").width,
    contentComponent: DrawerContentComponent,
    drawerBackgroundColor: "transparent",

    contentOptions: {
      activeTintColor: "black",
      activeBackgroundColor: "transparent",
      inactiveTintColor: "#fff",
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        opacity: 1
      },
      itemStyle: {
        height: 50
      }
    }
  }
);

export const RootNavigatorLoggedIn = createAppContainer(Drawer);
