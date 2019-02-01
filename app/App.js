/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet, Platform, Linking } from "react-native";
import { RootNavigation } from "./config/CreateRootNavigation";
import firebaseApi from "./helpers/FirebaseApi";
import User from "./helpers/User";
import Router from "./helpers/Router";
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
        this.state = {
            loggedIn: false,
            checkedLoggedIn: false
        }
    }

    componentDidMount() {
        OneSignal.init("33abe35a-5325-45cc-bbee-074d6cc1d558");
        OneSignal.addEventListener("ids", this.onIds);
        OneSignal.configure();
        User.getUserId().then( id => {
            this.setState({checkedLoggedIn: true})
            if(id != null) {
                this.setState({loggedIn: true})
            } else {
                this.setState({loggedIn: false})
            }
        });
    }

    onIds(device) {
        User.storeDeviceId(device.userId);
    }

    render() {
        const { checkedLoggedIn, loggedIn } = this.state
        if(!checkedLoggedIn) {
            return null;
        }
        const Root = RootNavigation(loggedIn)
        return <ThemeContext.Provider value={getTheme(uiTheme)}><Root /></ThemeContext.Provider>;
    }
}
