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

export default class ForgotPasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailError: "",
      loading: false
    };
  }

  requestNewPassword() {
    if (this.checkEmail()) {
      UserApi.requestNewPassword(this.state.email);
      Router.goTo(this.props.navigation, "LoginStack", "ChangePassword", {
        email: this.state.email
      });
    }
  }

  checkEmail() {
    let msg = "Het ingevoerde e-mail adres is geen valide email";
    let returnBool = true;
    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      this.setState({ emailError: msg });
      returnBool = false;
    }
    return returnBool;
  }

  render() {
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
            <Text style={styles.infoTextTitle}>Wachtwoord vergeten</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: "25%",
            marginLeft: "10%",
            flexDirection: "column"
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>
            Vul uw e-mailadres zodat u uw huidige wachtwoord kan veranderen.
          </Text>
        </View>
        <View
          style={{
            marginTop: "40%",
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Input
            placeholder="E-mailadres"
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
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            onSubmitEditing={() => console.log("end")}
          />
          <Text style={styles.errorStyle}>{this.state.emailError}</Text>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.requestNewPassword()}
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
    marginTop: "30%",
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
