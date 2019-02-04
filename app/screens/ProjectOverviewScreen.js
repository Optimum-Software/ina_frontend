import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import line from "../assets/images/line3.png";
import Router from "../helpers/Router";
import User from "../helpers/User";
import ProjectApi from "../helpers/ProjectApi";
import Api from "../helpers/Api";
import { CachedImage } from "react-native-cached-image";
import Ripple from "react-native-material-ripple";
import { Icon } from "react-native-elements";
import { ifIphoneX, isIphoneX } from "react-native-iphone-x-helper";

export default class ProjectOverview extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      refreshing: false,
      loading: false,
      loggedIn: false
    };

    ProjectApi.getAllProjects().then(result => {
      if (result["bool"]) {
        this.setState({
          data: result["projects"]
        });
      }
    });
  }

  componentDidMount() {
    this.onLoad();
    this.props.navigation.addListener("willFocus", this.onLoad);
  }

  handelEnd = () => {};

  onLoad = () => {
    this.setState({ refreshing: true, loading: true });

    User.getUserId().then(id => {
      if (id != null) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
      this.setState({ refreshing: false, loading: false });
    });

    tagToFilter = this.props.navigation.getParam("tag", null);
    if (tagToFilter != null) {
      ProjectApi.getProjectByTag(tagToFilter).then(res => {
        if (res["bool"]) {
          this.setState({ data: res["projects"] });
          this.props.navigation.setParams({ tag: null });
        }
        this.setState({ refreshing: false, loading: false });
      });
    } else {
      ProjectApi.getAllProjects().then(result => {
        if (result["bool"]) {
          this.setState({
            data: result["projects"]
          });
        }
        this.setState({ refreshing: false, loading: false });
      });
    }
  };

  onRefresh() {
    this.onLoad();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: Header.HEIGHT }}>
            {this.state.loggedIn && (
              <Toolbar
                centerElement="Projecten"
                iconSet="MaterialCommunityIcons"
                leftElement={"menu"}
                onLeftElementPress={() => {
                  this.props.navigation.openDrawer();
                }}
                rightElement={"plus"}
                onRightElementPress={() => {
                  Router.goTo(
                    this.props.navigation,
                    "ProjectStack",
                    "ProjectCreateFirstScreen",
                    {}
                  );
                }}
              />
            )}
            {!this.state.loggedIn && (
              <Toolbar
                centerElement="Projecten"
                iconSet="MaterialCommunityIcons"
                leftElement={"menu"}
                onLeftElementPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            )}
          </View>
          <View>
            {this.state.data.length > 0 && !this.state.refreshing && (
              <FlatList
                data={this.state.data}
                onEndReached={() => this.handelEnd()}
                numColumns={2}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
                renderItem={({ item, index }) => {
                  return (
                    <Ripple
                      rippleColor="#FFF"
                      style={styles.cardContainer}
                      key={item.id}
                      onPress={() =>
                        Router.goTo(
                          this.props.navigation,
                          "ProjectStack",
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
                      {index != this.state.data.length - 1 && (
                        //not last card
                        <View style={styles.card}>
                          <View style={styles.cardImage}>
                            <CachedImage
                              source={{ uri: Api.getFileUrl(item.thumbnail) }}
                              resizeMode="cover"
                              style={styles.image}
                            />
                          </View>
                          <Image
                            source={line}
                            resizeMode="stretch"
                            style={{ width: "100%", height: "2%" }}
                          />
                          <Text numberOfLines={2} style={styles.cardTitle}>
                            {item.name}
                          </Text>
                        </View>
                      )}
                      {index == this.state.data.length - 1 &&
                        (index + 1) % 2 == 0 && (
                          //last card but even index
                          <View style={styles.card}>
                            <View style={styles.cardImage}>
                              <CachedImage
                                source={{
                                  uri: Api.getFileUrl(item.thumbnail)
                                }}
                                resizeMode="cover"
                                style={styles.image}
                              />
                            </View>
                            <Image
                              source={line}
                              resizeMode="stretch"
                              style={{ width: "100%", height: "2%" }}
                            />
                            <Text numberOfLines={2} style={styles.cardTitle}>
                              {item.name}
                            </Text>
                          </View>
                        )}
                      {index == this.state.data.length - 1 &&
                        (index + 1) % 2 != 0 && (
                          //last card but uneven index
                          <View style={styles.cardUneven}>
                            <View style={styles.cardImage}>
                              <CachedImage
                                source={{
                                  uri: Api.getFileUrl(item.thumbnail)
                                }}
                                resizeMode="cover"
                                style={styles.image}
                              />
                            </View>
                            <Image
                              source={line}
                              resizeMode="stretch"
                              style={{ width: "100%", height: "2%" }}
                            />
                            <Text numberOfLines={2} style={styles.cardTitle}>
                              {item.name}
                            </Text>
                          </View>
                        )}
                    </Ripple>
                  );
                }}
              />
            )}
            {this.state.data.length == 0 && !this.state.loading && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Er zijn geen projecten gevonden
                </Text>
                <Ripple
                  rippleColor="#00a6ff"
                  style={styles.refreshButton}
                  onPress={() => this.onRefresh()}
                >
                  <Icon
                    name="refresh"
                    type="font-awesome"
                    size={25}
                    color="#FFF"
                  />
                </Ripple>
              </View>
            )}
            {this.state.loading && (
              <View
                style={{
                  height: "92.5%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ActivityIndicator size="large" color="#00A6FF" />
              </View>
            )}
          </View>
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
    backgroundColor: "#ffffff"
  },

  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
    marginBottom: Dimensions.get("window").width * 0.2,
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

  cardImage: {
    height: "70%",
    width: "100%"
  },
  cardTitle: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a6572"
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },

  emptyBox: {
    alignItems: "center",
    marginTop: "25%"
  },

  emptyText: {
    color: "#4a6572",
    fontSize: 24,
    fontWeight: "bold"
  },

  refreshButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "#009ef2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
});
