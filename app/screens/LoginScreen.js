import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Easing
} from "react-native";
import { Input, Button } from "react-native-elements";
import Api from "../helpers/Api";
import { NavigationActions } from "react-navigation";
import logo from "../assets/images/logo.png";
import firebaseApi from "../helpers/FirebaseApi";
import Router from "../helpers/Router";
import user from "../helpers/user";

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailError: "",

      pw: "",
      pwError: ""
    };
    this.spinValue = new Animated.Value(0);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Inloggen"
  });

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 99000,
      easing: Easing.linear
    }).start(() => this.spin());
  }

  login() {
    // if (this.state.email == "" || this.state.password == "") {
    //     alert("Vul alstublieft alle velden in!");
    // } else if (/\S+@\S+\.\S+/.test(this.state.email) == false) {
    //     alert("Het ingevoerde email adres is geen valide email!");
    // } else {
    //     // let api = Api.getInstance();
    //     // let userData = {
    //     //     email: this.state.email,
    //     //     password: this.state.password
    //     // };
    //     // api.callApiPost("login", "POST", userData, response => {});
    //     //firebaseApi.sendSms("+31611735849");
    // }
    if (this.checkInputEmpty() && this.checkPw()) {
      console.log("login in");
      // let userData = {
      //     email: this.state.email,
      //     password: this.state.password
      // };
      // Api.callApiPost("login", "POST", userData, response => {});
      //firebaseApi.sendSms("+31611735849");
    }
  }

  checkInputEmpty() {
    msg = "Vul alstublieft het veld in";
    returnBool = true;
    if (this.state.email == "") {
      this.setState({ emailError: msg });
      returnBool = false;
    }
    if (this.state.pw == "") {
      this.setState({ pwError: msg });
      returnBool = false;
    }
    return returnBool;
  }

  checkPw() {
    msg = "Het wachtwoord moet minimaal 6 karakters lang zijn";
    returnBool = true;
    if (this.state.pw.length < 6) {
      this.setState({ pwError: msg });
      returnBool = false;
    }
    return returnBool;
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          resizeMode="contain"
          style={({ transform: [{ rotate: spin }] }, styles.logo)}
          source={logo}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder="E-mail"
            containerStyle={styles.containerStyle}
            value={this.state.email}
            leftIcon={{ type: "font-awesome", name: "user" }}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            onSubmitEditing={() => console.log("end")}
          />
          <Text style={styles.errorStyle}>{this.state.emailError}</Text>
          <Input
            placeholder="Wachtwoord"
            containerStyle={styles.containerStyle}
            value={this.state.pw}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={pw => this.setState({ pw })}
            onSubmitEditing={() => console.log("end")}
            secureTextEntry={true}
          />
          <Text style={styles.errorStyle}>{this.state.pwError}</Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            title="Log in"
            buttonStyle={styles.buttonText}
            containerStyle={styles.buttonContainer}
            onPress={() => this.login()}
          />
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "Register",
                "RegisterStart",
                null
              )
            }
          >
            <Text style={{ color: "#37474f" }}>
              Nog geen account? Meld je aan!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "50%",
    height: "50%",
    alignSelf: "center"
  },
  inputContainer: {
    flex: 3,
    marginTop: "20%"
  },
  containerStyle: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF"
  },
  buttonContainer: {
    width: "75%",
    alignSelf: "center"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  actionContainer: {
    flex: 1
  }
});
export default LoginScreen;
