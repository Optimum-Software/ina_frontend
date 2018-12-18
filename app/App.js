/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { RootNavigator } from "./config/CreateNavigation";
import firebaseApi from "./helpers/FirebaseApi";
import User from "./helpers/User";
import OneSignal from "react-native-onesignal";
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
      primaryColor: "#00a6ff"
    },
  };

export default class App extends React.Component {
    constructor() {
        super();
        console.disableYellowBox = true;

        firebaseApi.checkUser();
    }

    componentDidMount() {
        OneSignal.init("33abe35a-5325-45cc-bbee-074d6cc1d558");
        OneSignal.configure();
        OneSignal.addEventListener("ids", this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener("ids", this.onIds);
    }

    onIds(device) {
        User.storeDeviceId(device.userId);
    }

    render() {
        return <ThemeContext.Provider value={getTheme(uiTheme)}><RootNavigator /></ThemeContext.Provider>;
    }
}