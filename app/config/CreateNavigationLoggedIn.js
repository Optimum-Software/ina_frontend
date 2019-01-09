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
  TouchableHighlight
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
              marginLeft: "10%",
              marginTop: "10%"
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
              {organisation}
            </Text>
          </View>

          <ImageBackground
            source={profilePhoto}
            resizeMode="cover"
            style={{
              marginLeft: "5%",
              marginTop: "3%",
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: "white"
            }}
            imageStyle={{
              width: '100%',
              height: '100%',
              borderRadius: 200,
            }}
          />
        </View>

        <View style={{ marginBottom: "40%", marginLeft: "5%" }}>
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
          <TouchableHighlight
            style={{width: '50%', height: '13%', justifyContent: 'center'}}
            underlayColor="transparent"
            onPress={() => {
              UserApi.logout();
              User.storeUserId(null)
              User.storeToken(null)
              props.navigation.closeDrawer()
              Router.switchLogout(props.navigation)
            }}>
            <View style={{flexDirection: "row", marginLeft: '10%',width: '60%', justifyContent: 'space-between'}}>
              <Icon name="logout" size={25} color={"white"}  />
              <Text style={{color: 'white', textAlign: 'right',fontWeight: 'bold'}}>Uitloggen </Text>
            </View>
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
    }
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
