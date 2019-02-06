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
import ProjectComponent from "../components/ProjectComponent";

export default class ProjectOverview extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      refreshing: false,
      loading: false,
      userId: null,
      user: []
    };
  }

  componentDidMount() {
    User.getUserId().then(id => {
      this.setState({ userId: id });
    });
    this.onLoad();
    this.props.navigation.addListener("willFocus", this.onLoad);
  }

  handelEnd = () => {};

  onLoad = () => {
    this.setState({ refreshing: true, loading: true });

    tagToFilter = this.props.navigation.getParam("tag", null);
    if (tagToFilter != null) {
      User.getUserId().then(id => {
        ProjectApi.getProjects(id, "tag", tagToFilter).then(res => {
          if (res["bool"]) {
            this.setState({ data: res["projects"] });
            this.props.navigation.setParams({ tag: null });
          }
          this.setState({ refreshing: false, loading: false });
        });
      });
    } else {
      User.getUserId().then(id => {
        ProjectApi.getProjects(id, "all").then(result => {
          if (result["bool"]) {
            this.setState({
              data: result["projects"]
            });
          }
          this.setState({ refreshing: false, loading: false });
        });
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
            {this.state.userId != null && (
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
            {this.state.userId == null && (
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
            {this.state.data.length > 0 &&
              !this.state.refreshing && (
                <FlatList
                  data={this.state.data}
                  onEndReached={() => this.handelEnd()}
                  numColumns={2}
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
                  renderItem={({ item, index }) => 
                    <ProjectComponent 
                      item={item} 
                      index={index} 
                      projects={this.state.data} 
                      dispatcher={this.props.navigation}
                      differentStack={false}
                    />
                  }
                />
              )}
            {this.state.data.length == 0 &&
              !this.state.loading && (
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
    marginBottom: 80,
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
