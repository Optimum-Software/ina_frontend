import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    Platform,
    ActivityIndicator
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import { Input, Icon } from "react-native-elements";
import Router from "../helpers/Router";
import UserApi from "../helpers/UserApi";
import User from "../helpers/User";
import firebaseApi from "../helpers/FirebaseApi";
import firebase from "react-native-firebase";

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
        if (Platform.OS == "android") {
            this.setState({
                android: true
            });
            console.log(firebaseApi.getFire().PhoneAuthProvider);
            firebaseApi
                .verifyPhoneNumber(
                    this.props.navigation.state.params.phoneNumber
                )
                .on(
                    "state_changed",
                    phoneAuthSnapshot => {
                        console.log(phoneAuthSnapshot);
                        // How you handle these state events is entirely up to your ui flow and whether
                        // you need to support both ios and android. In short: not all of them need to
                        // be handled - it's entirely up to you, your ui and supported platforms.

                        // E.g you could handle android specific events only here, and let the rest fall back
                        // to the optionalErrorCb or optionalCompleteCb functions
                        switch (phoneAuthSnapshot.state) {
                            // ------------------------
                            //  IOS AND ANDROID EVENTS
                            // ------------------------
                            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
                                console.log("code sent");
                                this.setState({
                                    verifyId: phoneAuthSnapshot.verificationId
                                });
                                // on ios this is the final phone auth state event you'd receive
                                // so you'd then ask for user input of the code and build a credential from it
                                break;
                            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                                console.log("verification error");
                                console.log(phoneAuthSnapshot.error);
                                alert(
                                    "Er ging iets mis, probeer het nog een keer"
                                );
                                Router.goBack(this.props.navigation);
                                break;

                            // ---------------------
                            // ANDROID ONLY EVENTS
                            // ---------------------
                            case firebase.auth.PhoneAuthState
                                .AUTO_VERIFY_TIMEOUT: // or 'timeout'
                                console.log("auto verify on android timed out");
                                const {
                                    verificationId,
                                    code
                                } = phoneAuthSnapshot;

                                this.setState({
                                    android: false,
                                    verificationId: verificationId,
                                    code: code
                                });
                                // proceed with your manual code input flow, same as you would do in
                                // CODE_SENT if you were on IOS
                                break;
                            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
                                // auto verified means the code has also been automatically confirmed as correct/received
                                // phoneAuthSnapshot.code will contain the auto verified sms code - no need to ask the user for input.
                                console.log("auto verified on android");
                                console.log(phoneAuthSnapshot);
                                this.register(firebaseApi.getCurrentUser());
                                // Example usage if handling here and not in optionalCompleteCb:
                                // const { verificationId, code } = phoneAuthSnapshot;
                                // const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

                                // Do something with your new credential, e.g.:
                                // firebase.auth().signInWithCredential(credential);
                                // firebase.auth().linkWithCredential(credential);
                                // etc ...
                                break;
                        }
                    },
                    error => {
                        console.log(error);
                        console.log(error.verificationId);
                    },
                    phoneAuthSnapshot => {
                        console.log(phoneAuthSnapshot);
                    }
                );
        }
    }

    checkCode() {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            this.state.verificationId,
            this.state.code
        );
        console.log(credential);
        firebaseApi
            .loginPhone(credential)
            .then(result => this.register(result.user));
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
                Router.goTo(
                    this.props.navigation,
                    "LoginStack",
                    "RegisterVerifySuccessfull"
                ); //route to succesfeedback screen
            }
        });
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require("../assets/images/bluewavebg.png")}
                resizeMode="stretch"
            >
                <View style={{ flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 2,
                            width: "90%",
                            marginTop: "3%",
                            marginLeft: "5%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={styles.infoTextTitle}>Verificatie</Text>
                    </View>
                </View>
                {this.state.android && (
                    <View
                        style={{
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: "100%"
                        }}
                    >
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                )}
                {!this.state.android && (
                    <View style={{ padding: "10%" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                    flex: 2,
                                    width: "90%",
                                    marginTop: "5%"
                                }}
                            >
                                <Text style={styles.infoText}>
                                    Vul alle velden in om je een account aan te
                                    maken.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <Input
                                placeholder="verificatiecode"
                                placeholderTextColor="#FFFFFF"
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={styles.inputContainerStyle}
                                inputStyle={styles.inputStyle}
                                value={this.state.code}
                                leftIcon={{
                                    type: "font-awesome",
                                    name: "lock",
                                    color: "#FFFFFF"
                                }}
                                errorStyle={styles.errorStyle}
                                errorMessage={this.state.phoneNumberError}
                                onChangeText={code => this.setState({ code })}
                                onSubmitEditing={() => this.checkCode()}
                                keyboardType="numeric"
                                maxLength={6}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => this.checkCode()}
                        >
                            <Text style={styles.textStyle}>Verder</Text>
                        </TouchableOpacity>
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

    infoTextTitle: {
        color: "#00A6FF",
        alignSelf: "flex-start",
        fontSize: 25,
        marginBottom: "5%",
        marginLeft: "5%"
    },

    containerStyle: {
        flex: 1,
        marginTop: "50%"
    },

    infoField: {
        flex: 2,
        width: "75%",
        alignSelf: "center"
    },

    infoTextTitle: {
        color: "#00A6FF",
        alignSelf: "flex-start",
        fontSize: 25
    },

    infoText: {
        color: "#FFFFFF",
        alignSelf: "flex-start",
        fontSize: 16,
        marginTop: "20%"
    },

    inputFieldContainer: {
        marginTop: "10%",
        marginBottom: "10%",
        flexDirection: "column"
    },

    inputContainer: {
        width: "100%",
        alignSelf: "center"
    },

    inputContainerStyle: {
        borderBottomColor: "#FFFFFF"
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
        flex: 1
    },

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

    goOnText: {
        color: "#01A6FF",
        alignSelf: "center",
        fontSize: 20
    },

    textContainer: {
        width: "100%",
        alignSelf: "center"
    },

    goToLoginText: {
        alignSelf: "center",
        fontSize: 16,
        color: "#FFFFFF"
    }
});
