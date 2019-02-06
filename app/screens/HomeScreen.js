import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
  Animated,
  Easing,
  Linking
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import Router from "../helpers/Router";
import { Input, Icon } from "react-native-elements";
import line from "../assets/images/Line.png";
import homeBackground from "../assets/images/homeBackground.jpg";
import Api from "../helpers/Api";
import GroupApi from "../helpers/GroupApi";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";
import UserApi from "../helpers/UserApi";
import LinearGradient from "react-native-linear-gradient";
import HomepageApi from "../helpers/HomepageApi";
import { CachedImage } from "react-native-cached-image";
import Ripple from "react-native-material-ripple";
import { ifIphoneX, isIphoneX } from "react-native-iphone-x-helper";
import line2 from "../assets/images/line3.png";
import RNFetchBlob from "react-native-fetch-blob";
import OneSignal from "react-native-onesignal";
import ProjectComponent from "../components/ProjectComponent";

const colorArray = ["#312783", "#F39200", "#3AAA35", "#E94E1B", "#BE1522"];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      topics: [],
      projects: [],
      searchTerm: "",
      user: null,
      loggedIn: false,
      dateNow: null,
      refreshing: false,
      search: false,
      unRead: 0,
      userId: null,
      startIndex: 0,
      endIndex: 9
    };
    this.animatedValue = new Animated.Value(0);
    Router.setDispatcher(this.props.navigation);
  }

  componentDidMount() {
    User.getUserId().then(id => {
      if(id != null) {
        this.setState({ userId: id, loggedIn: true });
      }
      
    });
    this.props.navigation.addListener("willFocus", this.onLoad);
    OneSignal.addEventListener("opened", this.onOpened);
    Linking.addEventListener("url", this._handleOpenURL);
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          ProjectApi.getProjectById(
            this.state.userId,
            url.substring(Platform.OS === "android" ? 29 : 6, url.length)
          ).then(result => {
            Router.goTo(
              this.props.navigation,
              "ProjectStack",
              "ProjectDetailScreen",
              result["project"]
            );
          });
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  onOpened(openResult) {
    if (openResult.notification.isAppInFocus) {
      if (openResult.notification.payload.additionalData["type"] == 0) {
        //go to chat
        Router.goToDeeplink("ChatStack", "ChatStack");
      } else if (openResult.notification.payload.additionalData["type"] == 1) {
        //go to project overview
        Router.goToDeeplink("ProjectStack", "ProjectOverviewScreen");
      }
    }
  }

  onLoad = () => {
    this.getTags();
    this.getTrendingProjects();
    this.getUserIfLoggedIn();
    this.getNotificationCount();
  };

  getNotificationCount() {
    let unRead = 0;
    User.getUserId().then(id => {
      UserApi.getNotifications(id).then(res => {
        if (res["bool"]) {
          for (noti of res["notifications"]) {
            if (!noti["read"]) {
              unRead++;
            }
            this.setState({ unRead: unRead });
          }
        }
      });
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this._handleOpenURL);
  }

  _handleOpenURL(event) {
    User.getUserId().then(id => {
      ProjectApi.getProjectById(
        id,
        event.url.substring(
          Platform.OS === "android" ? 29 : 6,
          event.url.length
        )
      ).then(result => {
        console.log(result['project'])
        Router.goToDeeplink(
          "ProjectStack",
          "ProjectDetailScreen",
          result["project"]
        );
      });
    });
  }

  animate() {
    this.setState({ search: true });
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease
    }).start();
  }

  animateRev() {
    this.setState({ search: false });

    this.animatedValue.setValue(1);
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 10,
      easing: Easing.ease,
      extrapolate: "clamp"
    }).start();
  }

  getTags() {
    ProjectApi.getAllTags().then(response => {
      if (response["bool"]) {
        this.setState({ topics: response["tags"] });
      }
    });
  }

  getTrendingProjects() {
    ProjectApi.getProjects(this.state.userId, "most_liked").then(response => {
      if (response["bool"]) {
        this.setState({ projects: response["projects"] });
      }
    });
  }

  getUserIfLoggedIn() {
    if (this.state.userId != null) {
      dateNow = new Date().toLocaleDateString("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long"
      });
      Api.callApiGet("getUserById/" + this.state.userId).then(res => {
        if (res["bool"]) {
          this.setState({
            user: res["user"],
            loggedIn: true,
            dateNow: dateNow
          });
        }
      });
    } else {
      this.setState({ loggedIn: false, user: null, dateNow: null });
    }
  }

  goToProjectFilterByTag(tag) {
    Router.goTo(
      this.props.navigation,
      "ProjectStack",
      "ProjectOverviewScreen",
      { tag: tag }
    );
  }

  search(term) {
    HomepageApi.searchTags(term).then(res => {
      if (res["bool"]) {
        this.setState({ topics: res["tags"] });
      }
    });

    ProjectApi.getProjects(this.state.userId, "search", term).then(res => {
      if (res["bool"]) {
        this.setState({ projects: res["projects"] });
      }
    });
    this.setState({ searchTerm: "" });
  }

  handelProjectsEnd = () => {};

  handelEnd = () => {};

  onRefresh = () => {
    this.setState({ refreshing: true, searchTerm: "" });
    this.onLoad();
    this.setState({ refreshing: false });
  };

  render() {
    const searchHeight = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50]
    });
    const searchOpacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <Toolbar
            style={{ container: { backgroundColor: "#00a6ff", elevation: 0 } }}
            leftElement={"menu"}
            searchable={{
              autoFocus: true,
              placeholder: "Search",
              onChangeText: text => this.search(text)
            }}
            onLeftElementPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <ScrollView
            style={{ backgroundColor: "#00a6ff" }}
            refreshControl={
              <RefreshControl
                colors={["#00a6ff"]}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <View style={{ backgroundColor: "white" }}>
              {this.state.loggedIn == true && (
                <View style={styles.welcomeContainer}>
                  <ImageBackground
                    style={styles.welcomeBackground}
                    source={require("../assets/images/bluewavebgRev.png")}
                    resizeMode="stretch"
                  >
                    <View
                      style={{
                        paddingTop: 10,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={[styles.textTitle, styles.customFont]}>
                        Welkom {this.state.user.firstName},
                      </Text>
                      {this.state.unRead > 1 && (
                        <Text style={styles.textSubTitle}>
                          Er zijn {this.state.unRead} nieuwe meldingen voor je
                        </Text>
                      )}
                      {this.state.unRead == 1 && (
                        <Text style={styles.textSubTitle}>
                          Er is {this.state.unRead} nieuwe melding voor je
                        </Text>
                      )}
                      {this.state.unRead == 0 && (
                        <Text style={styles.textSubTitle}>
                          Er zijn geen nieuwe meldingen
                        </Text>
                      )}
                    </View>
                  </ImageBackground>
                </View>
              )}
              {this.state.topics.length < 1 &&
                this.state.projects.length < 1 && (
                  <View
                    style={{
                      width: Dimensions.get("window").width,
                      height: Dimensions.get("window").height,
                      backgroundColor: "white"
                    }}
                  />
                )}

              {this.state.topics.length > 0 && (
                <Text style={styles.title}>Trending Topics</Text>
              )}

              <FlatList
                data={this.state.topics}
                onEndReached={() => this.handelEnd()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <CachedImage
                      style={[
                        styles.topicContainer,
                        {
                          marginTop: Dimensions.get("window").width * 0.05,
                          marginBottom: Dimensions.get("window").width * 0.05
                        }
                      ]}
                      imageStyle={{ borderRadius: 5 }}
                      source={{ uri: Api.getFileUrl(item.thumbnail) }}
                      key={item.id}
                    >
                      <Ripple
                        rippleColor="#fff"
                        style={[
                          styles.topicContainer,
                          {
                            backgroundColor: colorArray[index % 4]
                          }
                        ]}
                        onPress={() => this.goToProjectFilterByTag(item.name)}
                      >
                        <Text
                          style={{
                            textAlignVertical: "bottom",
                            textAlign: "center",
                            color: "white"
                          }}
                        >
                          {item.name}
                        </Text>
                      </Ripple>
                    </CachedImage>
                  );
                }}
              />
            </View>
            <View style={{ backgroundColor: "white" }}>
              {this.state.projects.length > 0 && (
                <Text style={[styles.title, { marginTop: 10 }]}>
                  Trending Projecten
                </Text>
              )}
              <FlatList
                data={this.state.projects}
                onEndReached={() => this.handelProjectsEnd()}
                numColumns={2}
                contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
                renderItem={({ item, index }) => (
                  <ProjectComponent
                    item={item}
                    index={index}
                    projects={this.state.projects}
                    dispatcher={this.props.navigation}
                    differentStack={true}
                  />
                )}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#00a6ff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  topicContainer: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    width: Dimensions.get("window").width * 0.285,
    height: Dimensions.get("window").width * 0.285,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: Dimensions.get("window").width * 0.024,
    marginRight: Dimensions.get("window").width * 0.024
  },

  cardTitle: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a6572"
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginLeft: Dimensions.get("window").width * 0.024,
    marginRight: Dimensions.get("window").width * 0.024,
    marginTop: Dimensions.get("window").width * 0.05,
    width: Dimensions.get("window").width * 0.43,
    height: (Dimensions.get("window").height - 90) * 0.35,
    ...ifIphoneX({
      height: (Dimensions.get("window").height - 150) * 0.24
    }),
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    borderRadius: 4
  },

  cardUneven: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    width: Dimensions.get("window").width * 0.9,
    marginLeft: Dimensions.get("window").width * 0.024,
    marginRight: Dimensions.get("window").width * 0.024,
    marginTop: Dimensions.get("window").width * 0.05,
    height: (Dimensions.get("window").height - 90) * 0.35,
    ...ifIphoneX({
      height: (Dimensions.get("window").height - 150) * 0.24
    }),
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    borderRadius: 4
  },

  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  cardImage: {
    height: "70%",
    width: "100%"
  },

  title: {
    backgroundColor: "white",
    fontSize: 20,
    padding: 15,
    margin: 10
  },

  separator: {
    height: 1,
    backgroundColor: "#b5babf",
    marginTop: 15,
    marginBottom: 15,
    width: "80%",
    alignSelf: "center"
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: "hidden"
  },

  searchBarContainerStyle: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  inputContainerStyle: {
    borderBottomColor: "#FFFFFF",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },

  inputStyle: {
    color: "#000000",
    justifyContent: "center",
    alignItems: "center"
  },

  welcomeBox: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  welcomeBackground: {
    height: 115
  },

  welcomeContainer: {
    width: "100%",
    marginBottom: 5
  },

  textTitle: {
    fontSize: 24,
    color: "white"
  },

  textSubTitle: {
    fontSize: 16,
    color: "white"
  }
});
