import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Easing,
  Button,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { Input } from "react-native-elements";
import Api from "../helpers/Api";
import { NavigationActions, Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import logo from "../assets/images/logo_circle.png";
import wave from "../assets/thewave.png";
import FirebaseApi from "../helpers/FirebaseApi";
import Router from "../helpers/Router";
import User from "../helpers/User";
import UserApi from "../helpers/UserApi";
import OneSignal from "react-native-onesignal";
import sha256 from "crypto-js/sha256";
var SHA256 = require("crypto-js/sha256");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "j.j.haarman@st.hanze.nl",
      emailError: "",

      pw: "123456",
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

  resetErrors() {
    this.setState({
      emailError: "",
      pwError: ""
    })
  }

  login() {
    this.resetErrors()
    if (this.checkInputEmpty() && this.checkEmail()) {
      let hashedPw = SHA256(this.state.pw).toString();
      Api.login(this.state.email, hashedPw).then(result => {
        console.log(result)
        if (result.bool) {
          FirebaseApi.login(this.state.email, hashedPw)
          User.getDeviceId().then(deviceId => {
            UserApi.createDeviceId(result.userId, deviceId).then(result => {
              console.log(result);
            });
          });
          User.storeUserId(result.userId);
          User.storeToken(result.token);
        } else {
          this.setState({ pwError: result.msg });
        }
      });
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
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: Header.HEIGHT }}>
            <Toolbar
              centerElement="Inloggen"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              style={{container: {"backgroundColor": "#009EF2"}}}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>
          <View style={styles.top}>
            <Image
              resizeMode="contain"
              style={({ transform: [{ rotate: spin }] }, styles.logo)}
              source={logo}
            />
            <Text style={styles.welcomeText}>Welkom bij INA!</Text>
          </View>
          <ImageBackground
            source={require("../assets/images/bluewavebg.png")}
            style={{ width: "100%", flex: 2 }}
            resizeMode="stretch"
          >
            <View style={styles.bottom}>
              <Text style={styles.loginTitle}>Login</Text>
              <Input
                placeholder="E-mail"
                placeholderTextColor="#ffffff"
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.containerStyle}
                inputStyle={{ color: "#ffffff", fontSize: 16 }}
                labelStyle={{ color: "#ffffff" }}
                value={this.state.email}
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  color: "#ffffff"
                }}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => console.log("end")}
              />
              <Text style={styles.errorStyle}>{this.state.emailError}</Text>
              <Input
                placeholder="Wachtwoord"
                placeholderTextColor="#ffffff"
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.containerStyle}
                inputStyle={{ color: "#ffffff", fontSize: 16 }}
                labelStyle={{ color: "#ffffff" }}
                shake={true}
                value={this.state.pw}
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#ffffff"
                }}
                onChangeText={pw => this.setState({ pw })}
                onSubmitEditing={() => console.log("end")}
                secureTextEntry={true}
              />
              <Text style={styles.errorStyle}>{this.state.pwError}</Text>
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() =>
                  Router.goTo(
                    this.props.navigation,
                    "LoginStack",
                    "ForgotPassword",
                    null
                  )
                }
              >
                <Text
                  style={{
                    color: "#ffffff",
                    paddingBottom: "10%",
                    paddingTop: "5%"
                  }}
                >
                  Wachtwoord vergeten?
                </Text>
              </TouchableOpacity>
              <View style={{ marginBottom: "25%" }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.login()}
                >
                  <Text style={styles.textStyle}>Inloggen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "LoginStack",
                      "RegisterStart",
                      null
                    )
                  }
                >
                  <Text style={{ color: "#ffffff", padding: 5, fontSize: 14 }}>
                    Nog geen account?
                    <Text> </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#ffffff",
                        fontSize: 14
                      }}
                    >
                      Registreer hier!
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#00a6ff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textStyle: {
    padding: "5%",
    fontSize: 16,
    color: "#00a6ff",
    textAlign: "center"
  },

  buttonStyle: {
    backgroundColor: "#ffffff",
    borderRadius: 25
  },

  top: {
    width: "100%",
    flex: 0.7,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center"
  },
  bottom: {
    width: "100%",
    flex: 2.3,
    backgroundColor: "transparent",
    paddingLeft: "15%",
    paddingRight: "15%",
    paddingTop: "15%"
  },
  logo: {
    width: "50%",
    height: "50%",
    marginTop: "15%",
    alignSelf: "center"
  },
  welcomeText: {
    paddingTop: "10%",
    fontSize: 16,
    color: "#01A6FF"
  },
  loginTitle: {
    marginBottom: "5%",
    marginTop: "5%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff"
  },
  inputContainer: {
    marginTop: "5%",
    marginBottom: "5%"
  },
  containerStyle: {
    width: "110%",
    borderColor: "#ffffff"
  },
  buttonContainer: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "#ffffffff",
    borderRadius: 25
  },

  errorStyle: {
    color: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: "12%",
    marginTop: "2%",
    marginBottom: "2%",
    fontSize: 13
  }
});
export default LoginScreen;
