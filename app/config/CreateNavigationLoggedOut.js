import React, { Component } from "react";

import {
  View,
  Dimensions,
  Platform,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import { Fragment } from "react";

import {
  StackNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer,
  DrawerItems
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStack from "./HomeStackNavigator";
import SavedProjectScreen from "../screens/SavedProjectScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationScreen from "../screens/NotificationScreen";

import ChatStack from "./ChatStackNavigator";
import LoginStack from "./LoginStackNavigator";
import ProjectStack from "./ProjectStackNavigator";
import GroupStack from "./GroupStackNavigator";

let screen = Dimensions.get("window");

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

const CustomDrawerContentComponent = props => (
  <Fragment>
    <SafeAreaView style={{ flex: 0, backgroundColor: "00a6ff" }} />
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <View>
        <View style={{ height: "90%" }}>
          <ImageBackground
            source={require("../assets/images/drawer.png")}
            resizeMode="stretch"
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    alignSelf: "center"
                  }}
                >
                  Log in voor meer opties
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                width: "90%",
                height: 1,
                alignSelf: "center"
              }}
            />
            <View style={{ flex: 3, paddingLeft: "5%", paddingTop: "5%" }}>
              <DrawerItems {...props} />
            </View>
          </ImageBackground>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",

            width: 50,
            height: 50,
            backgroundColor: "#01a6ff",
            borderRadius: 100
          }}
        >
          <Icon name={"close"} size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </Fragment>
);

export const Tabs = createBottomTabNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Home",
        tabBarVisible: tabbarVisible(navigation),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home-outline" size={28} color={tintColor} />
        )
      })
    },
    ProjectStack: {
      screen: ProjectStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Projecten",
        tabBarVisible: tabbarVisible(navigation),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="lightbulb-on-outline" size={28} color={tintColor} />
        )
      })
    }
  },
  {
    headerMode: "none"
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
    LoginStack: {
      screen: LoginStack,
      navigationOptions: {
        drawerLabel: "Inloggen",
        drawerIcon: ({ tintColor }) => (
          <Icon name="account" size={25} color={tintColor} />
        )
      }
    }
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tabs",
    drawerWidth: Dimensions.get("window").width,
    contentComponent: CustomDrawerContentComponent,
    drawerBackgroundColor: "transparent",

    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "transparent",
      activeLabelStyle: {
        fontColor: "#fff",
        textDecorationLine: "underline"
      },
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
export const RootNavigatorLoggedOut = createAppContainer(Drawer);
