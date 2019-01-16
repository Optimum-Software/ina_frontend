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
import DatePicker from "react-native-datepicker";

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
      locationError: "",

      beginDate: "",
      endDate: ""
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
              source={this.state.pickedImgUri}
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
            errorStyle={{ color: "red" }}
            errorMessage={this.state.nameError}
          />
          <Input
            placeholder="Beschrijving"
            placeholderTextColor="#4a6572"
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.desc}
            onChangeText={text => this.setState({ desc: text })}
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
            onChangeText={text => this.setState({ location: text })}
            leftIcon={<Icon name="map-marker" size={24} color="#4a6572" />}
            shake={true}
            errorStyle={{ color: "red" }}
            errorMessage={this.state.locationError}
          />
          <DatePicker
            style={{
              width: "75%",
              marginBottom: "3%",
              marginTop: "3%"
            }}
            date={this.state.beginDate}
            mode="date"
            placeholder="Selecteer begin datum"
            format="YYYY-MM-DD"
            minDate="2019-01-01"
            maxDate="2050-06-01"
            confirmBtnText="Bevestig"
            cancelBtnText="Annuleren"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ beginDate: date });
            }}
          />
          <DatePicker
            style={{
              width: "75%"
            }}
            date={this.state.endDate}
            mode="date"
            placeholder="Selecteer eind datum"
            format="YYYY-MM-DD"
            minDate="2019-01-01"
            maxDate="2050-06-01"
            confirmBtnText="Bevestig"
            cancelBtnText="Annuleren"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ endDate: date });
            }}
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
    height: "25%",
    width: "50%",
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
