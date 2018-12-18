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

export default class ChangePasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "test@tester.nl",
      emailError: "",

      pw: "123456",
      pwError: "",

      pwRepeat: "123456",
      pwRepeatError: "",
      loading: false
    };
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
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "LoginStack",
                "LoginScreen",
                null
              )
            }
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
