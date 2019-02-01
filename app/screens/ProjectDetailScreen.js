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
    return <Icon name="information-outline" size={18} color={"black"} />;
  } else {
    return <Icon name="newspaper" size={18} color={"black"} />;
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

  likedProject(projectId, userId) {
    let like = ProjectApi.likeProject(projectId, userId).then(result => {
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
          <Toolbar
            centerElement={this.state.project.name}
            iconSet="MaterialCommunityIcons"
            leftElement={"arrow-left"}
            rightElement="share-variant"
            onRightElementPress={() => {
              Share.share({
                message:
                  '"' +
                  this.state.project.name +
                  '", bekijk meer in de app: https://app.ina-app.nl/?id=' +
                  this.state.project.id
              });
            }}
            onLeftElementPress={() => {
              this.goBack();
            }}
          />
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
                <Image
                  source={line}
                  resizeMode="stretch"
                  style={{ width: "100%", height: 2 }}
                />
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
      : Dimensions.get("window").height - (Header.HEIGHT + getStatusBarHeight())
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
    backgroundColor: "#dee5e8",
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
    backgroundColor: "#00a6ff"
  },
  label: {
    color: "black"
  },

  modalContainer: {}
});
