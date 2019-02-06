import React, { Component } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Share,
  BackHandler,
  Alert
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import {
  NavigationActions,
  Header,
  createMaterialTopTabNavigator
} from "react-navigation";
import Router from "../helpers/Router";
import { Toolbar } from "react-native-material-ui";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";
import Carousel from "react-native-snap-carousel";
import DetailTab from "./DetailTab";
import NewsTab from "./NewsTab";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../helpers/Api";
import * as mime from "react-native-mime-types";
import { Thumbnail } from "react-native-thumbnail-video";
import { CachedImage } from "react-native-cached-image";
import LinearGradient from "react-native-linear-gradient";
import Ripple from "react-native-material-ripple";
import line from "../assets/images/Line.png";
import { ifIphoneX, isIphoneX } from "react-native-iphone-x-helper";
import { Fragment } from "react";
import { ImageColorPicker } from "react-native-image-color-picker";

const FirstRoute = props => (
  <View style={[styles.scene, { backgroundColor: "white" }]}>
    <DetailTab {...props} />
  </View>
);
const SecondRoute = props => (
  <View style={[styles.scene, { backgroundColor: "white" }]}>
    <NewsTab {...props} />
  </View>
);

const getTabBarIcon = props => {
  const { route } = props;

  if (route.key === "detail") {
    return <Icon name="information-outline" size={18} color={"white"} />;
  } else {
    return <Icon name="newspaper" size={18} color={"white"} />;
  }
};

