"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Router from "../helpers/Router";
import { Toolbar } from "react-native-material-ui";
import { Fragment } from "react";

class RegistrationScreenVerifySuccessfull extends Component {
  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#00a6ff" }}>
          <StatusBar
            backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
            barStyle="dark-content"
          />
          <ImageBackground
            source={require("../assets/images/bluewavebg.png")}
            style={{ height: "100%", width: "100%" }}
            resizeMode="stretch"
          >
            <Toolbar
              centerElement="Verificatie"
              style={{
                container: { backgroundColor: "#fff" },
                titleText: { color: "#00a6ff" },
                leftElement: { color: "#00a6ff" }
              }}
            />
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
                <Text style={styles.textStyle}>
                  Optionele informatie invullen
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </Fragment>
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
  }
});

export default RegistrationScreenVerifySuccessfull;
