/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { Text, View } from "react-native";
import { RootNavigator } from "./config/router";

export default class App extends React.Component {
  render() {
    return <RootNavigator />;
  }
}
