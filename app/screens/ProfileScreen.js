import React, { Component, Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import { Toolbar } from "react-native-material-ui";
import UserApi from "../helpers/UserApi";
import { Header } from "react-navigation";
import Router from "../helpers/Router";
import User from "../helpers/User";
import ProfileParameters from "../helpers/ProfileParameters";
import Api from "../helpers/Api";
import line from "../assets/images/Line.png";
import { Icon } from "react-native-elements";
import { CachedImage } from "react-native-cached-image";

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      profilePhoto: { uri: "" },
      id: null,
      firstName: "",
      lastName: "",
      organisation: "",
      _function: "",
      bio: "",
      admin: false,
      screenHeight: 0
    };
  }

  componentDidMount() {
    ProfileParameters.getUserId().then(id => {
      if (id != null) {
        ProfileParameters.storeUserId(null);
        Api.callApiGetSafe("getUserById/" + id).then(res => {
          console.log(res);
          this.setState({
            id: res.user.id,
            firstName: res["user"].firstName,
            lastName: res["user"].lastName,
            organisation: res["user"].organisation,
            _function: res["user"].function,
            bio: res["user"].bio,
            profilePhoto: {
              uri: Api.getFileUrl(res["user"].profilePhotoPath)
            }
          });
        });
      } else {
        User.getUserId().then(id => {
          Api.callApiGetSafe("getUserById/" + id).then(res => {
            console.log(res);

            this.setState({
              id: res.user.id,
              firstName: res["user"].firstName,
              lastName: res["user"].lastName,
              organisation: decodeURIComponent(res["user"].organisation),
              _function: decodeURIComponent(res["user"].function),
              bio: decodeURIComponent(res["user"].bio),
              profilePhoto: {
                uri: Api.getFileUrl(res["user"].profilePhotoPath)
              },
              admin: true
            });
          });
        });
      }
    });
    console.log(this.state);
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#00a6ff" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar
            backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
            barStyle="light-content"
          />

          <ScrollView style={{ flex: 1 }}>
            <View>
              <View style={styles.infoContainer}>
                <View style={{ height: Header.HEIGHT }}>
                  {!this.state.admin && (
                    <Toolbar
                      iconSet="MaterialCommunityIcons"
                      leftElement={"chevron-left"}
                      style={{
                        container: {
                          backgroundColor: "transparent",
                          elevation: 0
                        }
                      }}
                      onLeftElementPress={() => {
                        Router.goTo(
                          this.props.navigation,
                          "LoggedIn",
                          "LoggedIn"
                        );
                      }}
                    />
                  )}
                  {this.state.admin == true && (
                    <Toolbar
                      iconSet="MaterialCommunityIcons"
                      leftElement={"chevron-left"}
                      style={{
                        container: {
                          backgroundColor: "transparent",
                          elevation: 0
                        }
                      }}
                      onLeftElementPress={() => {
                        Router.goTo(
                          this.props.navigation,
                          "LoggedIn",
                          "LoggedIn"
                        );
                      }}
                      rightElement={"pencil"}
                      onRightElementPress={() => {
                        Router.goTo(
                          this.props.navigation,
                          "ProfileEdit",
                          "ProfileEditScreen"
                        );
                      }}
                    />
                  )}
                </View>
                <View style={styles.profilePhotoContainer}>
                  <CachedImage
                    source={this.state.profilePhoto}
                    resizeMode={"cover"}
                    style={styles.profilePhoto}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    alignSelf: "center",
                    marginTop: 10,
                    fontWeight: "bold"
                  }}
                >
                  {this.state.firstName + " " + this.state.lastName}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    alignSelf: "center"
                  }}
                >
                  {this.state._function}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    alignSelf: "center"
                  }}
                >
                  {this.state.organisation}
                </Text>
              </View>
              <ImageBackground
                style={styles.wave}
                resizeMode="stretch"
                source={require("../assets/images/bluewavebgRev.png")}
              />
            </View>
            <View
              style={{
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: "5%"
              }}
            >
              <Text>{this.state.bio}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  infoContainer: {
    backgroundColor: "#00a6ff",
    height: Dimensions.get("window").height * 0.3,
    zIndex: 1
  },
  wave: {
    height: 115,
    zIndex: 0
  },
  buttonStyle: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "#00a6ff",
    justifyContent: "center",
    alignItems: "center"
  },

  profilePhotoContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 62,
    width: 124,
    height: 124,
    resizeMode: "cover",
    alignSelf: "center"
  },
  profilePhoto: {
    borderRadius: 60,
    width: 120,
    height: 120,
    resizeMode: "cover",
    alignSelf: "center"
  },
  personalInfoBox: {
    marginTop: 30,
    paddingLeft: "10%",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  labels: {
    width: "30%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  label: {
    fontWeight: "bold"
  },

  items: {
    width: "50%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  separator: {
    height: 1,
    backgroundColor: "#b5babf",
    marginTop: 15,
    marginBottom: 15,
    width: "80%",
    alignSelf: "center"
  }
});
