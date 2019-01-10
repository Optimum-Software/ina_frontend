import React, { Component } from "react";

import {
  View,
  Dimensions,
  Platform,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import {
  StackNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer,
  SafeAreaView,
  DrawerItems
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DrawerContentComponent from "../components/DrawerContentComponent";
import HomeScreen from "../screens/HomeScreen";
import SavedProjectScreen from "../screens/SavedProjectScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import RegistrationScreenVerifySuccessfull from "../screens/RegistrationScreenVerifySuccessfull";

import ChatStack from "./ChatStackNavigator";
import LoginStack from "./LoginStackNavigator";
import ProjectStack from "./ProjectStackNavigator";

let screen = Dimensions.get("window");

const CustomDrawerContentComponent = props => (
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
            height: "15%",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flexDirection: "column",
              marginLeft: "25%",
              marginTop: "10%"
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              Log in voor meer opties
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: "80%", marginLeft: "5%" }}>
          <View
            style={{
              backgroundColor: "#fff",
              width: "90%",
              height: 1,
              alignSelf: "center",
              marginBottom: "3%",
              marginTop: "3%"
            }}
          />
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
      <Icon name={"close"} size={30} color="#fff" />
    </TouchableOpacity>
  </View>
);

export const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" type="entypo" size={28} color={tintColor} />
        )
      }
    },
    ProjectStack: {
      screen: ProjectStack,
      navigationOptions: {
        tabBarLabel: "Projecten",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="folder-open" type="ionicon" size={28} color={tintColor} />
        )
      }
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
    },
    ExploreScreen: {
      screen: ExploreScreen,
      navigationOptions: {
        drawerLabel: "Ontdekken",
        drawerIcon: ({ tintColor }) => (
          <Icon name="compass" size={25} color={tintColor} />
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
    },
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tabs",
    drawerWidth: Dimensions.get("window").width,
    contentComponent: CustomDrawerContentComponent,
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
export const RootNavigatorLoggedOut = createAppContainer(Drawer);