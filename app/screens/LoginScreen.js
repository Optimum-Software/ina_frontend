import React, { Component } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native";

import firebaseApi from "../helpers/FirebaseApi";

import logo from "../assets/logo.png";

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    login() {
        firebaseApi.login(this.state.email, this.state.password);
        console.log("HEY");
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={logo}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                            placeholder="E-mailadres"
                            placeholderTextColor="rgba(225,225,225,0.7)"
                        />
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={text =>
                                this.setState({ password: text })
                            }
                            secureTextEntry={true}
                            returnKeyType="go"
                            placeholder="Wachtwoord"
                            placeholderTextColor="rgba(225,225,225,0.7)"
                        />

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => this.login()}
                        >
                            <Text style={styles.buttonText}>Inloggen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        padding: 20,
        backgroundColor: "black"
    },
    inputContainer: {
        marginTop: "30%"
    },
    input: {
        height: 40,
        marginBottom: 10,
        padding: 10,
        color: "#fff"
    },
    buttonContainer: {
        backgroundColor: "#2980b6",
        paddingVertical: 15
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700"
    },
    logo: {
        marginTop: "10%",
        alignSelf: "center",
        height: "25%",
        width: "25%"
    }
});
export default LoginScreen;
