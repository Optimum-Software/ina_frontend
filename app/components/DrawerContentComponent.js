import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions
} from "react-native";
import { Fragment } from "react";
import { DrawerItems } from "react-navigation";
import ProfileParameters from "../helpers/ProfileParameters";
import { CachedImage } from "react-native-cached-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Router from "../helpers/Router";
import User from "../helpers/User";
import Api from "../helpers/Api";
import UserApi from "../helpers/UserApi";
import { ifIphoneX, isIphoneX } from "react-native-iphone-x-helper";

export default class DrawerContentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      profilePhoto: { uri: "" },
      organisation: ""
    };
  }

  componentDidMount() {
    User.getUserId().then(id => {
      if (id != null) {
        Api.callApiGetSafe("getUserById/" + id).then(res => {
          console.log(Api.getFileUrl(res["user"].profilePhotoPath));
          this.setState({
            firstName: res["user"].firstName,
            lastName: res["user"].lastName,
            profilePhoto: { uri: Api.getFileUrl(res["user"].profilePhotoPath) },
            organisation: decodeURIComponent(res["user"].organisation)
          });
        });
      }
    });
  }
  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "00a6ff" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          <View style={{ height: Dimensions.get("window").height }}>
            <View style={{ height: "90%" }}>
              <CachedImage
                source={require("../assets/images/drawer.png")}
                resizeMode="stretch"
                style={{
                  height: (Dimensions.get("window").height - 90) * 0.99,
                  ...ifIphoneX({
                    height: (Dimensions.get("window").height - 150) * 0.9
                  })
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => {
                      Router.goTo(
                        this.props.navigation,
                        "ProfileScreen",
                        "ProfileScreen"
                      );
                    }}
                  >
                    <CachedImage
                      source={this.state.profilePhoto}
                      resizeMode="cover"
                      style={{
                        width: 75,
                        height: 75,
                        borderRadius: 38,

                        backgroundColor: "white"
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "center",
                      paddingLeft: "5%"
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                        marginBottom: "1%"
                      }}
                    >
                      {this.state.firstName}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 10
                      }}
                    >
                      {this.state.organisation}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: "90%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    height: 1,
                    alignSelf: "center"
                  }}
                />
                <View style={{ paddingLeft: "5%", paddingTop: "5%", flex: 3 }}>
                  <DrawerItems {...this.props} />
                  <TouchableOpacity
                    key="logout"
                    onPress={() => {
                      UserApi.logout();
                      User.storeUserId(null);
                      User.storeToken(null);
                      this.props.navigation.closeDrawer();
                      Router.switchLogout(this.props.navigation);
                      this.props.navigation.navigate("DrawerClose");
                    }}
                    delayPressIn={0}
                  >
                    <SafeAreaView
                      forceInset={{
                        left: "always",
                        right: "never",
                        vertical: "never"
                      }}
                    >
                      <View
                        style={[
                          { flexDirection: "row", alignItems: "center" },
                          {}
                        ]}
                      >
                        <View
                          style={[
                            {
                              marginHorizontal: 16,
                              width: 24,
                              alignItems: "center"
                            },
                            {}
                          ]}
                        >
                          <Icon name="logout" size={25} color={"white"} />
                        </View>
                        <Text
                          style={[
                            { margin: 16, fontWeight: "bold" },
                            { color: "white" }
                          ]}
                        >
                          Uitloggen
                        </Text>
                      </View>
                    </SafeAreaView>
                  </TouchableOpacity>
                </View>
              </CachedImage>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.closeDrawer()}
              style={{
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                backgroundColor: "#01a6ff",
                borderRadius: 100,
                position: "absolute",
                bottom: (Dimensions.get("window").height - 90) * 0.055,
                ...ifIphoneX({
                  bottom: (Dimensions.get("window").height - 150) * 0.115
                })
              }}
            >
              <Icon name={"close"} size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}
