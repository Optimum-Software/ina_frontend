import React, { Component } from "react";
import { Dimensions, Platform, Text, ScrollView, Image } from "react-native";
import {
  StackNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer,
  withNavigation,
  SafeAreaView,
  DrawerItems
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import SavedProjectScreen from "../screens/SavedProjectScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SettingsScreen from "../screens/SettingsScreen";

import ChatStack from "./ChatStackNavigator";
import LoginStack from "./LoginStackNavigator";
import ProjectStack from "./ProjectStackNavigator";

let screen = Dimensions.get("window");

class DrawerScreen extends Component {
  render() {
    return <Text>Drawer Screen Content</Text>;
  }
}

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <Image
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
      }}
      source={require("../assets/images/drawer.png")}
    />
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "transparent" }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
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
    },
    ChatStack: {
      screen: ChatStack,
      navigationOptions: {
        tabBarLabel: "Chats",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="forum" type="ionicon" size={28} color={tintColor} />
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
        drawerIcon: ({ tintColor }) => <Icon name="home" size={25} />
      }
    },
    LoginStack: {
      screen: LoginStack,
      navigationOptions: {
        drawerLabel: "Login",
        drawerIcon: ({ tintColor }) => <Icon name="account" size={25} />
      }
    },
    ExploreScreen: {
      screen: ExploreScreen,
      navigationOptions: {
        drawerLabel: "Explore",
        drawerIcon: ({ tintColor }) => <Icon name="compass" size={25} />
      }
    },
    SavedProjectScreen: {
      screen: SavedProjectScreen,
      navigationOptions: {
        drawerLabel: "Opgeslagen",
        drawerIcon: ({ tintColor }) => <Icon name="bookmark" size={25} />
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerLabel: "Settings",
        drawerIcon: ({ tintColor }) => <Icon name="settings" size={25} />
      }
    },
    Logout: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: "Uitloggen",
        drawerIcon: ({ tintColor }) => <Icon name="logout" size={25} />
      }
    }
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tabs",
    drawerWidth: Dimensions.get("window").width,
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: "black",
      activeBackgroundColor: "transparent",
      inactiveTintColor: "black",
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

export const RootNavigator = createAppContainer(Drawer);
