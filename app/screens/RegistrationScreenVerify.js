import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, ImageBackground, Platform } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Icon } from "react-native-elements";
import Router from "../helpers/Router";
import UserApi from "../helpers/UserApi";
import User from "../helpers/User";
import firebaseApi from "../helpers/FirebaseApi";

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
      if(Platform.OS == "android") {
        this.setState({
          android: true
        });
        firebaseApi.verifyPhoneNumber(
          this.props.navigation.state.params.phoneNumber).then(
          result => {
                firebaseApi.deleteUser(firebaseApi.getCurrentUser());
                firebaseApi
                    .registerAccount(
                        this.state.registerPhoneInfo.registerInfo.email,
                        this.state.registerPhoneInfo.registerInfo.pw
                    )
                    .then(user => {
                        this.register(user.user);
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            });
          }
    }

    checkCode() {
        firebaseApi
            .verifyPhoneNumber(this.state.code, this.state.registerPhoneInfo.confirmResult)
            .then(result => {
                firebaseApi.deleteUser(result);
                firebaseApi
                    .registerAccount(
                        this.state.registerPhoneInfo.registerInfo.email,
                        this.state.registerPhoneInfo.registerInfo.hashedPw
                    )
                    .then(user => {
                        this.register(user.user);
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            });
    }

    register(firebaseUser) {
        UserApi.registerUser(
            this.state.registerPhoneInfo.registerInfo.firstName,
            this.state.registerPhoneInfo.registerInfo.lastName,
            this.state.registerPhoneInfo.registerInfo.email,
            this.state.registerPhoneInfo.registerInfo.pw,
            this.state.registerPhoneInfo.phoneNumber
        ).then(result => {
            if (!result["bool"]) {
                firebaseApi.deleteUser(firebaseUser);
            } else {
                userId = result["id"];
                User.storeUserId(result["id"]);
                Router.goTo(this.props.navigation, "LoginStack", "LoginScreen"); //route to succesfeedback screen
                
            }
        });
    }

    render() {
        return (
            <ImageBackground 
              style={styles.container}
              source={require('../assets/images/bluewavebg.png')}
              resizeMode='stretch'
              >
              {!this.state.android && (
                <View>
                  <Icon
                    name="chevron-left"
                    type="font-awesome"
                    size={20}
                    color="#00A6FF"
                    underlayColor="#c1efff"
                    containerStyle={{width: '10%'}}
                    onPress={() => Router.goBack(this.props.navigation)}
                  />
                  <View style={styles.infoField}>
                      <Text style={styles.infoTextTitle}>
                          Verificatie
                      </Text>
                      <Text style={styles.infoText}>
                          We hebben je een code gestuurd via SMS!
                      </Text>
                  </View>
                  <View style={styles.inputFieldContainer}>
                      <Input
                          placeholder="verificatiecode"
                          placeholderTextColor="#FFFFFF"
                          containerStyle={styles.inputContainer}
                          inputContainerStyle={styles.inputContainerStyle}
                          inputStyle={styles.inputStyle}
                          value={this.state.code}
                          leftIcon={{ type: "font-awesome", name: "lock", color: '#FFFFFF'}}
                          errorStyle={styles.errorStyle}
                          errorMessage={this.state.phoneNumberError}
                          onChangeText={code =>
                              this.setState({ code })
                          }
                          onSubmitEditing={() => this.checkCode()}
                          keyboardType="numeric"
                          maxLength={6}
                      />
                  </View>
                  <View style={styles.actionContainer}>
                      <TouchableHighlight
                        underlayColor="#c1efff"
                        style={styles.buttonStyle}
                        onPress={() => this.verifyPhone()}
                    >
                        <Text style={styles.goOnText}>Verder</Text>
                    </TouchableHighlight>
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
                          al account? Klik om in te loggen!
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
            )}
          </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "100%"
    },

    containerStyle: {
      flex: 1,
      marginTop: "50%"
    },

    infoField: {
      flex: 2,
      width: "75%",
      alignSelf: "center",
    },

    infoTextTitle: {
      color: "#00A6FF",
      alignSelf: "flex-start",
      fontSize: 25,
    },

    infoText: {
      color: "#FFFFFF",
      alignSelf: "flex-start",
      fontSize: 16,
      marginTop: "20%"
    },

    inputFieldContainer: {
      marginTop: "10%",
      flex: 2,
      flexDirection: "column"
    },

    inputContainer: {
      width: "75%",
      alignSelf: "center"
    },

    inputContainerStyle: {
      borderBottomColor: '#FFFFFF'
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
      flex: 2,
    },

    buttonStyle: {
      alignSelf: 'center',
      width: "75%",
      height: "20%",
      backgroundColor: '#FFFFFF',
      borderRadius: 25,
      marginBottom: '3%',
      marginTop: "23%",
      paddingTop: '2%',
      paddingBottom: '2%'
    },

    goOnText: {
      color: '#01A6FF',
      alignSelf: 'center',
      fontSize: 20
    },

    textContainer: {
      width: "100%",
      alignSelf: "center"
    },

    goToLoginText: {
      alignSelf: 'center',
      fontSize: 16,
      color: '#FFFFFF'
    },
});
