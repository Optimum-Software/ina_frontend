/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { Text, View } from "react-native";
<<<<<<< HEAD
import { RootNavigator } from "./config/router";
import firebaseApi from "./helpers/FirebaseApi";
=======
import { RootNavigator } from "./config/CreateNavigation";
>>>>>>> upstream/master

export default class App extends React.Component {
    constructor() {
        super();
        firebaseApi.checkUser();
    }
    render() {
        return <RootNavigator />;
    }
}
