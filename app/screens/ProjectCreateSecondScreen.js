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
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class ProjectCreateSecondScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePhoto: null,
      pickedImgUri: { uri: "" },
      imgPicked: false
    };
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
          imgPicked: true,
          fileName: ""
        });
      }
    });
  }

  goToNextPart() {
    Router.goTo(
      this.props.navigation,
      "ProjectStack",
      "ProjectCreateThirdScreen",
      {}
    );
  }

  showDocumentPicker() {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        // Android
        console.log(
          res.uri,
          res.type, // mime type
          res.fileName,
          res.fileSize
        );
        this.setState({ fileName: res.fileName });
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Voeg documenten toe"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <View style={styles.inputFieldContainer}>
          <Icon
            name="file-upload"
            size={120}
            color="#4a6572"
            style={{ alignSelf: "center" }}
          />
          <Text style={styles.textStyle}>
            Voeg documenten toe aan het project om meer informatie te bieden.
          </Text>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.showDocumentPicker()}
          >
            <Text style={styles.buttonTextStyle}>Voeg documenten toe</Text>
          </TouchableOpacity>
          <Text style={styles.textStyle}>
            {"Toegevoegde documenten: " + this.state.fileName}
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.goToNextPart()}
          >
            <Text style={styles.buttonTextStyle}>Verder</Text>
          </TouchableOpacity>
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
  inputFieldContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5%"
  },
  textStyle: {
    fontSize: 20,
    color: "#4a6572",
    textAlign: "center"
  },
  buttonTextStyle: {
    padding: "4%",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
    marginTop: "50%",
    backgroundColor: "#00a6ff",
    borderRadius: 25
  }
});

export default ProjectCreateSecondScreen;
