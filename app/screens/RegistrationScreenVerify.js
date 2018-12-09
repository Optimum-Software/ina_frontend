import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button } from "react-native-elements";
import Router from "../helpers/Router";
import CodeInput from "react-native-confirmation-code-input";
import firebaseApi from "../helpers/FirebaseApi";

export default class RegistrationScreenStart extends Component {
    constructor() {
        super();
        this.state = {
            registerInfo: {}
        };
    }

    componentDidMount() {
        this.setState({ registerInfo: this.props.navigation.state.params });
        this.state.registerInfo.confirmResult;
    }

    checkCode(code) {
        console.log(code);
        firebaseApi
            .verifyPhoneNumber(code, this.state.registerInfo.confirmResult)
            .then(result => {
                console.log(result);
                console.log(this.state.registerInfo.registerInfo.email);
                console.log(this.state.registerInfo.registerInfo.pw);
                this.setState({ phoneCredential: result });
                firebaseApi
                    .registerAccount(
                        this.state.registerInfo.registerInfo.email,
                        this.state.registerInfo.registerInfo.pw
                    )
                    .then(user => {
                        console.log(
                            "----------------REGISTERED USER--------------------"
                        );
                        console.log(user);
                        console.log(this.state.phoneCredential);
                        firebaseApi.linkAccountWithPhone(
                            this.state.phoneCredential,
                            user
                        );
                    });
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
