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
import line from "../assets/images/Line.png";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";
import Carousel from "react-native-snap-carousel";
import DetailTab from "./DetailTab";
import NewsTab from "./NewsTab";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../helpers/Api";

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
      entries: [
        {
          title: "Beautiful and dramatic Antelope Canyon",
          subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
          illustration:
            "https://cdn1.bloovi.be/frontend/files/blog/images/826x452/65-procent-van-kinderen-die-vandaag-naar-school-trekken-zullen-job-hebben-die-nog-niet-bestaat-en-dat-is-een-probleem.jpg"
        },
        {
          title: "Earlier this morning, NYC",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration:
            "https://www.frankwatching.com/app/uploads/2014/01/Trendrapport_5_Datagedreven-Onderwijs_lr.jpg"
        },
        {
          title: "White Pocket Sunset",
          subtitle: "Lorem ipsum dolor sit amet et nuncat ",
          illustration:
            "http://www.ajournals.com/wp-content/uploads/2015/05/Biology.jpg"
        },
        {
          title: "Acrocorinth, Greece",
          subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
          illustration:
            "https://www.altushost.com/wp-content/uploads/2016/07/image05.jpg"
        },
        {
          title: "The lone tree, majestic landscape of New Zealand",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration:
            "https://file.mockplus.com/image/2016/05/207cd074-b336-43bc-a42d-346e397baf81.jpg"
        }
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
        creator: this.props.navigation.getParam("creator", "")
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

  tags(id) {
    let response = ProjectApi.getAllTags(id).then(result => {
      if (result["bool"]) {
        this.setState({
          tags: result["tags"]
        });
      } else {
        alert(result["msg"]);
      }
    });
    const tagItems = this.state.tags.map(tag => <Text>{tag.name}</Text>);
    return tagItems;
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item.illustration }}
          resizeMode="cover"
          style={{ width: "100%", height: 200 }}
        />
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
        return <FirstRoute project={this.state.project} navigation={this.props.navigation}/>;
      case "news":
        return <SecondRoute project={this.state.project} navigation={this.props.navigation}/>;
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
        <Toolbar
          centerElement="Project informatie"
          iconSet="MaterialCommunityIcons"
          leftElement={"arrow-left"}
          rightElement="share-variant"
          onLeftElementPress={() => {
            Router.goBack(this.props.navigation);
          }}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={{ width: "100%", height: 200 }}>
                <Carousel
                  ref={c => {
                    this._carousel = c;
                  }}
                  data={this.state.entries}
                  renderItem={this._renderItem}
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
                  initialLayout={{ width: Dimensions.get("window").width }}
                  renderTabBar={this._renderTabBar}
                  labelStyle={styles.label}
                />
            </View>
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
    height: Dimensions.get("window").height - 80
  },

  cardContainer: {
    flex: 1,
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
    height: 44
  },
  tab: {
    height: 40,
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
