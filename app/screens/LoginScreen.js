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
import User from "../helpers/User";

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "bert@bert.nl",
      emailError: "",

      pw: "Welkom123",
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
    if (this.checkInputEmpty() && this.checkEmail()) {
      Api.login(this.state.email, this.state.pw).then(result => {
        console.log(result);
        if (result.bool) {
          User.storeUserId(result.userId);
          User.storeToken(result.token);
          Router.goTo(this.props.navigation, "Register", "RegisterStart", null);
        } else {
          this.setState({ pwError: result.msg });
        }
        console.log("UserID");
        User.getUserId().then(result => {
          console.log(result);
        });
        console.log("Token");
        User.getToken().then(result => {
          console.log(result);
        });
      });
      // let userData = {
      //     email: this.state.email,
      //     password: this.state.password
      // };
      // Api.callApiPost("login", "POST", userData, response => {});
      //firebaseApi.sendSms("+31637612691");
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

  checkEmail() {
    msg = "Het ingevoerde email adres is geen valide email";
    returnBool = true;
    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      this.setState({ emailError: msg });
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
  actionContainer: {
    flex: 1
  }
});
export default LoginScreen;
