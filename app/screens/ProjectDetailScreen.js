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
  Share
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
      liked: false,
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
        like_count: this.props.navigation.getParam("like_count", ""),
        follower_count: this.props.navigation.getParam("follower_count", ""),
        location: this.props.navigation.getParam("location", ""),
        thumbnail: this.props.navigation.getParam("thumbnail", ""),
        creator: this.props.navigation.getParam("creator", ""),
        images: this.props.navigation.getParam("images", ""),
        files: this.props.navigation.getParam("files", "")
      }
    };
  }

  componentDidMount() {
    this.refreshProject();
  }

  refreshProject() {
    ProjectApi.getProjectById(this.state.project.id).then(result => {
      if (result["bool"]) {
        result["project"].thumbnail = Api.getFileUrl(
          result["project"].thumbnail
        );
        this.setState({
          project: result["project"]
        });
      }
    });
  }

  followProject(projectId, userId) {
    let like = ProjectApi.followProject(projectId, userId).then(result => {
      this.resetErrors();
      if (result["ntwFail"]) {
        //network error
      } else {
        if (result["bool"]) {
          this.setState({
            liked: true
          });
        }
      }
    });
  }

  likedProject() {
    User.getUserId().then(id => {
      ProjectApi.likeProject(this.state.project.id, id).then(res =>
        console.log(res)
      );
    });
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
              Router.goTo(this.props.navigation, "HomeStack", "Imageviewer", {
                url: Api.getFileUrl(item.substring(0, item.length))
              })
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
              Router.goTo(this.props.navigation, "HomeStack", "Videoplayer", {
                url: Api.getFileUrl(item.substring(0, item.length - 4))
              })
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
          <FirstRoute project={this.state} navigation={this.props.navigation} />
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
      console.log("KOMT VAN EDIT OF CREATE");
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
            <Toolbar
              style={{
                container: { backgroundColor: "transparent", elevation: 0 }
              }}
              iconSet="MaterialCommunityIcons"
              leftElement={"arrow-left"}
              rightElement={["bell-outline", "share-variant"]}
              onLeftElementPress={() => {
                Router.goBack(this.props.navigation);
              }}
            />
          </LinearGradient>
          <ScrollView scrollEnabled={false}>
            <View style={styles.container}>
              <View style={styles.card}>
                <View
                  style={{
                    width: "100%",
                    height: (Dimensions.get("window").height - 90) * 0.25,
                    ...ifIphoneX({
                      height: (Dimensions.get("window").height - 150) * 0.2
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
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 25,
                    flexDirection: "column",
                    backgroundColor: "#00a6ff",
                    width: Dimensions.get("window").width
                  }}
                >
                  <Text
                    style={{ fontSize: 22, color: "white", paddingBottom: 10 }}
                  >
                    {this.state.project.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingBottom: 10
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Icon
                          name="heart-outline"
                          color="white"
                          size={15}
                          style={{ marginRight: 5 }}
                        />
                        <Text style={{ color: "white" }}>
                          {this.state.project.like_count} likes
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Icon
                          name="account-outline"
                          color="white"
                          size={15}
                          style={{ marginRight: 5, marginLeft: 15 }}
                        />
                        <Text style={{ color: "white" }}>
                          {this.state.project.follower_count} volgers
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {this.state.project.creator.profilePhotoPath != "" && (
                      <CachedImage
                        source={{
                          uri: Api.getFileUrl(
                            this.state.project.creator.profilePhotoPath
                          )
                        }}
                        resizeMode="cover"
                        style={{
                          marginRight: 10,
                          width: 30,
                          height: 30,
                          borderRadius: 100,
                          backgroundColor: "white"
                        }}
                        imageStyle={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 200
                        }}
                      />
                    )}
                    {this.state.project.creator.profilePhotoPath == "" && (
                      <Icon
                        name="account-circle"
                        size={35}
                        style={{
                          marginRight: 10
                        }}
                      />
                    )}
                    <View style={{ flexDirection: "column" }}>
                      <Text style={{ fontSize: 18, color: "white" }}>
                        {this.state.project.creator.firstName +
                          " " +
                          this.state.project.creator.lastName}
                      </Text>

                      <View />
                    </View>
                  </View>
                  <View style={{ position: "absolute", bottom: 25, right: 15 }}>
                    {this.state.userId == this.state.project.creator.id && (
                      <Icon
                        name="square-edit-outline"
                        size={36}
                        onPress={() => {
                          Router.goTo(
                            this.props.navigation,
                            "ProjectStack",
                            "ProjectEditFirstScreen",
                            {
                              id: this.state.project.id,
                              name: this.state.project.name,
                              desc: this.state.project.desc,
                              start_date: this.state.project.start_date,
                              end_date: this.state.project.end_date,
                              location: this.state.project.location,
                              thumbnail: this.state.project.thumbnail,
                              images: this.state.project.images,
                              files: this.state.project.files,
                              tags: this.state.tags
                            }
                          );
                        }}
                      />
                    )}
                    {this.state.userId != this.state.project.creator.id && (
                      <Ripple
                        style={{
                          backgroundColor: "white",
                          borderRadius: 100,
                          height: 30,
                          width: 70,
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          flexDirection: "row"
                        }}
                        rippleColor="#fff"
                        onPress={() => this.likedProject()}
                      >
                        {this.state.liked && (
                          <Icon name="heart" size={24} color={"red"} />
                        )}
                        {!this.state.liked && (
                          <Icon name="heart-outline" size={24} color={"red"} />
                        )}
                        <Text>Like{this.state.liked ? "d" : ""}</Text>
                      </Ripple>
                    )}
                  </View>
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
