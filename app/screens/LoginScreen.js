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
import { NavigationActions } from "react-navigation";
import logo from "../assets/images/logo_circle.png";
import wave from "../assets/thewave.png";
import firebaseApi from "../helpers/FirebaseApi";
import Router from "../helpers/Router";
import User from "../helpers/User";
import SvgUri from "react-native-svg-uri";
import Dimensions from "Dimensions";

// Precalculate Device Dimensions for better performance
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1;

// We set our base font size value
const base_unit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            emailError: "",

            pw: "",
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
                    Router.goTo(
                        this.props.navigation,
                        "Register",
                        "RegisterStart",
                        null
                    );
                } else {
                    this.setState({ pwError: result.msg });
                }
                User.getUserId().then(result => {
                    console.log(result);
                });
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
                                "Register",
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
                        onPress={() => onPress()}
                    >
                        <Text style={styles.textStyle}>Inloggen</Text>
                    </TouchableOpacity>
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
                        <Text style={{ color: "#ffffff", padding: 5 }}>
                            Nog geen account?{" "}
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
        height: "35%",
        width: "100%",
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center"
    },
    bottom: {
        height: "66%",
        width: "100%",
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
