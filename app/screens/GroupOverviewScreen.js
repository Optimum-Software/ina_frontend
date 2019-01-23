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
import line from "../assets/images/Line.png";
import Router from "../helpers/Router";
import GroupApi from "../helpers/GroupApi";
import User from "../helpers/User";

export default class GroupOverview extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      refreshing: false,
      myGroups: [],
      allGroups: []
    };
    this.getGroups();
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Groepen"
  });

  handelEnd = () => {};

  getGroups() {
    User.getUserId().then(id => {
      console.log("ID = " + id);
      GroupApi.getMyGroups(id).then(result => {
        console.log(result);
        if (result["bool"]) {
          this.setState({
            myGroups: result["groups"]
          });
        } else {
          alert(result["msg"]);
        }
      });
    });

    GroupApi.getAllGroups().then(result => {
      console.log(result);
      if (result["bool"]) {
        this.setState({
          allGroups: result["groups"],
          loading: false
        });
      } else {
        alert(result["msg"]);
      }
    });
  }

  refreshList() {
    this.setState({ refreshing: true });
    this.getGroups();
    this.setState({ refreshing: false });
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
            <Toolbar
              centerElement="Groepen"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>
          {!this.state.loading && (
            <View>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.title}>Mijn groepen</Text>
                  <Text
                    style={styles.textLink}
                    onPress={() => {
                      Router.goTo(
                        this.props.navigation,
                        "GroupStack",
                        "GroupCreate",
                        {}
                      );
                    }}
                  >
                    + Nieuwe groep
                  </Text>
                </View>
                <FlatList
                  data={this.state.myGroups}
                  onEndReached={() => this.handelEnd()}
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.refreshList()}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <TouchableHighlight
                      key={item.id}
                      style={styles.cardContainer}
                      onPress={() =>
                        Router.goTo(
                          this.props.navigation,
                          "GroupStack",
                          "GroupHomeScreen",
                          {
                            id: item.id,
                            name: item.name,
                            desc: item.desc,
                            photo_path: item.photo_path,
                            created_at: item.created_at,
                            member_count: item.member_count,
                            public: item.public,
                            member: true
                          }
                        )
                      }
                    >
                      <View style={styles.card}>
                        <View style={styles.cardImage}>
                          <Image
                            source={{ uri: item.photo_path }}
                            resizeMode="cover"
                            style={{ width: "100%", height: "100%" }}
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
                    </TouchableHighlight>
                  )}
                />
              </View>
              <View>
                <Text style={styles.title}>Alle groepen</Text>
                <FlatList
                  data={this.state.allGroups}
                  onEndReached={() => this.handelEnd()}
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.refreshList()}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <TouchableHighlight
                      key={item.id}
                      style={styles.cardContainer}
                      onPress={() =>
                        Router.goTo(
                          this.props.navigation,
                          "GroupStack",
                          "GroupHomeScreen",
                          {
                            id: item.id,
                            name: item.name,
                            desc: item.desc,
                            photo_path: item.photo_path,
                            created_at: item.created_at,
                            member_count: item.member_count,
                            public: item.public,
                            member: false
                          }
                        )
                      }
                    >
                      <View style={styles.card}>
                        <View style={styles.cardImage}>
                          <Image
                            source={{ uri: item.photo_path }}
                            resizeMode="cover"
                            style={{ width: "100%", height: "100%" }}
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
                    </TouchableHighlight>
                  )}
                />
              </View>
            </View>
          )}
          {this.state.loading && (
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%"
              }}
            >
              <ActivityIndicator size="large" color="#00A6FF" />
            </View>
          )}
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
    margin: 5
  },
  card: {
    backgroundColor: "#F1F1F1",
    width: 200,
    height: 200,
    marginBottom: 10,
    elevation: 3
  },

  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  cardImage: {
    height: "70%",
    width: "100%"
  },
  cardTitle: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  textLink: {
    fontSize: 15
  }
});
