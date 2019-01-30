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

import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";

class ProjectCreateFirstScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnailUri: null,
      thumbnailName: null,
      pickedImgUri: "",
      imgPicked: false,

      name: "Bert's project",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel lacinia nisl, et mattis ante. Etiam auctor orci est, scelerisque tincidunt dolor blandit ut. Nunc semper dignissim odio eget aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris consectetur accumsan pharetra. Fusce at mattis magna. Sed a sodales felis, quis sagittis ipsum. Suspendisse auctor orci sed laoreet auctor. Aenean id blandit velit, id tincidunt dui. Ut consequat nulla eget dolor consequat feugiat.",

      nameError: "",
      descError: "",
      thumbnailError: "",

      textAreaHeight: 40
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
            thumbnailUri: res.uri,
            thumbnailName: res.fileName,
            imgPicked: true,
            thumbnailError: ""
          });
        }
      }
    );
  }
  goToNextPart() {
    if (
      this.state.thumbnailUri != null &&
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
          thumbnailUri: this.state.thumbnailUri,
          thumbnailName: this.state.thumbnailName,
          name: this.state.name,
          desc: this.state.desc
        }
      );
    } else if (this.state.thumbnailUri == null) {
      this.setState({
        thumbnailError: "Kies een omslagfoto voor het project.",
        nameError: "",
        descError: ""
      });
    } else if (this.state.name == "") {
      this.setState({
        nameError: "Geef het project een naam",
        thumbnailError: "",
        descError: ""
      });
    } else if (this.state.desc == "") {
      this.setState({
        descError: "Geef het project een beschrijving",
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
          centerElement="Project aanmaken 1/3"
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
                source={{ uri: this.state.thumbnailUri }}
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

export default ProjectCreateFirstScreen;
