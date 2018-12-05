"use strict";

import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

class RegistrationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Registreren"
  });
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({});

export default RegistrationScreen;
