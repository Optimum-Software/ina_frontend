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
            flex: 1,
            paddingTop: "5%",
            marginLeft: "10%",
            flexDirection: "column"
          }}
        >
          <Text style={{ color: "#01A6FF", fontWeight: "bold", fontSize: 25, marginBottom: "10%" }}>
            Verificatie
          </Text>
          <Text style={{ color: "#FFFF", fontSize: 16 }}>
            Het verifiëren van je account is gelukt!
          </Text>
        </View>
        <View
          style={{
            flex: 2,
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
        <View style={styles.actionContainer}>
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
          <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                Router.goTo(
                  this.props.navigation,
                  "LoginStack",
                  "RegisterOptional",
                  null
                )
              }
            >
              <Text style={styles.textStyle}>Optionele informatie invullen</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: "5%"
  },
  textStyle: {
    fontSize: 16,
    color: "#01A6FF",
    textAlign: "center"
  },

  textContainer: {
    flexDirection: "row",
    alignSelf: "center" 
  },

  actionContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: "7%"
  },
});

export default RegistrationScreenVerifySuccessfull;
