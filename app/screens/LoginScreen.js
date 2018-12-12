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
    Button
} from "react-native";
import { Input } from "react-native-elements";
import Api from "../helpers/Api";
import { NavigationActions, Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import logo from "../assets/images/logo_circle.png";
import wave from "../assets/thewave.png";
import firebaseApi from "../helpers/FirebaseApi";
import Router from "../helpers/Router";
import User from "../helpers/User";
import UserApi from "../helpers/UserApi";
import OneSignal from "react-native-onesignal";
import sha256 from "crypto-js/sha256";
import SvgUri from "react-native-svg-uri";
var SHA256 = require("crypto-js/sha256");

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: "jelmer.haarman@xs4all.nl",
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

    login() {
        if (this.checkInputEmpty() && this.checkEmail()) {
            let hashedPw = SHA256(this.state.pw).toString();
            Api.login(this.state.email, hashedPw).then(result => {
                if (result.bool) {
                    User.getUserId().then(userId => {
                        User.getDeviceId().then(deviceId => {
                            UserApi.createDeviceId(userId, deviceId).then(
                                result => {
                                    console.log(result);
                                }
                            );
                        });
                    });
                    User.storeUserId(result.userId);
                    User.storeToken(result.token);
                    UserApi.notifyUser(result.userId).then(result => {
                        console.log(result);
                    });
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
            <View style={styles.container}>
                <View style={{ height: Header.HEIGHT }}>
                    <Toolbar
                        centerElement="Inloggen"
                        iconSet="MaterialCommunityIcons"
                        leftElement={"menu"}
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
                <Image
                    resizeMode="cover"
                    source={wave}
                    style={{ height: "5%", width: "100%" }}
                />
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
                    <Text style={styles.errorStyle}>
                        {this.state.emailError}
                    </Text>
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
                                "RegisterStart",
                                null
                            )
                        }
                    >
                        <Text
                            style={{
                                color: "#ffffff",
                                paddingBottom: "20%",
                                paddingTop: "5%"
                            }}
                        >
                            Wachtwoord vergeten?
                        </Text>
                    </TouchableOpacity>
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
                        <Text style={{ color: "#ffffff", padding: 5 }}>
                            Nog geen account?
                            <Text
                                style={{ fontWeight: "bold", color: "#ffffff" }}
                            >
                                Registreer hier!
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 16,
        color: "#01A6FF",
        textAlign: "center"
    },

    buttonStyle: {
        padding: "5%",
        backgroundColor: "#ffffff",
        borderRadius: 25
    },
    container: {
        height: "100%",
        width: "100%"
    },
    top: {
        width: "100%",
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center"
    },
    bottom: {
        width: "100%",
        flex: 2,
        backgroundColor: "#01A6FF",
        paddingLeft: "15%",
        paddingRight: "15%",
        paddingTop: "5%"
    },
    logo: {
        width: "50%",
        height: "50%",
        alignSelf: "center"
    },
    welcomeText: {
        paddingTop: "10%",
        fontSize: 16,
        color: "#01A6FF"
    },
    loginTitle: {
        marginBottom: "5%",
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
    actionContainer: {}
});
export default LoginScreen;
