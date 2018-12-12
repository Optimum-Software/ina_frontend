"use strict";

import React, { Component } from "react";

import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Router from "../helpers/Router";

class SideMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            Router.goTo(
              this.props.navigation,
              "Register",
              "RegisterStart",
              null
            );
          }}
        >
          <View style={styles.listItem}>
            <Text>Item 1</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity>
          <View style={styles.listItem}>
            <Text>Item 2</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity>
          <View style={styles.listItem}>
            <Text>Item 3</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eceff1",
    flex: 1
  },
  listItem: {
    height: 30,
    width: "100%"
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "black"
  }
});

export default SideMenu;
