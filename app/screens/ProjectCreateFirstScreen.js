"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Picker
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
      thumbnail: null,
      pickedImgUri: "",
      imgPicked: false,

      name: "Bert's project",
      desc: "Mooi ding",

      nameError: "",
      descError: "",
      thumbnailError: ""
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
          thumbnail: res,
          pickedImgUri: res.uri,
          imgPicked: true,
          thumbnailError: ""
        });
      }
    });
  }
  goToNextPart() {
    if (
      //  this.state.thumbnail != null &&
      this.state.name != "" &&
      this.state.desc != ""
    ) {
      this.setState({
        nameError: "",
        descError: "",
        thumbnailError: ""
      });
      Router.goTo(
        this.props.navigation,
        "ProjectStack",
        "ProjectCreateSecondScreen",
        {
          thumbnail: this.state.thumbnail,
          imgUri: this.state.pickedImgUri,
          name: this.state.name,
          desc: this.state.desc
        }
      );
    } else if (this.state.thumbnail == null) {
      this.setState({
        thumbnailError: "Kies een omslagfoto voor het project."
      });
    } else if (this.state.name == "") {
      this.setState({
        nameError: "Geef het project een naam"
      });
    } else if (this.state.desc == "") {
      this.setState({
        descError: "Geef het project een beschrijving"
      });
    }
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
          <TouchableOpacity
            style={styles.imgPickContainer}
            onPress={() => this.pickImageHandler()}
          >
            <ImageBackground
              imageStyle={{
                borderRadius: 10,
                width: "100%",
                height: "100%"
              }}
              style={styles.imgBackground}
              source={{ uri: this.state.pickedImgUri }}
            >
              {!this.state.imgPicked && (
                <Icon
                  name="image-plus"
                  type="material-community"
                  size={50}
                  color="#FFFFFF"
                  underlayColor="#FFFFFF"
                />
              )}
            </ImageBackground>
          </TouchableOpacity>
          <Text style={{ color: "red" }}>{this.state.thumbnailError}</Text>
          <Input
            placeholder="Naam"
            placeholderTextColor="#4a6572"
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
            leftIcon={
              <Icon
                name="file-document-box-outline"
                size={24}
                color="#4a6572"
              />
            }
            shake={true}
          />
          <Text style={{ color: "red" }}>{this.state.nameError}</Text>

          <Input
            placeholder="Beschrijving"
            placeholderTextColor="#4a6572"
            multiline={true}
            numberOfLines={8}
            containerStyle={styles.containerStyle}
            inputStyle={(styles.inputStyle, { height: 150 })}
            value={this.state.desc}
            onChangeText={text => this.setState({ desc: text })}
            leftIcon={
              <Icon name="information-outline" size={24} color="#4a6572" />
            }
            shake={true}
          />
          <Text style={{ color: "red" }}>{this.state.descError}</Text>
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
    backgroundColor: "red",
    height: "80%",
    flexDirection: "column",
    alignItems: "center"
  },

  imgPickContainer: {
    height: "30%",
    width: "75%",
    borderRadius: 10,
    backgroundColor: "#F0F0F0"
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center"
  },

  containerStyle: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "transparent",
    marginTop: "3%"
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
