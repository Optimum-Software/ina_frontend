import React, { Component } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    Easing
} from "react-native";
import Api from "../config/Api";
import { NavigationActions } from "react-navigation";
import logo from "../assets/images/logo.png";
import firebaseApi from "../helpers/FirebaseApi";
import Router from "../helpers/Router";

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
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
        if (this.state.email == "" || this.state.password == "") {
            alert("Vul alstublieft alle velden in!");
        } else if (/\S+@\S+\.\S+/.test(this.state.email) == false) {
            alert("Het ingevoerde email adres is geen valide email!");
        } else {
            // let api = Api.getInstance();
            // let userData = {
            //     email: this.state.email,
            //     password: this.state.password
            // };
            // api.callApiPost("login", "POST", userData, response => {});
            firebaseApi.sendSms("+31611735849");
        }
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
        });
        return (
            <ScrollView style={styles.container}>
                <Animated.Image
                    resizeMode="contain"
                    style={{
                        width: 200,
                        height: 200,
                        marginTop: "5%",
                        alignSelf: "center",
                        transform: [{ rotate: spin }]
                    }}
                    source={logo}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onChangeText={text => this.setState({ email: text })}
                        placeholder="E-mailadres"
                        placeholderTextColor="#37474f"
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={text => this.setState({ password: text })}
                        secureTextEntry={true}
                        returnKeyType="go"
                        placeholder="Wachtwoord"
                        placeholderTextColor="#37474f"
                    />
                </View>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.login()}
                >
                    <Text style={styles.buttonText}>Inloggen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginBottom: 25, marginTop: 10 }}
                    onPress={() =>
                        Router.goTo(
                            this.props.navigation,
                            "Register",
                            "RegisterStart",
                            null
                        )
                    }
                >
                    <Text style={{ color: "#37474f" }}>
                        Nog geen account? Meld je aan!
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        padding: 20,
        backgroundColor: "#fafafa"
    },
    inputContainer: {
        marginTop: "20%"
    },
    input: {
        height: 40,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#fff"
    },
    buttonContainer: {
        backgroundColor: "#2980b6",
        paddingVertical: 15
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700"
    }
});
export default LoginScreen;
