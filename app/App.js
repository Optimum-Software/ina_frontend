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
import Api from "./helpers/Api";
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
        Api.saveToken();
        this.state = {
            loggedIn: false,
            checkedLoggedIn: false
        }
    }

    componentDidMount() {
        OneSignal.init("491e8289-1ec1-4977-8820-03a3ba6c3269");
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
