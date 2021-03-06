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
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import line from "../assets/images/line3.png";
import Router from "../helpers/Router";
import ProjectApi from "../helpers/ProjectApi";
import Api from "../helpers/Api";
import User from "../helpers/User";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { CachedImage } from "react-native-cached-image";
import Ripple from "react-native-material-ripple";
import { Icon } from "react-native-elements";
import ProjectComponent from "../components/ProjectComponent";

export default class SavedProjects extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: "membered", title: "Deelnemend" },
        { key: "followed", title: "Gevolgd" },
        { key: "liked", title: "Geliked" }
      ],
      memberedProjects: [],
      followedProjects: [],
      likedProjects: [],
      loading: true,
      refreshingMembered: false,
      refreshingFollowed: false,
      refreshingLiked: false
    };
  }

  componentDidMount() {
    User.getUserId().then(userId => {
      ProjectApi.getProjects(userId, "user_followed").then(res => {
        if (res["bool"]) {
          this.setState({ followedProjects: res["projects"] });
        } else {
          alert(res["msg"]);
        }
      });
      ProjectApi.getProjects(userId, "user_member").then(res => {
        if (res["bool"]) {
          this.setState({ memberedProjects: res["projects"] });
        } else {
          alert(res["msg"]);
        }
      });
      ProjectApi.getProjects(userId, "user_liked").then(res => {
        if (res["bool"]) {
          this.setState({ likedProjects: res["projects"] });
        } else {
          alert(res["msg"]);
        }
      });
      this.setState({ loading: false });
    });
  }

  handelEnd = () => {};

  onRefreshMembered() {
    this.setState({ loading: true });
    User.getUserId().then(userId => {
      ProjectApi.getProjects(userId, "user_member").then(res => {
        if (res["bool"]) {
          this.setState({ memberedProjects: res["projects"] });
        } else {
          alert(res["msg"]);
        }
      });
      this.setState({ loading: false });
    });
  }

  onRefreshFollowed() {
    this.setState({ loading: true });
    User.getUserId().then(userId => {
      ProjectApi.getProjects(userId, "user_followed").then(res => {
        if (res["bool"]) {
          this.setState({ followedProjects: res["projects"] });
        } else {
          alert(res["msg"]);
        }
      });
      this.setState({ loading: false });
    });
  }

  onRefreshLiked() {
    this.setState({ loading: true });
    User.getUserId().then(userId => {
      ProjectApi.getProjects(userId, "user_liked").then(res => {
        if (res["bool"]) {
          this.setState({ likedProjects: res["projects"] });
        } else {
          alert(res["msg"]);
        }
      });
      this.setState({ loading: false });
    });
  }

  render() {
    const membersRoute = () => {
      return (
        <View>
          {this.state.memberedProjects.length > 0 &&
            !this.state.loading && (
              <FlatList
                data={this.state.memberedProjects}
                onEndReached={() => this.handelEnd()}
                refreshing={this.state.refreshingMembered}
                onRefresh={() => this.onRefreshMembered()}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <ProjectComponent
                    item={item}
                    index={index}
                    projects={this.state.memberedProjects}
                    dispatcher={this.props.navigation}
                    differentStack={true}
                  />
                )}
              />
            )}
          {this.state.memberedProjects.length == 0 &&
            !this.state.loading && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Er zijn geen projecten gevonden waar jij aan deelneemt
                </Text>
                <Ripple
                  rippleColor="#00a6ff"
                  style={styles.refreshButton}
                  onPress={() => this.onRefreshMembered()}
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
      );
    };

    const followedRoute = () => {
      return (
        <View>
          {this.state.followedProjects.length > 0 &&
            !this.state.loading && (
              <FlatList
                data={this.state.followedProjects}
                onEndReached={() => this.handelEnd()}
                refreshing={this.state.refreshingFollowed}
                onRefresh={() => this.onRefreshFollowed()}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <ProjectComponent
                    item={item}
                    index={index}
                    projects={this.state.followedProjects}
                    dispatcher={this.props.navigation}
                    differentStack={true}
                  />
                )}
              />
            )}
          {this.state.followedProjects.length == 0 &&
            !this.state.loading && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Er zijn geen projecten gevonden die jij volgt
                </Text>
                <Ripple
                  rippleColor="#00a6ff"
                  style={styles.refreshButton}
                  onPress={() => this.onRefreshFollowed()}
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
      );
    };

    const likedRoute = () => {
      return (
        <View>
          {this.state.likedProjects.length > 0 &&
            !this.state.loading && (
              <FlatList
                data={this.state.likedProjects}
                onEndReached={() => this.handelEnd()}
                refreshing={this.state.refreshingLiked}
                onRefresh={() => this.onRefreshLiked()}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <ProjectComponent
                    item={item}
                    index={index}
                    projects={this.state.likedProjects}
                    dispatcher={this.props.navigation}
                    differentStack={true}
                  />
                )}
              />
            )}
          {this.state.likedProjects.length == 0 &&
            !this.state.loading && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Er zijn geen projecten gevonden die jij leuk vindt
                </Text>
                <Ripple
                  rippleColor="#00a6ff"
                  style={styles.refreshButton}
                  onPress={() => this.onRefreshLiked()}
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
      );
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={{ height: Header.HEIGHT }}>
          <Toolbar
            centerElement="Mijn projecten"
            iconSet="MaterialCommunityIcons"
            leftElement={"arrow-left"}
            onLeftElementPress={() => {
              Router.goBack(this.props.navigation);
            }}
          />
        </View>
        <TabView
          navigationState={this.state}
          indicatorStyle={{ backgroundColor: "grey" }}
          tabStyle={{ backgroundColor: "white" }}
          renderScene={SceneMap({
            membered: membersRoute,
            followed: followedRoute,
            liked: likedRoute
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={styles.tabbar}
              indicatorStyle={styles.indicator}
              labelStyle={{ color: "#FFF" }}
            />
          )}
          onIndexChange={index => this.setState({ index })}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },

  card: {
    backgroundColor: "#F1F1F1",
    margin: 10,
    width: "100%",
    height: 180,
    marginBottom: 10,
    elevation: 3,
    borderRadius: 4
  },

  cardImage: {
    height: "70%",
    width: "100%"
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },

  tabbar: {
    backgroundColor: "#009EF2"
  },

  indicator: {
    backgroundColor: "#00a6ff"
  },

  emptyBox: {
    alignItems: "center",
    marginTop: "25%",
    paddingHorizontal: "5%"
  },

  emptyText: {
    color: "#4a6572",
    width: "95%",
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
