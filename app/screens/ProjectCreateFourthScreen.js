"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";

class ProjectCreateFourthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creating: false,
      projectCreated: false,
      name: this.props.navigation.getParam("name", ""),
      desc: this.props.navigation.getParam("desc", ""),
      location: this.props.navigation.getParam("location", ""),
      beginDate: this.props.navigation.getParam("beginDate", ""),
      endDate: this.props.navigation.getParam("endDate", ""),
      thumbnail: this.props.navigation.getParam("thumbnail", ""),
      imgUri: this.props.navigation.getParam("imgUri", ""),
      documents: this.props.navigation.getParam("documents", "")
    };
  }

  createProject() {
    this.setState({
      creating: true
    });
    User.getUserId().then(id => {
      ProjectApi.createProject(
        id,
        this.state.name,
        this.state.desc,
        this.state.location,
        this.state.beginDate,
        this.state.endDate,
        this.state.imgUri,
        this.state.documents
      ).then(result => {
        console.log("RESPONSE");
        console.log(result);
        if (result["bool"]) {
          this.setState({
            creating: false,
            projectCreated: true
          });
          alert("Aangemaakt jonguh");
        } else {
          this.setState({
            creating: false,
            projectCreated: false
          });
          alert("Aanmaken ging fout");
        }
      });
    });
  }

  goToNextPart() {
    Router.goTo(
      this.props.navigation,
      "ProjectStack",
      "ProjectOverviewScreen",
      {}
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.projectCreated == false && (
          <View style={styles.container}>
            <Toolbar
              centerElement="Maak het project aan"
              iconSet="MaterialCommunityIcons"
              leftElement={"chevron-left"}
              onLeftElementPress={() => Router.goBack(this.props.navigation)}
            />

            <View style={styles.content} />

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.createProject()}
            >
              <Text style={styles.buttonTextStyle}>Maak project</Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.projectCreated && (
          <View style={styles.container}>
            <Toolbar
              centerElement="Project aangemaakt"
              iconSet="MaterialCommunityIcons"
            />

            <View style={styles.content}>
              <Icon name="verified" size={140} color="#fff" />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.goToNextPart()}
            >
              <Text style={styles.buttonTextStyle}>Ga naar het overzicht</Text>
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: "red",
    height: "80%",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
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

export default ProjectCreateFourthScreen;
