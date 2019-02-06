"use strict";

import React, { Component } from "react";

import { StyleSheet, View, Text } from "react-native";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class GroupCreate extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Nieuwe groep"
          iconSet="MaterialCommunityIcons"
          leftElement={"arrow-left"}

          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <Text>Hier kan je een nieuwe groep aanmaken ;)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default GroupCreate;
