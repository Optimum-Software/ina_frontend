/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Toolbar } from "react-native-material-ui";

export default class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Meldingen"
          iconSet="MaterialCommunityIcons"
          leftElement={"menu"}
          onLeftElementPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <Text>I'm the NotificationScreen component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
