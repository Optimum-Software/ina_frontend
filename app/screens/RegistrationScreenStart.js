import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ImageBackground
} from "react-native";
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
      firstName: "test",
      firstNameError: "",

      lastName: "mctest",
      lastNameError: "",

      email: "test@tester.nl",
      emailError: "",

      pw: "123456",
      pwError: "",

      pwRepeat: "123456",
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
          this.setState({ hashedPw: SHA256(this.state.pw).toString() });
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
      <ImageBackground
        style={styles.container}
        source={require("../assets/images/bluewavebg.png")}
        resizeMode="stretch"
      >
        <StatusBar backgroundColor="#00A6FF" />
        <View style={{flexDirection: "row"}}>
          <Icon
            name="chevron-left"
            type="font-awesome"
            size={20}
            color="#00A6FF"
            underlayColor="#c1efff"
            containerStyle={{ width: "10%", marginTop: '7%'}}
            onPress={() => Router.goBack(this.props.navigation)}
          />
          <View style={{ flex: 2, width: '90%', marginTop: '5%'}}>
            <Text style={styles.infoTextTitle}>Registreren</Text>
            <Text style={styles.infoText}>
              Vul alle velden in om je een account aan te maken.
            </Text>
          </View>
        </View>
        <View style={styles.inputFieldContainer}>
          <Input
            placeholder="Voornaam"
            placeholderTextColor="#FFFFFF"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.firstName}
            leftIcon={{ type: "font-awesome", name: "user", color: "#FFFFFF" }}
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
            leftIcon={{ type: "font-awesome", name: "user", color: "#FFFFFF" }}
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
        </View>
        <View style={styles.actionContainer}>
          <TouchableHighlight
            underlayColor="#c1efff"
            style={styles.buttonStyle}
            onPress={() => this.goToRegisterPhone()}
          >
            <Text style={styles.registerText}>Registreren</Text>
          </TouchableHighlight>
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
            <Text style={styles.goToLoginText}>
              al account? Klik om in te loggen!
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
        paddingTop: "40%",
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
