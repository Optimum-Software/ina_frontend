import React, { Component } from "react";
import { NavigationActions, DrawerItems } from "react-navigation";
import PropTypes from "prop-types";

import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default class DrawerContentComponent extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/drawer.png")}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          height: "80%",
          width: Dimensions.get("window").width
        }}
      >
        <DrawerItems {...props} />
        <TouchableOpacity
          onPress={alert("hi")}
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
      </ImageBackground>
    );
  }
}

DrawerContentComponent.propTypes = {
  navigation: PropTypes.object
};

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
