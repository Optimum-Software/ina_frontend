"use strict";

import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

class RegistrationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: Header.HEIGHT }}>
          <Toolbar
            iconSet="MaterialCommunityIcons"
            centerElement="Projecten"
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </View>
        <Text>Registreren</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default RegistrationScreen;