export default class ProjectDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Project"
  });

  navigation = this.props.navigation;

  constructor(props) {
    super(props);

    this.state = {
      bookmarked: "bookmark",
      id: "",
      index: 0,
      like_count: this.props.navigation.getParam("like_count", ""),
      userId: null,

      followed: this.props.navigation.getParam("followed", ""),

      isModalVisible: false,
      tags: [],
      prevRoute: this.props.navigation.getParam("prevRoute", ""),
      routes: [
        { key: "detail", title: "Details" },
        { key: "news", title: "Nieuws" }
      ],
      project: {
        id: this.props.navigation.getParam("id", ""),
        name: this.props.navigation.getParam("name", ""),
        desc: this.props.navigation.getParam("desc", ""),
        start_date: this.props.navigation.getParam("start_date", ""),
        end_date: this.props.navigation.getParam("end_date", ""),
        created_at: this.props.navigation.getParam("created_at", ""),
        follower_count: this.props.navigation.getParam("follower_count", ""),
        like_count: this.props.navigation.getParam("like_count", ""),
        location: this.props.navigation.getParam("location", ""),
        thumbnail: this.props.navigation.getParam("thumbnail", ""),
        creator: this.props.navigation.getParam("creator", ""),
        images: this.props.navigation.getParam("images", ""),
        files: this.props.navigation.getParam("files", ""),
        liked: this.props.navigation.getParam("liked", ""),
        member: this.props.navigation.getParam("member", ""),
        followed: this.props.navigation.getParam("followed", "")
      },
      notiIcon: "bell-outline",
      canNotificate: false,
      canDelete: false
    };
    User.getUserId().then(userId => {
      this.setState({ userId: userId });
    });
    this.followHandler = this.followHandler.bind(this);
  }

  componentDidMount() {
    this.refreshProject();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBack.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBack.bind(this)
    );
  }

  handleBack() {
    Router.goBack(
      this.props.navigation,
      this.props.navigation.getParam("differentStack", false)
    );
    return true;
  }

  followHandler(followed) {
    this.setState({
      followed: followed
    });
  }

  refreshProject() {
    this.checkCanDelete()
    User.getUserId().then(userId => {
      ProjectApi.getProjectById(userId, this.state.project.id).then(result => {
        if (result["bool"]) {
          result["project"].thumbnail = Api.getFileUrl(
            result["project"].thumbnail
          );
          this.setState({
            project: result["project"]
          });
        }
      });
    });
  }

  setCanNotificate() {
    User.getUserId().then(id => {
      ProjectApi.setCanNotificate(
        !this.state.canNotificate,
        id,
        this.state.project.id
      ).then(res => {
        if (res["bool"]) {
          if (!this.state.canNotificate) {
            this.setState({ notiIcon: "bell-ring-outline" });
          } else {
            this.setState({ notiIcon: "bell-outline" });
          }
          this.setState({ canNotificate: !this.state.canNotificate });
        }
      });
    });
  }

  checkCanDelete() {
    User.getUserId().then(id => {
      if(this.state.project.creator.id == id) {
        this.setState({canDelete: true})
      }
    });
  }

  delete() {
    User.getUserId().then(id => {
      ProjectApi.deleteProjectById(id, this.state.project.id).then(res => {
        if(res['bool']) {
          if(res['deleted']) {
            Alert.alert("Project verwijdert", "Je project is succesvol verwijdert")
            Router.goBack(
              this.props.navigation,
              this.props.navigation.getParam("differentStack", false)
            );
          }
        }
      })
    })
  }

  triggerDelete() {
    Alert.alert(
      "Project verwijderen",
      "Je staat op het punt dit project te verwijderen",
      [ 
        {text: "Annuleer", onPress: () => {}},
        {text: "Ja, verwijder", onPress: () => this.delete(), style: 'cancel'}
      ],
      {cancelable: false}
    )
  }

  _renderItem({ item, index }) {
    type = mime.lookup(
      item
        .toString()
        .substring(item.toString().length - 3, item.toString().length)
    );
    return (
      <View style={{ height: "100%", width: "100%" }}>
        {!item.includes("videoThumbnail_") && (
          <Ripple
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "ProjectStack",
                "Imageviewer",
                {
                  url: Api.getFileUrl(item.substring(0, item.length)),
                  differentStack: this.props.navigation.getParam(
                    "differentStack",
                    false
                  )
                }
              )
            }
            rippleColor="#fff"
          >
            <CachedImage
              source={{ uri: Api.getFileUrl(item) }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </Ripple>
        )}
        {item.includes("videoThumbnail_") && (
          <Ripple
            onPress={() =>
              Router.goTo(
                this.props.navigation,
                "ProjectStack",
                "Videoplayer",
                {
                  url: Api.getFileUrl(item.substring(0, item.length - 4)),
                  differentStack: this.props.navigation.getParam(
                    "differentStack",
                    false
                  )
                }
              )
            }
            rippleColor="#fff"
          >
            <CachedImage
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
              source={{ uri: Api.getFileUrl(item) }}
            >
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 75,
                  width: 75,
                  borderRadius: 75
                }}
              >
                <Icon name="play" size={48} color={"white"} />
              </View>
            </CachedImage>
          </Ripple>
        )}
      </View>
    );
  }

  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      layout={{
        height: 44,
        width: Dimensions.get("window").width,
        measured: null
      }}
      renderIcon={props => getTabBarIcon(props)}
    />
  );

  renderScene = ({ route }) => {
    switch (route.key) {
      case "detail":
        return (
          <FirstRoute
            project={this.state}
            navigation={this.props.navigation}
            followHandler={this.followHandler}
          />
        );

      case "news":
        return (
          <SecondRoute
            project={this.state}
            navigation={this.props.navigation}
          />
        );
      default:
        return null;
    }
  };

  goBack() {
    if (
      this.state.prevRoute == "ProjectCreate" ||
      this.state.prevRoute == "ProjectEdit"
    ) {
      Router.popToTop(this.props.navigation);
    } else {
      Router.goBack(this.props.navigation);
    }
  }

  pickerCallback = message => {
    if (message && message.nativeEvent && message.nativeEvent.data) {
      console.log(message.nativeEvent.data); // response from ImageColorPicker
    }
  };

  async share() {
    try {
      const result = await Share.share({
        message: "https://delen.ina-app.nl/?id=" + this.state.project.id
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    let { width, height } = Dimensions.get("window");
    const sliderWidth = width;
    const itemWidth = width;

    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#00a6ff" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar
            backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
            barStyle="light-content"
          />
          <LinearGradient
            colors={["#00000099", "#00000000"]}
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              zIndex: 3,
              height: 65
            }}
          >
            {this.state.followed == true && (
              <Toolbar
                style={{
                  container: { backgroundColor: "transparent", elevation: 0 }
                }}
                iconSet="MaterialCommunityIcons"
                leftElement={"arrow-left"}
                rightElement={[this.state.notiIcon, "share-variant"]}
                onLeftElementPress={() => {
                  this.goBack();
                }}
                onRightElementPress={action => {
                  if (action.action == "share-variant") {
                    //share
                    this.share();
                  } else {
                    this.setCanNotificate();
                  }
                }}
              />
            )}
            {!this.state.followed && this.state.canDelete && (
              <Toolbar
                style={{
                  container: { backgroundColor: "transparent", elevation: 0 }
                }}
                iconSet="MaterialCommunityIcons"
                leftElement={"arrow-left"}
                rightElement={["delete", "share-variant"]}
                onLeftElementPress={() => {
                  Router.goBack(
                    this.props.navigation,
                    this.props.navigation.getParam("differentStack", false)
                  );
                }}
                onRightElementPress={action => {
                  if (action.action == "share-variant") {
                    //share
                    console.log("share");
                  } else {
                    this.triggerDelete();
                  }
                }}
              />
            )}
            {!this.state.followed && !this.state.canDelete && (
              <Toolbar
                style={{
                  container: { backgroundColor: "transparent", elevation: 0 }
                }}
                iconSet="MaterialCommunityIcons"
                leftElement={"arrow-left"}
                rightElement={"share-variant"}
                onLeftElementPress={() => {
                  Router.goBack(
                    this.props.navigation,
                    this.props.navigation.getParam("differentStack", false)
                  );
                }}
                onRightElementPress={() => {
                  this.share();

                }}
              />
            )}
          </LinearGradient>
          <ScrollView scrollEnabled={false}>
            <View style={styles.container}>
              <View style={styles.card}>
                <View
                  style={{
                    width: "100%",
                    height: (Dimensions.get("window").height - 90) * 0.35,
                    ...ifIphoneX({
                      height: (Dimensions.get("window").height - 150) * 0.3
                    })
                  }}
                >
                  <Carousel
                    ref={c => {
                      this._carousel = c;
                    }}
                    data={this.state.project.images}
                    renderItem={this._renderItem.bind(this)}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    autoplay={true}
                    autoplayInterval={6000}
                    loop={true}
                  />
                </View>

                <TabView
                  navigationState={this.state}
                  renderScene={this.renderScene}
                  onIndexChange={index => this.setState({ index })}
                  initialLayout={{
                    width: Dimensions.get("window").width,
                    height: 44
                  }}
                  renderTabBar={this._renderTabBar}
                  labelStyle={styles.label}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#00a6ff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: isIphoneX()
      ? Dimensions.get("window").height -
        (Header.HEIGHT + getStatusBarHeight() + 25)
      : Dimensions.get("window").height - getStatusBarHeight()
  },

  title: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#93D500",
    borderBottomRightRadius: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  scene: {
    flex: 1
  },
  tabbar: {
    backgroundColor: "#0085cc",
    height: 44
  },
  tab: {
    height: Platform.OS === "android" ? 40 : 50,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 2,
    flexDirection: "row"
  },
  indicator: {
    backgroundColor: "white"
  },
  label: {
    color: "white"
  },

  modalContainer: {}
});
