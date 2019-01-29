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
  Picker,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions
} from "react-native";
import { Input } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../helpers/Api";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class ProjectEditFirstScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgPicked: true,

      nameError: "",
      descError: "",
      thumbnailError: "",

      textAreaHeight: 40,

      id: this.props.navigation.getParam("id", ""),
      name: this.props.navigation.getParam("name", ""),
      desc: this.props.navigation.getParam("desc", ""),
      start_date: this.props.navigation.getParam("start_date", ""),
      end_date: this.props.navigation.getParam("end_date", ""),
      location: this.props.navigation.getParam("location", ""),
      thumbnail: this.props.navigation.getParam("thumbnail", ""),
      images: this.props.navigation.getParam("images", ""),
      files: this.props.navigation.getParam("files", ""),
      tags: this.props.navigation.getParam("tags", "")
    };
  }

  pickImageHandler() {
    ImagePicker.showImagePicker(
      { title: "Kies een omslagfoto voor het project" },
      res => {
        if (res.didCancel) {
          console.log("User cancelled!");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          this.setState({
            thumbnail: res.uri,
            imgPicked: true,
            thumbnailError: ""
          });
        }
      }
    );
  }

  goToNextPart() {
    if (
      this.state.thumbnail != null &&
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
        "ProjectEditSecondScreen",
        {
          id: this.state.id,
          name: this.state.name,
          desc: this.state.desc,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          location: this.state.location,
          thumbnail: this.state.thumbnail,
          images: this.state.images,
          files: this.state.files,
          tags: this.state.tags
        }
      );
    } else if (this.state.thumbnail == null) {
      this.setState({
        thumbnailError: "Kies een omslagfoto voor het project.",
        nameError: "",
        descError: ""
      });
    } else if (this.state.name == "") {
      this.setState({
        nameError: "Dit veld mag niet leeg zijn.",
        thumbnailError: "",
        descError: ""
      });
    } else if (this.state.desc == "") {
      this.setState({
        descError: "Dit veld mag niet leeg zijn.",
        thumbnailError: "",
        nameError: ""
      });
    }
  }

  updateSize = textAreaHeight => {
    this.setState({
      textAreaHeight
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <Toolbar
          centerElement="Project aanpassen"
          iconSet="MaterialCommunityIcons"
          leftElement={"chevron-left"}
          onLeftElementPress={() => Router.goBack(this.props.navigation)}
        />
        <ScrollView style={{ height: "85%", width: "100%" }}>
          <View style={styles.inputFieldContainer}>
            <TouchableOpacity
              style={styles.imgPickContainer}
              onPress={() => this.pickImageHandler()}
            >
              <ImageBackground
                imageStyle={{
                  borderRadius: 100,
                  width: 150,
                  height: 150
                }}
                style={styles.imgBackground}
                source={{ uri: this.state.thumbnail }}
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

            <Text style={styles.thumbnailLabelStyle}>OMSLAGFOTO</Text>
            <Text style={{ color: "red" }}>{this.state.thumbnailError}</Text>

            <Text style={styles.labelStyle}>TITEL</Text>
            <Input
              placeholder="Type hier de titel.."
              placeholderTextColor="#4a6572"
              maxLength={50}
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputStyle}
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
            <Text style={{ color: "red" }}>{this.state.nameError}</Text>

            <Text style={styles.labelStyle}>BESCHRIJVING</Text>
            <Input
              placeholder="Begin met het typen van een beschrijving.."
              placeholderTextColor="#4a6572"
              multiline={true}
              editable={true}
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputStyle}
              value={this.state.desc}
              textAlignVertical={"top"}
              onChangeText={text => this.setState({ desc: text })}
              onContentSizeChange={e =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
            />
            <Text style={{ color: "red" }}>{this.state.descError}</Text>
          </View>
        </ScrollView>

        <View
          style={{
            width: "100%",
            height: "10%"
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.goToNextPart()}
          >
            <Text style={styles.buttonTextStyle}>Verder</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    width: "100%"
  },

  inputFieldContainer: {
    width: "85%",
    paddingTop: "5%",
    alignItems: "center",
    alignSelf: "center"
  },

  imgPickContainer: {
    height: 150,
    width: 150,
    borderRadius: 100,
    backgroundColor: "#dee5e8",
    marginBottom: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  imgBackground: {
    borderRadius: 100,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center"
  },

  containerStyle: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "transparent",
    marginBottom: 20
  },

  inputStyle: {
    color: "#4a6572",
    height: undefined
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
    backgroundColor: "#00a6ff",
    borderRadius: 25
  },
  labelStyle: {
    alignSelf: "flex-start",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#a8a8a8"
  },
  thumbnailLabelStyle: {
    paddingBottom: "2%",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#a8a8a8",
    borderBottomWidth: 1,
    borderBottomColor: "#4a6572"
  }
});

export default ProjectEditFirstScreen;
