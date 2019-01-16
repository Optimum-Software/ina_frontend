"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class ProjectCreateThirdScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  createProject() {}

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Maak het project aan"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <View style={styles.content}>
          <TouchableHighlight
            underlayColor="#c1efff"
            style={styles.buttonStyle}
            onPress={() => this.createProject()}
          >
            <Text style={styles.buttonTextStyle}>Maak project</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  content: {
    alignItems: "center"
  },
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
    marginBottom: "10%",
    backgroundColor: "#00a6ff",
    borderRadius: 25
  },
  buttonTextStyle: {
    padding: "4%",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  }
});

export default ProjectCreateThirdScreen;
