import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ImageBackground } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Icon } from "react-native-elements";
import Router from "../helpers/Router";

import firebaseApi from "../helpers/FirebaseApi";

export default class RegistrationScreenPhone extends Component {
    constructor() {
        super();
        this.state = {
            registerInfo: {},
            phoneNumber: "+31612345678",
            phoneNumberError: "",
            confirmResult: null
        };
    }

    componentDidMount() {
        this.setState({ registerInfo: this.props.navigation.state.params });
    }

    verifyPhone() {
        if (
            this.checkInputEmpty() &&
            this.checkInputType() &&
            this.checkInputLength() &&
            this.checkValidNumber()
        ) {
            firebaseApi.sendSms(this.state.phoneNumber).then(result => {
                this.setState({ confirmResult: result });
                Router.goTo(
                    this.props.navigation,
                    "LoginStack",
                    "RegisterVerify",
                    this.state
                );
            });
        }
    }

    checkInputEmpty() {
        msg = "Vul alstublieft het veld in";
        returnBool = true;
        if (this.state.phoneNumber == "") {
            this.setState({ phoneNumberError: msg });
            returnBool = false;
        }
        return returnBool;
    }

    checkInputType() {
        msg = "Vul alstublieft alleen nummers in";
        returnBool = true
        if (
            !/^\d+$/.test(
                this.state.phoneNumber.slice(1, this.state.phoneNumber.length)
            )
        ) {
            this.setState({ phoneNumberError: msg });
            returnBool = false;
        }
        return returnBool;
    }

    checkInputLength() {
        msg = "Vul alstublieft een volledig telefoonnummer in";
        returnBool = true
        if (this.state.phoneNumber.length < 10) {
            this.setState({ phoneNumberError: msg });
            returnBool = false;
        }
        return returnBool;
    }

    checkValidNumber() {
        msg = "Begin alstublieft je telefoonnummer met +31"
        if (this.state.phoneNumber.substring(0,3) != "+31") {
            this.setState({ phoneNumberError: msg });
            returnBool = false;
        }
        return returnBool;
    }

    render() {
        return (
            <ImageBackground 
              style={styles.container}
              source={require('../assets/images/bluewavebg.png')}
              resizeMode='stretch'
              >
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
                        placeholder="Mobiel nummer"
                        placeholderTextColor="#FFFFFF"
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        value={this.state.phoneNumber}
                        leftIcon={{ type: "font-awesome", name: "mobile-phone", color: '#FFFFFF'}}
                        errorStyle={styles.errorStyle}
                        errorMessage={this.state.phoneNumberError}
                        onChangeText={phoneNumber =>
                            this.setState({ phoneNumber })
                        }
                        onSubmitEditing={() => this.verifyPhone()}
                        keyboardType="phone-pad"
                        maxLength={12}
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
                        "LoginStack",
                        "LoginScreen",
                        {}
                      )
                    }
                  >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Al een account? </Text>
                    <Text
                      style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                    >
                      Klik hier om in te loggen!
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

    inputFieldContainer: {
        marginTop: "40%",
        flex: 2,
        flexDirection: "column"
    },
    actionContainer: {
        flex: 2,
    },

    infoTextTitle: {
      color: "#00A6FF",
      alignSelf: "flex-start",
      fontSize: 25,
      marginBottom: "10%"
    },

    infoText: {
      color: "#FFFFFF",
      alignSelf: "flex-start",
      fontSize: 16,
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

    errorStyle: {
        color: "#FFFFFF",
        alignSelf: "flex-start",
        marginTop: "2%",
        marginBottom: "2%",
        fontSize: 13
    },

    goOnText: {
        color: '#01A6FF',
        alignSelf: 'center',
        fontSize: 20
    },

    textContainer: {
      width: "100%",
      justifyContent: "center",
      alignSelf: "center",
      flexDirection: "row",
    },

    goToLoginText: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#FFFFFF'
    },
});
