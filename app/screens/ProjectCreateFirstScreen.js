"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { Input } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class ProjectCreateFirstScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePhoto: null,
      pickedImgUri: { uri: "" },
      imgPicked: false,

      name: "",
      nameError: "",

      desc: "",
      descError: "",

      location: "",
      locationError: ""
    };
  }

  resetErrors() {
    this.setState({
      organisationError: "",
      jobFunctionError: ""
    });
  }
  pickImageHandler() {
    ImagePicker.showImagePicker({ title: "Kies een profiel photo" }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          profilePhoto: res,
          pickedImgUri: { uri: res.uri },
          imgPicked: true
        });
      }
    });
  }
  goToNextPart() {
    Router.goTo(
      this.props.navigation,
      "ProjectStack",
      "ProjectCreateSecondScreen",
      {}
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Nieuw project"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <View style={styles.inputFieldContainer}>
          <ImageBackground
            style={styles.imgPickContainer}
            imageStyle={{ borderRadius: 100, width: "100%", height: "100%" }}
            source={this.state.pickedImgUri}
          >
            <TouchableOpacity
              style={styles.imgPickBtn}
              onPress={() => this.pickImageHandler()}
            >
              <Icon
                name="image-plus"
                type="material-community"
                size={50}
                color="#00A6FF"
                underlayColor="#c1efff"
              />
            </TouchableOpacity>
          </ImageBackground>
          <Input
            placeholder="Naam"
            placeholderTextColor="#4a6572"
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.name}
            leftIcon={
              <Icon
                name="file-document-box-outline"
                size={24}
                color="#4a6572"
              />
            }
            shake={true}
            errorStyle={{ color: "red" }}
            errorMessage={this.state.nameError}
          />
          <Input
            placeholder="Beschrijving"
            placeholderTextColor="#4a6572"
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.desc}
            leftIcon={
              <Icon name="information-outline" size={24} color="#4a6572" />
            }
            shake={true}
            errorStyle={{ color: "red" }}
            errorMessage={this.state.descError}
          />
          <Input
            placeholder="Locatie"
            placeholderTextColor="#4a6572"
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.location}
            leftIcon={<Icon name="map-marker" size={24} color="#4a6572" />}
            shake={true}
            errorStyle={{ color: "red" }}
            errorMessage={this.state.locationError}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.goToNextPart()}
        >
          <Text style={styles.textStyle}>Verder</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },

  inputFieldContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5%"
  },

  imgPickContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#4a6572"
  },

  imgPickBtn: {
    height: "95%",
    width: "55%",
    borderRadius: 100,
    justifyContent: "center",
    alignSelf: "center"
  },

  containerStyle: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "transparent",
    marginBottom: "3%"
  },

  inputContainerStyle: {
    borderBottomColor: "#4a6572"
  },

  inputStyle: {
    color: "#4a6572"
  },
  textStyle: {
    padding: "4%",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
    marginBottom: "10%",
    backgroundColor: "#00a6ff",
    borderRadius: 25
  }
});

export default ProjectCreateFirstScreen;
