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
  Platform,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Router from "../helpers/Router";
import { Toolbar } from "react-native-material-ui";
import { Fragment } from "react";
import WhiteButton from "../components/WhiteButton";

class RegistrationScreenVerifySuccessfull extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#00a6ff" }}>
          <StatusBar
            backgroundColor={Platform.OS == "android" ? "white" : "#00a6ff"}
            barStyle="dark-content"
          />
          <ImageBackground
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "flex-start"
            }}
            source={require("../assets/images/bluewavebg.png")}
            resizeMode="stretch"
          >
            <Toolbar
              centerElement="Verificatie"
              style={{
                container: { backgroundColor: "transparent" },
                titleText: { color: "#00a6ff" },
                leftElement: { color: "#00a6ff" }
              }}
            />
            <View style={{ height: "80%", marginTop: "20%" }}>
              <View
                style={{
                  flex: 2,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20%"
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
                  Ga verder om optionele informatie in te vullen.
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View
                  style={{
                    width: Dimensions.get("window").width,
                    paddingLeft: "15%",
                    paddingRight: "15%"
                  }}
                >
                  <WhiteButton
                    label="Verder"
                    onPress={() =>
                      Router.goTo(
                        this.props.navigation,
                        "LoginStack",
                        "RegisterOptional",
                        {
                          userId: this.props.navigation.getParam("userId", null)
                        }
                      )
                    }
                  />
                </View>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "LoginStack",
                      "LoginScreen", //change back to RegisterStart
                      null
                    )
                  }
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      marginTop: 10,
                      fontSize: 14
                    }}
                  >
                    Overslaan
                  </Text>
                </TouchableOpacity>
              </View>
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
    width: Dimensions.get("window").width,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "7%"
  }
});

export default RegistrationScreenVerifySuccessfull;
