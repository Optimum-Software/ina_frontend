import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Icon } from "react-native-elements";
import Router from "../helpers/Router";
import User from "../helpers/User";
import UserApi from "../helpers/UserApi";
import ImagePicker from "react-native-image-picker";
import { CachedImage } from "react-native-cached-image";
import WhiteButton from "../components/WhiteButton";

export default class RegistrationScreenOptional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.getParam("userId", null),

      profilePhoto: null,
      pickedImgUri: { uri: "" },
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
    this.resetErrors();
    UserApi.editOptionalInfo(
      this.state.userId,
      this.state.bio,
      this.state.organisation,
      this.state.jobFunction,
      this.state.pickedImgUri.uri
    ).then(res => {
      console.log(res);
      if (res["bool"]) {
        Router.switchLogin(this.props.navigation);
      }
      this.setState({ loading: false });
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

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#00a6ff" }}>
          <StatusBar
            backgroundColor={Platform.OS == "android" ? "white" : "#00a6ff"}
            barStyle="dark-content"
          />
          <ImageBackground
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "center"
            }}
            source={require("../assets/images/bluewavebg.png")}
            resizeMode="stretch"
          >
            <Toolbar
              leftElement="arrow-back"
              onLeftElementPress={() => this.props.navigation.goBack()}
              centerElement="Registreren"
              style={{
                container: { backgroundColor: "transparent" },
                titleText: { color: "#00a6ff" },
                leftElement: { color: "#00a6ff" }
              }}
            />

            <View style={styles.inputFieldContainer}>
              <View style={styles.imgPickContainer}>
                <CachedImage
                  style={styles.imgPicked}
                  source={this.state.pickedImgUri}
                  resizeMode="cover"
                >
                  <TouchableOpacity
                    style={styles.imgPickBtn}
                    onPress={() => this.pickImageHandler()}
                  >
                    {this.state.imgPicked == false && (
                      <Icon
                        name="image-plus"
                        type="material-community"
                        style={{ alignSelf: "center" }}
                        size={50}
                        color="#00A6FF"
                        underlayColor="#c1efff"
                      />
                    )}
                  </TouchableOpacity>
                </CachedImage>
              </View>

              <Input
                placeholder="Organisatie"
                placeholderTextColor="#FFFFFF"
                containerStyle={[
                  styles.containerStyle,
                  {
                    marginTop: "10%"
                  }
                ]}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                value={this.state.organisation}
                leftIcon={{
                  type: "font-awesome",
                  name: "building",
                  color: "#FFFFFF"
                }}
                maxLength={50}
                onChangeText={organisation => this.setState({ organisation })}
                onSubmitEditing={() => console.log(this.state.organisation)}
                shake={true}
              />
              <Text style={styles.errorStyle}>
                {this.state.organisationError}
              </Text>
              <Input
                placeholder="Functie"
                placeholderTextColor="#FFFFFF"
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                value={this.state.jobFunction}
                leftIcon={{
                  type: "font-awesome",
                  name: "id-card",
                  color: "#FFFFFF"
                }}
                maxLength={50}
                onChangeText={jobFunction => this.setState({ jobFunction })}
                onSubmitEditing={() => console.log(this.state.jobFunction)}
              />
              <Text style={styles.errorStyle}>
                {this.state.jobFunctionError}
              </Text>
              <Input
                placeholder="Bio"
                placeholderTextColor="#FFFFFF"
                containerStyle={[styles.containerStyle]}
                inputContainerStyle={[styles.inputContainerStyle]}
                inputStyle={{ color: "#FFFFFF" }}
                value={this.state.bio}
                leftIcon={{
                  type: "material-community",
                  name: "text-subject",
                  color: "#FFFFFF"
                }}
                leftIconContainerStyle={{ alignSelf: "flex-start" }}
                multiline={true}
                numberOfLines={6}
                maxLength={2000}
                textAlignVertical={"top"}
                onChangeText={bio => this.setState({ bio })}
              />
              <Text style={styles.errorStyle}>{this.state.bioError}</Text>
            </View>
            <View
              style={{
                width: Dimensions.get("window").width,
                paddingBottom: 25,
                paddingLeft: "15%",
                paddingRight: "15%"
              }}
            >
              <WhiteButton
                label="Verder"
                onPress={() => this.editOptionalInfo()}
              />
            </View>
          </ImageBackground>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40%",
    marginTop: "5%"
  },

  imgPickContainer: {
    height: 104,
    width: 104,
    borderRadius: 52,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  imgPicked: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF"
  },

  imgPickBtn: {
    height: 100,
    width: 100,
    borderRadius: 50,
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
    alignSelf: "center",
    width: "75%",
    height: "40%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginBottom: "3%",
    marginTop: "10%",
    padding: 3
  },

  buttonText: {
    color: "#01A6FF",
    alignSelf: "center",
    fontSize: 20
  }
});
