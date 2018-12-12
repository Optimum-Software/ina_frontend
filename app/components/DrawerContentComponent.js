import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { white } from "ansi-colors";

export default class drawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require("../assets/drawer-cover.png")}
            style={{ flex: 1, width: 280, justifyContent: "center" }}
          >
            <Text style={styles.headerText}>Header Portion</Text>
            <Text style={styles.headerText}>
              You can display here logo or profile image
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.screenContainer}>
          <View style={styles.screenStyle}>
            <Text onPress={this.navigateToScreen("ScreenA")}>Screen A</Text>
          </View>
          <View style={styles.screenStyle}>
            <Text onPress={this.navigateToScreen("ScreenB")}>Screen B</Text>
          </View>
          <View style={styles.screenStyle}>
            <Text onPress={this.navigateToScreen("ScreenC")}>Screen C</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  headerContainer: {
    height: 150
  },
  headerText: {
    color: "#fff8f8"
  },
  screenContainer: {
    paddingTop: 20
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20
  }
});
