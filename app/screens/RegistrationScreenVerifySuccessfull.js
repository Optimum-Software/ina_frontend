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
        <View
          style={{
            marginTop: "25%",
            marginLeft: "10%",
            flexDirection: "column"
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Verificatie
          </Text>
          <Text style={{ color: "#fff", fontSize: 12 }}>
            Het verifiëren van je account is gelukt!
          </Text>
        </View>
        <View
          style={{
            marginTop: "25%",
            alignSelf: "center",
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
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={{ color: "#fff", fontSize: 12 }}>Al een account? </Text>
          <Text
            style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "LoginStack",
                "LoginScreen",
                null
              )
            }
          >
            Klik hier om in te loggen!
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: "3%",
    marginTop: "30%",
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
  }
});

export default RegistrationScreenVerifySuccessfull;
