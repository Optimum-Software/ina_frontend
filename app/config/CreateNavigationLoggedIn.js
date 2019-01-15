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
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
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
import HomeScreen from "../screens/HomeScreen";
import SavedProjectScreen from "../screens/SavedProjectScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import RegistrationScreenVerifySuccessfull from "../screens/RegistrationScreenVerifySuccessfull";

import GroupStack from "./GroupStackNavigator";
import ChatStack from "./ChatStackNavigator";
import LoginStack from "./LoginStackNavigator";
import ProjectStack from "./ProjectStackNavigator";
import UserApi from "../helpers/UserApi";
import Router from "../helpers/Router";
import User from "../helpers/User";
import Api from "../helpers/Api";

let screen = Dimensions.get("window");
let firstName = "";
let lastName = "";
let profilePhoto = { uri: ""};
let organisation = "";
User.getUserId().then( id => {
  if(id != null) {
    Api.callApiGetSafe('getUserById/' + id).then(res => {
      firstName = res['user'].firstName;
      lastName = res['user'].lastName;
      profilePhoto.uri = Api.getFileUrl(res['user'].profilePhotoPath);
      organisation = res['user'].organisation;
    })
    console.log(profilePhoto)
  }
})

const { width, height } = Dimensions.get('window')

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
            flexDirection: "row",
            alignItems: 'center',
          }}
        >
          <ImageBackground
            source={profilePhoto}
            resizeMode="cover"
            style={{
              marginLeft: "5%",
              width: 75,
              height: 75,
              borderRadius: 100,
              backgroundColor: "white"
            }}
            imageStyle={{
              width: '100%',
              height: '100%',
              borderRadius: 200,
            }}
          />
          <View
            style={{
              flexDirection: "column",
              height: '100%',
              justifyContent: 'center',
              paddingLeft: '5%'
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: "1%"
              }}
            >
              Hallo, {firstName}!
            </Text>
            <Text
              style={{
                color: "#fff"
              }}
            >
              Scheikunde docent
            </Text>
          </View>

        </View>
        <View
          style={{
            backgroundColor: "#fff",
            width: "90%",
            paddingLeft: '5%',
            paddingRight: '5%',
            height: 1,
            alignSelf: "center",
          }}
        />
        <View style={{paddingLeft: '5%', paddingTop: '5%', flex: 3 }}>

          <DrawerItems {...props} />
          <TouchableHighlight
                key="logout"
                onPress={() => {
                  UserApi.logout();
                  User.storeUserId(null)
                  User.storeToken(null)
                  props.navigation.closeDrawer()
                  Router.switchLogout(props.navigation)
                    props.navigation.navigate('DrawerClose');
                }}
                delayPressIn={0}
            >
                <SafeAreaView forceInset={{ left: 'always', right: 'never', vertical: 'never' }}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center' }, {}]}>
                        <View style={[{ marginHorizontal: 16, width: 24, alignItems: 'center' }, {}]}>
                            <Icon name="logout" size={25} color={"white"}   />
                        </View>
                        <Text style={[{ margin: 16, fontWeight: 'bold' }, { color: 'white'}]}>Uitloggen</Text>
                    </View>
                </SafeAreaView>
            </TouchableHighlight>

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
  </SafeAreaView>
  </Fragment>
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
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" size={25} color={tintColor} />
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
        drawerLabel: "Opgeslagen",
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

export const RootNavigatorLoggedIn = createAppContainer(Drawer);
