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
  Platform
} from "react-native";
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

  followProject(projectId, userId) {
    let like = ProjectApi.followProject(projectId, userId).then(result => {
      this.resetErrors();
      if (result["ntwFail"]) {
        //network error
        alert(result["msg"]);
      } else {
        if (result["bool"]) {
          alert("liked");
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
        alert(result["msg"]);
      } else {
        if (result["bool"]) {
          alert("liked");
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
      <View style={styles.slide}>
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
              style={{ width: "100%", height: 200 }}
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

  render() {
    let { width, height } = Dimensions.get("window");
    const sliderWidth = width;
    const itemWidth = width;

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <ScrollView>
        <View style={styles.container}>
          <Toolbar
            style={{ container: { backgroundColor: "#00a6ff", elevation: 0 } }}
            leftElement={"arrow-back"}
            rightElement={'share'}
            onLeftElementPress={() => {
              this.props.navigation.openDrawer();
            }}
          />

          <ImageBackground
            style={{ height: 100, width: "100%", alignItems: "center" }}
            source={require("../assets/images/bluewavebgRev.png")}
            resizeMode="stretch"
          >
          <View
            style={{
              backgroundColor: "white",
              elevation: 2,
              justifyContent: "center",
              paddingLeft: Dimensions.get("window").width * 0.05,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              zIndex: -1,

              height: Dimensions.get("window").height * 0.15,
              width: Dimensions.get("window").width * 0.9
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Image
                source={{
                  uri: Api.getFileUrl(
                    this.state.project.creator.profilePhotoPath
                  )
                }}
                resizeMode="cover"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  backgroundColor: "white"
                }}
                imageStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 200
                }}
              />
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 18, fontFamily: "Montserrat-Bold", }}>
                  {this.state.project.name}
                </Text >
                <Text style={{fontFamily: "Montserrat-Medium"}}>
                  {this.state.project.creator.firstName +
                    " " +
                    this.state.project.creator.lastName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 5
                  }}
                >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="heart-outline" size={16} color={"dark-gray"} />
                <Text style={{fontFamily: "Montserrat-Regular", paddingLeft: 5}}>51</Text>
                </View>
                <View style={{paddingLeft: 10,flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="bookmark-outline" size={16} color={"dark-gray"} />
                <Text style={{fontFamily: "Montserrat-Regular", paddingLeft: 5}}>14</Text>
                </View>

                </View>
              </View>
            </View>
            <View style={{height: 10, alignItems: 'flex-start', width: Dimensions.get("window").width * 0.9, backgroundColor: 'white', zIndex: 10, position: 'absolute',
            top: Dimensions.get("window").height * 0.15}}>
            <View
              style={{
                height: 1,
                opacity: 0.3,
                backgroundColor: "#b5babf",
                width: "85%",
                alignSelf: "center"
              }}
            />
            </View>
          </View>

          </ImageBackground>


          <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get("window").width }}
                renderTabBar={this._renderTabBar}
                labelStyle={styles.label}
              />

        </View>
        </ScrollView>
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
    backgroundColor: "#fff",
    alignItems: "center",
    height: Dimensions.get("window").height
  },

  cardContainer: {
    flex: 1
  },
  card: {
    backgroundColor: "#F1F1F1",
    // margin: 10,
    width: "100%",
    height: "100%",
    elevation: 3
  },

  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  image2: {
    height: "50%",
    width: "100%"
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
    height: 44,
    marginTop: 8,
    marginLeft: Dimensions.get("window").width * 0.05,
    marginRight: Dimensions.get("window").width * 0.05,
    zIndex: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  tab: {
    height: 45,
    width: Dimensions.get("window").width * 0.45,
    flexDirection: "row"
  },
  indicator: {
    borderRadius: 5,
    backgroundColor: "#00a6ff"
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    color: "black"
  },

  modalContainer: {}
});
