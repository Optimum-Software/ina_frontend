import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Platform,
  ImageBackground,
  SafeAreaView
} from "react-native";
import { Fragment } from "react";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button, Icon } from "react-native-elements";
import Router from "../helpers/Router";
import UserApi from "../helpers/UserApi";
import sha256 from "crypto-js/sha256";

var SHA256 = require("crypto-js/sha256");

export default class RegistrationScreenStart extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      firstNameError: "",

      lastName: "",
      lastNameError: "",

      email: "",
      emailError: "",

      pw: "",
      pwError: "",

      pwRepeat: "",
      pwRepeatError: "",

      loading: false
    };
  }

  goToRegisterPhone() {
    let emailExists = UserApi.checkEmail(this.state.email).then(result => {
      this.resetErrors();
      if (result["ntwFail"]) {
        //network error
        alert(result["msg"]);
      } else {
        if (result["bool"]) {
          this.setState({
            emailError: "Het ingevulde e-mail adres bestaat al"
          });
        }
        let pwSame = this.checkPwSame();
        let pwLength = this.checkPwLength();
        let email = this.checkEmail();
        let empty = this.checkInputEmpty();
        if (empty && email && pwSame && pwLength && !result["bool"]) {
          this.setState({
            hashedPw: SHA256(this.state.pw).toString()
          });
          Router.goTo(
            this.props.navigation,
            "LoginStack",
            "RegisterPhone",
            this.state
          );
        }
      }
    });
  }

  resetErrors() {
    this.setState({
      emailError: "",
      firstNameError: "",
      lastNameError: "",
      pwError: "",
      pwRepeatError: "",
      emailExists: false
    });
  }

  checkInputEmpty() {
    msg = "Vul alstublieft het veld in";
    returnBool = true;
    if (this.state.firstName == "") {
      this.setState({ firstNameError: msg });
      returnBool = false;
    }
    if (this.state.lastName == "") {
      this.setState({ lastNameError: msg });
      returnBool = false;
    }
    return returnBool;
  }

  checkEmail() {
    msg = "Het ingevoerde e-mail adres is geen valide email";
    returnBool = true;
    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      this.setState({ emailError: msg });
      returnBool = false;
    }
    return returnBool;
  }
  checkPwSame() {
    msg =
      "Het herhaalde wachtwoord moet hetzelfde zijn als het eerste wachtwoord";
    returnBool = true;
    if (this.state.pwRepeat != this.state.pw) {
      this.setState({ pwRepeatError: msg });
      returnBool = false;
    }
    return returnBool;
  }

  checkPwLength() {
    msg = "Het wachtwoord moet minimaal 6 karakters lang zijn";
    returnBool = true;
    if (this.state.pw.length < 6) {
      this.setState({ pwError: msg });
      returnBool = false;
    }
    if (this.state.pwRepeat.length < 6) {
      this.setState({ pwRepeatError: msg });
      returnBool = false;
    }
    return returnBool;
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
              <Input
                placeholder="Voornaam"
                placeholderTextColor="#FFFFFF"
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                value={this.state.firstName}
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#FFFFFF"
                }}
                maxLength={30}
                onChangeText={firstName => this.setState({ firstName })}
                onSubmitEditing={() => console.log(this.state.firstName)}
                shake={true}
              />
              <Text style={styles.errorStyle}>{this.state.firstNameError}</Text>
              <Input
                placeholder="Achternaam"
                placeholderTextColor="#FFFFFF"
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                value={this.state.lastName}
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#FFFFFF"
                }}
                maxLength={30}
                onChangeText={lastName => this.setState({ lastName })}
                onSubmitEditing={() => console.log("end")}
              />
              <Text style={styles.errorStyle}>{this.state.lastNameError}</Text>
              <Input
                placeholder="E-mail"
                placeholderTextColor="#FFFFFF"
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                value={this.state.email}
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: "#FFFFFF"
                }}
                maxLength={50}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => console.log("end")}
              />
              <Text style={styles.errorStyle}>{this.state.emailError}</Text>
              <Input
                placeholder="Wachtwoord"
                placeholderTextColor="#FFFFFF"
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                value={this.state.pw}
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#FFFFFF"
                }}
                onChangeText={pw => this.setState({ pw })}
                onSubmitEditing={() => console.log("end")}
                secureTextEntry={true}
              />
              <Text style={styles.errorStyle}>{this.state.pwError}</Text>
              <Input
                placeholder="Herhaal Wachtwoord"
                placeholderTextColor="#FFFFFF"
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                value={this.state.pwRepeat}
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#FFFFFF"
                }}
                onChangeText={pwRepeat => this.setState({ pwRepeat })}
                onSubmitEditing={() => console.log("end")}
                secureTextEntry={true}
              />
              <Text style={styles.errorStyle}>{this.state.pwRepeatError}</Text>
              <View
                style={{
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 25
                  }}
                  onPress={() => this.goToRegisterPhone()}
                >
                  <Text
                    style={{
                      padding: "4%",
                      fontSize: 16,
                      color: "#00a6ff",
                      textAlign: "center"
                    }}
                  >
                    Registreren
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.textContainer}
                onPress={() =>
                  Router.goTo(
                    this.props.navigation,
                    "LoginStack",
                    "LoginScreen",
                    {}
                  )
                }
              >
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  Al een account?
                </Text>
                <Text
                  style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
                >
                  Klik hier om in te loggen!
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textStyle: {
    padding: 15,
    fontSize: 16,
    color: "#00a6ff",
    textAlign: "center"
  },

  buttonStyle: {
    marginRight: "10%",
    marginLeft: "10%",
    backgroundColor: "#ffffff",
    borderRadius: 25
  },
  infoTextTitle: {
    color: "#00A6FF",
    alignSelf: "flex-start",
    fontSize: 20,
    marginBottom: "5%"
  },

  infoText: {
    width: "80%",
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: "10%",
    marginBottom: "5%"
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

  inputFieldContainer: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "40%"
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
    flex: 1,
    flexDirection: "column",
    marginBottom: "5%"
  },

  buttonStyle: {
    alignSelf: "center",
    width: "75%",
    height: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginBottom: "3%",
    marginTop: "10%"
  },

  textStyle: {
    fontSize: 16,
    color: "#01A6FF",
    textAlign: "center"
  },

  registerText: {
    color: "#01A6FF",
    alignSelf: "center",
    fontSize: 20
  },

  textContainer: {
    padding: 5,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row"
  },

  goToLoginText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#FFFFFF"
  }
});
