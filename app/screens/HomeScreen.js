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
  Easing
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
      unRead: 0
    };
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.onLoad); 
  }

  onLoad = () => {
    this.getTags();
    this.getTrendingProjects();
    this.getUserIfLoggedIn();
    this.getNotificationCount();
  }

  getNotificationCount() {
    let unRead = 0
    User.getUserId().then(id => {
      UserApi.getNotifications(id).then(res => {
        if(res['bool']) {
          for(noti of res['notifications']) {
            if(!noti['read']) {
              unRead++
            }
            this.setState({unRead: unRead})
          }
        }
      })
    })
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
    Api.callApiGet("getAllTags").then(response => {
      if (response["bool"]) {
        this.setState({ topics: response["tags"] });
      }
    });
  }

  getTrendingProjects() {
    ProjectApi.mostLikedProjects().then(response => {
      if (response["bool"]) {
        this.setState({ projects: response["projects"] });
      }
    });
  }

  getUserIfLoggedIn() {
    User.getUserId().then(id => {
      if (id != null) {
        dateNow = new Date().toLocaleDateString("nl-NL", {
          weekday: "long",
          day: "numeric",
          month: "long"
        });
        Api.callApiGet("getUserById/" + id).then(res => {
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
    });
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

    HomepageApi.searchProjects(term).then(res => {
      if (res["bool"]) {
        this.setState({ projects: res["projects"] });
      }
    });
    this.setState({ searchTerm: "" });
  }

  handelEnd = () => {};

  onRefresh = () => {
    this.setState({ refreshing: true, searchTerm: "" });
    this.onLoad()
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
            refreshControl={
              <RefreshControl
              style={{backgroundColor: '#00a6ff'}}
                colors={["#94D600"]}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <View>
              {this.state.loggedIn && (
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
                          Er is geen nieuwe meldingen
                        </Text>
                      )}
                    </View>
                  </ImageBackground>
                </View>
              )}
              {this.state.search && (
                <Animated.View
                  style={{
                    paddingTop: 10,
                    paddingBottom: 5,
                    height: searchHeight,
                    opacity: searchOpacity
                  }}
                >
                  <Input
                    placeholderTextColor="#000000"
                    containerStyle={styles.searchBarContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    value={this.state.searchTerm}
                    leftIcon={{
                      type: "font-awesome",
                      name: "search",
                      color: "#000000"
                    }}
                    onChangeText={searchTerm => this.setState({ searchTerm })}
                    onSubmitEditing={() => alert("test")}
                    shake={true}
                  />
                </Animated.View>
              )}
              {this.state.search && <View style={styles.separator} />}
              <Text style={styles.title}>Trending Topics</Text>

              <FlatList
                data={this.state.topics}
                onEndReached={() => this.handelEnd()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
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
                            fontFamily: "Montserrat-Medium",
                            textAlignVertical: "bottom",
                            textAlign: "center",
                            color: "white"
                          }}
                        >
                          {item.name}
                        </Text>
                      </Ripple>
                  );
                }}
              />
            </View>
            <View>
              <Text style={[styles.title, {    marginTop: 30}]}>Trending Projecten</Text>
              <FlatList
                data={this.state.projects}
                onEndReached={() => this.handelEnd()}
                numColumns={2}
                contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
                renderItem={({ item, index }) => {
                  return (
                    <Ripple
                      rippleColor="#fff"
                      style={styles.cardContainer}
                      key={item.id}
                      onPress={() =>
                        Router.goTo(
                          this.props.navigation,
                          "HomeStack",
                          "ProjectDetailScreen",
                          {
                            id: item.id,
                            name: item.name,
                            desc: item.desc,
                            start_date: item.start_date,
                            end_date: item.end_date,
                            created_at: item.created_at,
                            like_count: item.like_count,
                            follower_count: item.follower_count,
                            location: item.location,
                            thumbnail: Api.getFileUrl(item.thumbnail),
                            creator: item.creator,
                            images: item.images,
                            files: item.files
                          }
                        )
                      }
                    >
                    {index != (this.state.projects.length - 1) &&(
                      //not last card
                      <View style={styles.card}>
                        <View style={styles.cardImage}>
                          <CachedImage
                          source={{ uri: Api.getFileUrl(item.thumbnail)}}
                          resizeMode="cover"
                          style={styles.image}
                        />
                        </View>
                        <Image
                          source={line2}
                          resizeMode="stretch"
                          style={{ width: "100%", height: "2%" }}
                        />
                          <Text numberOfLines={2} style={styles.cardTitle}>
                            {item.name}
                          </Text>
                      </View>
                    )}
                    {index == (this.state.projects.length - 1) && (index+1) % 2 == 0 &&(
                      //last card but even index
                      <View style={styles.card}>
                        <View style={styles.cardImage}>
                          <CachedImage
                          source={{ uri: Api.getFileUrl(item.thumbnail)}}
                          resizeMode="cover"
                          style={styles.image}
                        />
                        </View>
                        <Image
                          source={line2}
                          resizeMode="stretch"
                          style={{ width: "100%", height: "2%" }}
                        />
                          <Text numberOfLines={2} style={styles.cardTitle}>
                            {item.name}
                          </Text>
                      </View>
                    )}
                    {index == (this.state.projects.length - 1) && (index+1) % 2 != 0 && (
                      //last card but uneven index
                      <View style={styles.cardUneven}>
                        <View style={styles.cardImage}>
                          <CachedImage
                          source={{ uri: Api.getFileUrl(item.thumbnail)}}
                          resizeMode="cover"
                          style={styles.image}
                        />
                        </View>
                        <Image
                          source={line2}
                          resizeMode="stretch"
                          style={{ width: "100%", height: "2%" }}
                        />
                          <Text numberOfLines={2} style={styles.cardTitle}>
                            {item.name}
                          </Text>
                      </View>
                    )}  
                    </Ripple>
                    )}}
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
    justifyContent: "center",
    margin: 10
  },

  topicContainer: {
    elevation: 3,
    width: Dimensions.get("window").width * 0.285,
    height: Dimensions.get("window").width * 0.285,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: Dimensions.get("window").width * 0.024,
    marginRight: Dimensions.get("window").width * 0.024,

    },

  cardTitle: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: '#4a6572'
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginLeft: Dimensions.get("window").width * 0.024,
    marginRight: Dimensions.get("window").width * 0.024,
    marginTop: Dimensions.get("window").width * 0.05,
    width: Dimensions.get("window").width * 0.43,
    height: (Dimensions.get("window").height - 90) * 0.2,
    ...ifIphoneX({
      height: (Dimensions.get("window").height - 150) * 0.17
    }),
    elevation: 3,
    borderRadius: 4
  },

  cardUneven: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    width: "100%",
    height: (Dimensions.get("window").height - 90) * 0.2,
    ...ifIphoneX({
      height: (Dimensions.get("window").height - 150) * 0.17
    }),
    marginBottom: 10,
    elevation: 3,
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
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    marginTop: 15,
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
    borderTopRightRadius: 4
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
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    color: "white"
  },

  textSubTitle: {
    fontFamily: "Montserrat-Regular",

    fontSize: 16,
    color: "white"
  },

});
