import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button } from "react-native-elements";
import Router from "../helpers/Router";
import CodeInput from "react-native-confirmation-code-input";
import UserApi from "../helpers/UserApi";
import firebaseApi from "../helpers/FirebaseApi";

export default class RegistrationScreenStart extends Component {
    constructor() {
        super();
        this.state = {
            registerPhoneInfo: {}
        };
    }

    componentDidMount() {
        this.setState({
            registerPhoneInfo: this.props.navigation.state.params
        });
        console.log(this.props.navigation.state.params.phoneNumber);
        firebaseApi
            .verifyPhoneNumber(this.props.navigation.state.params.phoneNumber)
            .then(result => {
                console.log("Current user phone:");
                firebaseApi.deleteUser(firebaseApi.getCurrentUser());
                console.log(result);
                console.log(this.state.registerPhoneInfo.registerInfo.email);
                console.log(this.state.registerPhoneInfo.registerInfo.pw);
                firebaseApi
                    .registerAccount(
                        this.state.registerPhoneInfo.registerInfo.email,
                        this.state.registerPhoneInfo.registerInfo.pw
                    )
                    .then(user => {
                        console.log("REGISTERED USER STUFF");
                        console.log(user.user);
                        this.register(user.user);
                    })
                    .catch(error => {
                        console.log("OEPS");
                        alert(error.message);
                    });
            });
    }

    checkCode(code) {
        console.log(code);
        console.log(this.state.registerPhoneInfo.confirmResult);
        firebaseApi
            .verifyPhoneNumber(code, this.state.registerPhoneInfo.confirmResult)
            .then(result => {
                console.log("Current user phone:");
                firebaseApi.deleteUser(result);
                console.log(result);
                console.log(this.state.registerPhoneInfo.registerInfo.email);
                console.log(this.state.registerPhoneInfo.registerInfo.pw);
                firebaseApi
                    .registerAccount(
                        this.state.registerPhoneInfo.registerInfo.email,
                        this.state.registerPhoneInfo.registerInfo.pw
                    )
                    .then(user => {
                        console.log("REGISTERED USER STUFF");
                        console.log(user.user);
                        this.register(user.user);
                    })
                    .catch(error => {
                        console.log("OEPS");
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
                //display error
                console.log(result);
                alert(result["msg"]);
                console.log("error");
                firebaseApi.deleteUser(firebaseUser);
            } else {
                //display succes
                alert(result["msg"]);
                userId = result["id"];
                Router.goTo(this.props.navigation, "LoginStack", "LoginScreen");
                //store userId
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: Header.HEIGHT }}>
                    <Toolbar centerElement="Registreren" />
                </View>
                <CodeInput
                    ref="codeInput"
                    keyboardType="numeric"
                    codeLength={6}
                    size={60}
                    className="border-circle"
                    cellBorderWidth={3}
                    autoFocus={true}
                    activeColor="#212121"
                    codeInputStyle={styles.codeInputStyle}
                    containerStyle={styles.containerStyle}
                    onFulfill={code => this.checkCode(code)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: "100%"
    },
    containerStyle: {
        flex: 1,
        marginTop: "50%"
    },
    codeInputStyle: {
        borderColor: "#212121",
        color: "#212121"
    }
});
