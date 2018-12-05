import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Button } from "react-native-elements";
import Router from "../helpers/Router";
import CodeInput from "react-native-confirmation-code-input";

export default class RegistrationScreenStart extends Component {
    constructor() {
        super();
    }

    checkCode(code) {
        console.log(code);
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
                    autoFocus={true}
                    activeColor="#212121"
                    codeInputStyle={{
                        borderColor: "#212121",
                        color: "#212121"
                    }}
                    onFulfill={code => this.checkCode(code)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6be1ff",
        height: "100%"
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    }
});
