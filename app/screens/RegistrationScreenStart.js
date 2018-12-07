import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button } from "react-native-elements";
import Router from "../helpers/Router";
import UserApi from "../helpers/UserApi";

export default class RegistrationScreenStart extends Component {
    constructor() {
        super();
        this.state = {
            firstName: 'ferry',
            firstNameError: '',

            lastName: 'doppel',
            lastNameError: '',

            email: 'ferry.doppel@xs4all.nl',
            emailError: '',

            pw: '123456',
            pwError: '',

            pwRepeat: '123456',
            pwRepeatError: '',

            loading: false
        }
    }

    goToRegisterPhone() {
      let emailExists = UserApi.checkEmail(this.state.email).then(result => {
        this.resetErrors()
        if(result['ntwFail']) {
          //network error
          alert(result['msg'])
        } else {
          if(result['bool']) {this.setState({emailError: "Het ingevulde e-mail adres bestaat al"})}
          let pwSame = this.checkPwSame()
          let pwLength = this.checkPwLength()
          let email = this.checkEmail()
          let empty = this.checkInputEmpty()
          if(empty && email && pwSame && pwLength && !result['bool']) {
            Router.goTo(this.props.navigation, 'Register', 'RegisterPhone', this.state)
          }
        }     
      })
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

  checkEmailExists() {
    msg = "Het ingevoerde e-mail adres";
    return UserApi.checkEmail(this.state.email);
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
      <View style={styles.container}>
        <View style={{ height: Header.HEIGHT }}>
          <Toolbar
            leftElement={"chevron-left"}
            onLeftElementPress={() => Router.goBack(this.props.navigation)}
            centerElement="Registreren"
          />
        </View>
        <View style={styles.inputFieldContainer}>
          <Input
            ref="f"
            placeholder="Voornaam"
            containerStyle={styles.containerStyle}
            value={this.state.firstName}
            leftIcon={{ type: "font-awesome", name: "user" }}
            onChangeText={firstName => this.setState({ firstName })}
            onSubmitEditing={() => console.log(this.state.firstName)}
            shake={true}
          />
          <Text style={styles.errorStyle}>{this.state.firstNameError}</Text>
          <Input
            placeholder="Achternaam"
            containerStyle={styles.containerStyle}
            value={this.state.lastName}
            leftIcon={{ type: "font-awesome", name: "user" }}
            onChangeText={lastName => this.setState({ lastName })}
            onSubmitEditing={() => console.log("end")}
          />
          <Text style={styles.errorStyle}>{this.state.lastNameError}</Text>
          <Input
            placeholder="E-mail"
            containerStyle={styles.containerStyle}
            value={this.state.email}
            leftIcon={{ type: "font-awesome", name: "envelope" }}
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
          <Input
            placeholder="Herhaal Wachtwoord"
            containerStyle={styles.containerStyle}
            value={this.state.pwRepeat}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={pwRepeat => this.setState({ pwRepeat })}
            onSubmitEditing={() => console.log("end")}
            secureTextEntry={true}
          />
          <Text style={styles.errorStyle}>{this.state.pwRepeatError}</Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            title="Registreer"
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainer}
            onPress={() => this.goToRegisterPhone()}
          />
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "LoginScreen",
                "LoginScreen",
                {}
              )
            }
          >
            <Text style={styles.goToLoginText}>
              al account? Log dan hier in.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  containerStyle: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF"
  },
  inputFieldContainer: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "10%"
  },

  errorStyle: {
    color: "red",
    alignSelf: "center",
    marginTop: "2%",
    marginBottom: "2%"
  },

  actionContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: "10%",
    justifyContent: "space-between"
  },

  buttonContainer: {
    width: "75%",
    alignSelf: "center",
    height: "60%"
  },
  buttonStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 5
  },

  textContainer: {
    width: "75%",
    alignSelf: "center"
  },
  goToLoginText: {
    fontSize: 20
  }
});
