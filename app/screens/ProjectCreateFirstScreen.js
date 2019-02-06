"use strict";

import React, { Component, Fragment } from "react";

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
import BlueButton from "../components/BlueButton";

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

      name: "Docent aan het roer",
      desc:
        "De docent kan bijsturen wanneer en waar het nodig is. De dashboards per individuele leerling en voor de hele klas geven direct inzicht. Heeft de hele klas moeite met een bepaald onderwerp? Dan kan het onderwerp klassikaal nog eens behandeld worden. Met Versterk jezelf verwacht Malmberg dat docenten tijdwinst behalen doordat de leerling zelfstandig een stap verder komt. Hij wordt een stukje onafhankelijker en kan ook thuis verder met lastige lesstof. De leraar komt niet buitenspel te staan, het systeem adviseert leerlingen om naar de docent te gaan als hij het onderwerp lastig blijft vinden. Dit voorkomt dat een leerling eindeloos opdrachten aangeboden krijgt en gedemotiveerd raakt. Zo kan de docent zich richten op de leerlingen die extra ondersteuning nodig hebben. Als docent hoef je natuurlijk niet te wachten tot dat een leerling om hulp vraagt. Met het dashboard is één oogopslag inzichtelijk welk onderwerp als moeilijk wordt ervaren. “Versterk jezelf van MAX Online draagt echt bij aan het verhogen van het kennisniveau van leerlingen in het voortgezet onderwijs.” aldus de jury. Wil je meer weten over MAX? Kijk dan op de website of neem contact op per e-mail. De Award wordt op 31 oktober 2017 uitgereikt. Je kunt nog stemmen op jouw favoriete ICT project.",

      nameError: "",
      descError: "",
      thumbnailError: "",

      textAreaHeight: 40
    };
  }

  pickImageHandler() {
    ImagePicker.showImagePicker(
      {
        title: "Kies een omslagfoto voor het project",
        storageOptions: {
          skipBackup: true,
          path: "images",
          cameraRoll: true,
          waitUntilSaved: true
        }
      },
      res => {
        if (res.didCancel) {
          console.log("User cancelled!");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          this.setState({
            thumbnailUri:
              Platform.OS === "android"
                ? res.uri
                : res.uri.replace("file://", ""),
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
          desc: (this.state.desc)
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
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#00a6ff" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar
            backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
            barStyle="light-content"
          />
          <Toolbar
            centerElement="Project aanmaken 1/3"
            iconSet="MaterialCommunityIcons"
            leftElement={"arrow-left"}
            onLeftElementPress={() => Router.goBack(this.props.navigation)}
          />
          <ScrollView style={{ height: "85%", width: "100%" }}>
            <View style={styles.inputFieldContainer}>
              <Text style={styles.thumbnailLabelStyle}>OMSLAGFOTO</Text>
              <Text style={{ color: "red" }}>{this.state.thumbnailError}</Text>
              <TouchableOpacity
                style={styles.imgPickContainer}
                onPress={() => this.pickImageHandler()}
              >
                <ImageBackground
                  imageStyle={{
                    borderRadius: Dimensions.get("window").width * 0.15,
                    width: Dimensions.get("window").width * 0.3,
                    height: Dimensions.get("window").width * 0.3
                  }}
                  style={styles.imgBackground}
                  source={{
                    uri:
                      this.state.thumbnailUri == null
                        ? ""
                        : this.state.thumbnailUri
                  }}
                >
                  {!this.state.imgPicked && (
                    <Icon
                      name="image-plus"
                      type="material-community"
                      size={Dimensions.get("window").width * 0.15}
                      color="#FFFFFF"
                      underlayColor="#FFFFFF"
                    />
                  )}
                </ImageBackground>
              </TouchableOpacity>

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
            <View
              style={{
                paddingLeft: "10%",
                paddingRight: "10%",
                paddingBottom: "10%"
              }}
            >
              <BlueButton label="Verder" onPress={() => this.goToNextPart()} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
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
    height: Dimensions.get("window").width * 0.3,
    width: Dimensions.get("window").width * 0.3,
    borderRadius: Dimensions.get("window").width * 0.15,
    backgroundColor: "#dee5e8",
    alignItems: "center",
    justifyContent: "center"
  },
  imgBackground: {
    borderRadius: Dimensions.get("window").width * 0.15,
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center"
  },

  containerStyle: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "transparent"
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
    marginBottom: 50,
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
