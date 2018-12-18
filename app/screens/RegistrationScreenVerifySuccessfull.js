"use strict";

import React, { Component } from "react";

import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Router from "../helpers/Router";

class RegistrationScreenVerifySuccessfull extends Component {
    render() {
        return (
            <ImageBackground
                source={require("../assets/images/bluewavebg.png")}
                style={{ height: "100%", width: "100%" }}
                resizeMode="stretch"
            >
                <View style={{ flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 2,
                            width: "90%",
                            marginTop: "5%",
                            marginLeft: "5%"
                        }}
                    >
                        <Text style={styles.infoTextTitle}>Verificatie</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: "50%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Icon name="verified" size={140} color="#fff" />
                    <Text
                        style={{
                            marginTop: "3%",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 18
                        }}
                    >
                        Verificatie voltooid!
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                        Ga verder om te beginnen.
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() =>
                        Router.goTo(
                            this.props.navigation,
                            "LoginStack",
                            "LoginScreen",
                            null
                        )
                    }
                >
                    <Text style={styles.textStyle}>Verder</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        padding: "3%",
        backgroundColor: "#fff",
        borderRadius: 25,
        width: "60%",
        alignSelf: "center",
        marginBottom: "2%"
    },
    textStyle: {
        fontSize: 16,
        color: "#01A6FF",
        textAlign: "center"
    },
    infoTextTitle: {
        color: "#00A6FF",
        alignSelf: "flex-start",
        fontSize: 25,
        marginBottom: "5%"
    }
});

export default RegistrationScreenVerifySuccessfull;
