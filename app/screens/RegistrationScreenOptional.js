import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Icon } from "react-native-elements";
import Router from "../helpers/Router";
import User from "../helpers/User";
import UserApi from "../helpers/UserApi";
import ImagePicker from "react-native-image-picker";

export default class RegistrationScreenOptional extends Component {
  constructor() {
    super();
    this.state = {
      profilePhoto: null,
      pickedImgUri: { uri: ""},
      imgPicked: false,
      organisation: "",
      organisationError: "",

      jobFunction: "",
      jobFunctionError: "",

      bio: "",
      bioError: ""
    };
  }

  resetErrors() {
    this.setState({
      organisationError: "",
      jobFunctionError: ""
    });
  }

  editOptionalInfo() {
    this.resetErrors()
    User.getUserId().then(id => {
      if(this.state.imgPicked) {
        file = {
          uri: this.state.profilePhoto.uri,
          name: this.state.profilePhoto.fileName,
          type: "multipart/form-data"
        }
        UserApi.uploadProfilePhoto(id, file).then(res => {
          if(res['bool']) {
            this.setState({
              profilePhoto: null,
              pickedImgUri: { uri: ""},
              imgPicked: false,
            });
          } else {
            alert(res['msg'])
          }
        })
      }
      UserApi.editOptionalInfo(id, this.state.organisation, this.state.jobFunction, this.state.bio).then(res => {
        if(res['bool']) {
          this.setState({
            organisation: "",
            jobFunction: "",
            bio: ""
          });
        } else {
          alert(res['msg'])
        }
      });
    });
  }

  pickImageHandler() {
    ImagePicker.showImagePicker(
      { title: "Kies een profiel photo"},
      res => {
        if (res.didCancel) {
          console.log("User cancelled!");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          this.setState({
            profilePhoto: res,
            pickedImgUri: { uri: res.uri},
            imgPicked: true
          });
        }
      }
    );
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/images/bluewavebg.png")}
        resizeMode="stretch"
      >
        <View style={{ flexDirection: "row" }}>
          <Icon
            name="chevron-left"
            type="font-awesome"
            size={20}
            color="#00A6FF"
            underlayColor="#c1efff"
            containerStyle={{ width: "10%", marginTop: "7%" }}
            onPress={() => Router.goBack(this.props.navigation)}
          />
          <View style={{ flex: 2, width: "90%", marginTop: "5%" }}>
            <Text style={styles.infoTextTitle}>Registreren</Text>
            <Text style={styles.infoText}>
              Je kan deze velden invullen om meer informatie te geven over jezelf.
            </Text>
          </View>
        </View>
        <View style={styles.inputFieldContainer}>
          <ImageBackground
            style={styles.imgPickContainer}
            imageStyle={{borderRadius: 100, width: "100%", height: "100%"}}
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
            placeholder="Organisatie"
            placeholderTextColor="#FFFFFF"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.organisation}
            leftIcon={{ type: "font-awesome", name: "building", color: "#FFFFFF" }}
            maxLength={50}
            onChangeText={organisation => this.setState({ organisation })}
            onSubmitEditing={() => console.log(this.state.organisation)}
            shake={true}
          />
          <Text style={styles.errorStyle}>{this.state.organisationError}</Text>
          <Input
            placeholder="Functie"
            placeholderTextColor="#FFFFFF"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.jobFunction}
            leftIcon={{ type: "font-awesome", name: "id-card", color: "#FFFFFF" }}
            maxLength={50}
            onChangeText={jobFunction => this.setState({ jobFunction })}
            onSubmitEditing={() => console.log(this.state.jobFunction)}
          />
          <Text style={styles.errorStyle}>{this.state.jobFunctionError}</Text>
          <Input
            placeholder="Bio"
            placeholderTextColor="#FFFFFF"
            containerStyle={[styles.containerStyle]}
            inputContainerStyle={[styles.inputContainerStyle]}
            inputStyle={{color: "#FFFFFF", height: null}}
            value={this.state.bio}
            leftIcon={{ type: "material-community", name: "text-subject", color: "#FFFFFF"}}
            leftIconContainerStyle={{alignSelf: "flex-start"}}
            multiline = {true}
            numberOfLines = {5}
            maxLength={2000}
            textAlignVertical={"top"}
            onChangeText={bio => this.setState({ bio })}
          />
          <Text style={styles.errorStyle}>{this.state.bioError}</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableHighlight
            underlayColor="#c1efff"
            style={styles.buttonStyle}
            onPress={() => this.editOptionalInfo()}
          >
            <Text style={styles.registerText}>Verder</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },

  infoTextTitle: {
    color: "#00A6FF",
    alignSelf: "flex-start",
    fontSize: 25,
    marginBottom: "5%"
  },

  infoText: {
    marginTop: "5%",
    color: "#FFFFFF",
    alignSelf: "flex-start",
    fontSize: 16
  },

  inputFieldContainer: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "40%",
    marginTop: "5%"
  },

  imgPickContainer: {
    height: '95%',
    width: '24%',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: "5%",
    backgroundColor: "#FFFFFF"
  },

  imgPickBtn: {
    height: "95%",
    width: "55%",
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center'
  },

  containerStyle: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "transparent",
    marginBottom: "3%"
  },

  inputContainerStyle: {
    borderBottomColor: "#FFFFFF"
  },

  inputStyle: {
    color: "#FFFFFF"
  },

  errorStyle: {
    color: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: "12%",
    marginTop: "2%",
    marginBottom: "2%",
    fontSize: 13
  },

  actionContainer: {
    flex: 2,
    flexDirection: "column",
    paddingTop: "10%"
  },

  buttonStyle: {
    alignSelf: 'center',
    width: "75%",
    height: "40%",
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginBottom: '3%',
    marginTop: '10%',
    paddingTop: '1.5%',
    paddingBottom: '1.5%'
  },

  registerText: {
    color: "#01A6FF",
    alignSelf: "center",
    fontSize: 20
  },

});
