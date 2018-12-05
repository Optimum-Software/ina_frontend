import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-navigation";
import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";

export default class Projectoverview extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: Header.HEIGHT }}>
          <Toolbar iconSet="MaterialCommunityIcons" centerElement="Projecten" />
        </View>
        <Text style={styles.title}>All projects are listed here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
