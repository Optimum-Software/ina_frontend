import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Icon } from "react-native-elements";
import Router from "../helpers/Router";
import UserApi from "../helpers/UserApi";
import User from "../helpers/User";
import firebaseApi from "../helpers/FirebaseApi";
import firebase from "react-native-firebase";
import { Fragment } from "react";
import WhiteButton from "../components/WhiteButton";

export default class RegistrationScreenStart extends Component {
  constructor() {
    super();
    this.state = {
      registerPhoneInfo: {},
      code: "",
      codeError: "",
      android: null
    };
  }

  componentDidMount() {
    this.setState({
      registerPhoneInfo: this.props.navigation.state.params
    });
    if (Platform.OS == "android") {
      this.setState({
        android: true
      });
    }
    firebaseApi
      .verifyPhoneNumber(this.props.navigation.state.params.phoneNumber)
      .on(
        "state_changed",
        phoneAuthSnapshot => {
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              this.setState({
                verifyId: phoneAuthSnapshot.verificationId
              });
              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              alert("Er ging iets mis, probeer het nog een keer");
              Router.goBack(this.props.navigation);
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              const { verificationId, code } = phoneAuthSnapshot;
              this.setState({
                android: false,
                verificationId: verificationId,
                code: code
              });
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              this.register();
              break;
          }
        },
        error => {
          console.log(error);
          console.log(error.verificationId);
        },
        phoneAuthSnapshot => {
          console.log(phoneAuthSnapshot);
        }
      );
  }

  checkCode() {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      this.state.verifyId,
      this.state.code
    );
    firebaseApi
      .loginPhone(credential)
      .then(result => this.register(result.user));
  }

  register() {
    emailAccount = firebaseApi.registerAccount(
      this.state.registerPhoneInfo.registerInfo.email,
      this.state.registerPhoneInfo.registerInfo.hashedPw
    );
    UserApi.registerUser(
      this.state.registerPhoneInfo.registerInfo.firstName,
      this.state.registerPhoneInfo.registerInfo.lastName,
      this.state.registerPhoneInfo.registerInfo.email,
      this.state.registerPhoneInfo.registerInfo.hashedPw,
      this.state.registerPhoneInfo.phoneNumber
    ).then(result => {
      if (!result["bool"]) {
        firebaseApi.deleteUser(emailAccount);
      } else {
        userId = result["id"];
        //User.storeUserId(result["id"]);
        Router.goTo(
          this.props.navigation,
          "LoginStack",
          "RegisterVerifySuccessfull"
        ); //route to succesfeedback screen
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
              justifyContent: "flex-start"
            }}
            source={require("../assets/images/bluewavebg.png")}
            resizeMode="stretch"
          >
            <Toolbar
              leftElement="arrow-back"
              onLeftElementPress={() => this.props.navigation.goBack()}
              centerElement="Verificatie"
              style={{
                container: { backgroundColor: "transparent" },
                titleText: { color: "#00a6ff" },
                leftElement: { color: "#00a6ff" }
              }}
            />
            {this.state.android && (
              <View
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%"
                }}
              >
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
            {!this.state.android && (
              <View style={{ padding: "10%" }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 2,
                      width: "90%",
                      marginTop: "5%"
                    }}
                  >
                    <Text style={styles.infoText}>
                      Vul alle velden in om je een account aan te maken.
                    </Text>
                  </View>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Input
                    placeholder="verificatiecode"
                    placeholderTextColor="#FFFFFF"
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    value={this.state.code}
                    leftIcon={{
                      type: "font-awesome",
                      name: "lock",
                      color: "#FFFFFF"
                    }}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.state.phoneNumberError}
                    onChangeText={code => this.setState({ code })}
                    onSubmitEditing={() => this.checkCode()}
                    keyboardType="numeric"
                    maxLength={6}
                  />
                </View>
                <WhiteButton
            label='Verder'
            onPress={() => this.checkCode()}
          />

              </View>
            )}
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
  textStyle: {
    padding: "4%",
    fontSize: 16,
    color: "#00a6ff",
    textAlign: "center"
  },

  infoTextTitle: {
    color: "#00A6FF",
    alignSelf: "flex-start",
    fontSize: 25,
    marginBottom: "5%",
    marginLeft: "5%"
  },

  containerStyle: {
    flex: 1,
    marginTop: "50%"
  },

  infoField: {
    flex: 2,
    width: "75%",
    alignSelf: "center"
  },

  infoTextTitle: {
    color: "#00A6FF",
    alignSelf: "flex-start",
    fontSize: 25
  },

  infoText: {
    color: "#FFFFFF",
    alignSelf: "flex-start",
    fontSize: 16,
    marginTop: "20%"
  },

  inputFieldContainer: {
    marginTop: "10%",
    marginBottom: "10%",
    flexDirection: "column"
  },

  inputContainer: {
    width: "100%",
    alignSelf: "center"
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
    marginTop: "2%",
    marginBottom: "2%",
    fontSize: 13
  },

  actionContainer: {
    flex: 1
  },

  textContainer: {
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row"
  },

  buttonStyle: {
    backgroundColor: "#ffffff",
    borderRadius: 25
  },

  goOnText: {
    color: "#01A6FF",
    alignSelf: "center",
    fontSize: 20
  },

  textContainer: {
    width: "100%",
    alignSelf: "center"
  },

  goToLoginText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#FFFFFF"
  }
});
