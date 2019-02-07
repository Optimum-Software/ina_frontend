"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import Router from "../helpers/Router";
import UserApi from "../helpers/UserApi";
var SHA256 = require("crypto-js/sha256");

export default class ChangePasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      codeError: "",

      pw: "",
      pwError: "",

      pwRepeat: "",
      pwRepeatError: "",
      loading: false
    };
  }

  changePassword(email) {
    let pwSame = this.checkPwSame();
    let pwLength = this.checkPwLength();
    console.log(email);

    if (pwSame && pwLength) {
      let hashedPw = SHA256(this.state.pw).toString();
      UserApi.changePassword(this.state.code, hashedPw, email).then(result => {
        console.log(result);
        this.resetErrors();
        if (result["bool"]) {
          alert(result["msg"]);
          Router.goTo(this.props.navigation, "LoginStack", "LoginScreen", null);
        } else {
          alert(result["msg"]);
        }
      });
    }
  }
  resetErrors() {
    this.setState({
      pwError: "",
      pwRepeatError: ""
    });
  }

  checkPwSame() {
    let msg =
      "Het herhaalde wachtwoord moet hetzelfde zijn als het eerste wachtwoord";
    let returnBool = true;
    if (this.state.pwRepeat != this.state.pw) {
      this.setState({ pwRepeatError: msg });
      returnBool = false;
    }
    return returnBool;
  }

  checkPwLength() {
    let msg = "Het wachtwoord moet minimaal 6 karakters lang zijn";
    let returnBool = true;
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
    const email = this.props.navigation.getParam("email");

    return (
      <ImageBackground
        source={require("../assets/images/bluewavebg.png")}
        style={{ height: "100%", width: "100%" }}
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
            <Text style={styles.infoTextTitle}>Wachtwoord veranderen</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: "20%",
            marginLeft: "10%",
            flexDirection: "column"
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>
            Vul de code in via de email heeft gekregen, en vervolgens uw nieuwe
            gewenste wachtwoord.
          </Text>
        </View>
        <View
          style={{
            marginTop: "30%",
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Input
            placeholder="Verificatiecode"
            placeholderTextColor="#FFFFFF"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.email}
            leftIcon={{
              type: "material-community",
              name: "email-check",
              color: "#FFFFFF"
            }}
            autoCapitalize="none"
            onChangeText={code => this.setState({ code })}
            onSubmitEditing={() => console.log("end")}
          />
          <Text style={styles.errorStyle}>{this.state.codeError}</Text>

          <Input
            placeholder="Wachtwoord"
            placeholderTextColor="#FFFFFF"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.pw}
            leftIcon={{ type: "font-awesome", name: "lock", color: "#FFFFFF" }}
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
            leftIcon={{ type: "font-awesome", name: "lock", color: "#FFFFFF" }}
            onChangeText={pwRepeat => this.setState({ pwRepeat })}
            onSubmitEditing={() => console.log("end")}
            secureTextEntry={true}
          />
          <Text style={styles.errorStyle}>{this.state.pwRepeatError}</Text>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.changePassword(email)}
          >
            <Text style={styles.textStyle}>Verder</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  errorStyle: {
    color: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: "12%",
    marginTop: "2%",
    marginBottom: "2%",
    fontSize: 13
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
  buttonStyle: {
    padding: "3%",
    marginTop: "10%",
    backgroundColor: "#fff",
    borderRadius: 25,
    width: "60%",
    alignSelf: "center",
    marginBottom: "2%"
  },
  textStyle: {
    fontSize: 16,
    color: "#01A6FF",
    textAlign: "center"
  },
  infoTextTitle: {
    color: "#00A6FF",
    alignSelf: "flex-start",
    fontSize: 22,
    marginBottom: "10%"
  }
});
