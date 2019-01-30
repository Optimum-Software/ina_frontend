"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";
import { BallIndicator } from "react-native-indicators";
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
      thumbnailUri: this.props.navigation.getParam("thumbnailUri", ""),
      thumbnailName: this.props.navigation.getParam("thumbnailName", ""),
      documents: this.props.navigation.getParam("documents", ""),
      tags: this.props.navigation.getParam("tags", "")
    };
  }

  componentDidMount() {
    this.createProject();
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
        this.state.thumbnailUri,
        this.state.thumbnailName,
        this.state.documents,
        this.state.tags
      ).then(result => {
        console.log("RESPONSE");
        console.log(result);
        if (result["bool"]) {
          ProjectApi.getProjectById(result["id"]).then(result => {
            this.setState({
              creating: false,
              projectCreated: true,
              project: result["project"]
            });
          });
        } else {
          this.setState({
            creating: false,
            projectCreated: false
          });
          alert(result["msg"]);
        }
      });
    });
  }

  goToNextPart() {
    Router.goTo(this.props.navigation, "ProjectStack", "ProjectDetailScreen", {
      id: this.state.project.id,
      name: this.state.project.name,
      desc: this.state.project.desc,
      start_date: this.state.project.start_date,
      end_date: this.state.project.end_date,
      created_at: this.state.project.created_at,
      like_count: this.state.project.like_count,
      follower_count: this.state.project.follower_count,
      location: this.state.project.location,
      thumbnail: this.state.project.thumbnail,
      creator: this.state.project.creator,
      images: this.state.project.images,
      files: this.state.project.files
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        {this.state.projectCreated == false && (
          <View style={styles.container}>
            <Toolbar
              centerElement="Project aanmaken"
              iconSet="MaterialCommunityIcons"
            />

            <View style={styles.content}>
              {this.state.creating && (
                <View style={{ paddingTop: "5%" }}>
                  <Text style={styles.loadingTextStyle}>
                    Project wordt aangemaakt...
                  </Text>
                  <BallIndicator size={100} color="#00a6ff" />
                </View>
              )}
            </View>
          </View>
        )}
        {this.state.projectCreated && (
          <View style={styles.container}>
            <Toolbar
              centerElement="Project aangemaakt"
              iconSet="MaterialCommunityIcons"
            />

            <View style={styles.content}>
              <Icon
                name="verified"
                size={200}
                color="#4a6572"
                style={{ marginTop: "5%" }}
              />
              <Text style={styles.succesTextStyle}>
                Project is succesvol aangemaakt!
              </Text>
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.goToNextPart()}
            >
              <Text style={styles.buttonTextStyle}>Ga naar jouw project</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    width: "100%"
  },
  content: {
    height: "80%",
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center"
  },
  loadingTextStyle: {
    fontSize: 16,
    color: "#4a6572",
    textAlign: "center",
    marginBottom: "2%"
  },
  succesTextStyle: {
    fontSize: 16,
    color: "#4a6572",
    textAlign: "center",
    marginTop: "5%"
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
