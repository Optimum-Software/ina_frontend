/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { Text, View } from "react-native";
import { RootNavigator } from "./config/CreateNavigation";
import firebaseApi from "./helpers/FirebaseApi";
<<<<<<< HEAD
=======

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
