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
  Platform
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import mountain from "../assets/images/firewatch_5.jpg";
import line from "../assets/images/Line.png";
import Router from "../helpers/Router";
import ProjectApi from "../helpers/ProjectApi";
import ModalDropdown from "react-native-modal-dropdown";

export default class ProjectOverview extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };

    let response = ProjectApi.getAllProjects().then(result => {
      if (result["bool"]) {
        this.setState({
          data: result["projects"]
        });
        console.log(this.state.data);
      } else {
        alert(result["msg"]);
      }
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Projecten"
  });

  handelEnd = () => {};

  filter(idx) {
    switch (idx) {
      case "0":
        this.setState({ data: [] });
        let response0 = ProjectApi.newestProjects().then(result => {
          if (result["bool"]) {
            this.setState({
              data: result["projects"]
            });
            console.log(this.state.data);
          } else {
            alert(result["msg"]);
          }
        });
        break;
      case "1":
        this.setState({ data: [] });
        let response1 = ProjectApi.oldestProjects().then(result => {
          if (result["bool"]) {
            this.setState({
              data: result["projects"]
            });
            console.log(this.state.data);
          } else {
            alert(result["msg"]);
          }
        });
        break;
      case "2":
        this.setState({ data: [] });
        let response2 = ProjectApi.mostLikedProjects().then(result => {
          if (result["bool"]) {
            this.setState({
              data: result["projects"]
            });
            console.log(this.state.data);
          } else {
            alert(result["msg"]);
          }
        });
        break;
      case "3":
        this.setState({ data: [] });
        let response3 = ProjectApi.mostFollowedProjects().then(result => {
          if (result["bool"]) {
            this.setState({
              data: result["projects"]
            });
            console.log(this.state.data);
          } else {
            alert(result["msg"]);
          }
        });
        break;
      default:
        alert("selectie niet herkend");
    }
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
          </View>
          <View style={{ alignItems: "center" }}>
            <ModalDropdown
              options={["Nieuwste", "Oudste", "Meeste likes", "Meeste follows"]}
              defaultValue={"Sorteer"}
              renderSeparator={false}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownMenu}
              dropdownTextStyle={styles.dropdownOptionsList}
              dropdownTextHighlightStyle={styles.dropdownOptionsHighlight}
              onSelect={(idx, value) => this.filter(idx, value)}
            />
          </View>
          <View>
            <FlatList
              data={this.state.data}
              onEndReached={() => this.handelEnd()}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableHighlight
                  style={styles.cardContainer}
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "ProjectStack",
                      "ProjectDetailScreen",
                      {
                        id: item.id,
                        name: item.name,
                        url: item.url,
                        desc: item.desc,
                        start_date: item.start_date,
                        end_date: item.end_date,
                        created_at: item.created_at,
                        like_count: item.like_count,
                        follower_count: item.follower_count,
                        location: item.location
                      }
                    )
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.cardImage}>
                      <Image
                        source={{ uri: item.url }}
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
                </TouchableHighlight>
              )}
              keyExtractor={item => item.id}
            />
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
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  dropdown: {
    width: "93%",
    marginTop: "5%",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  dropdownText: {
    fontWeight: "bold",
    fontSize: 18
  },
  dropdownMenu: {
    width: "93%",
    alignItems: "center"
  },
  dropdownOptionsHighlight: {
    fontWeight: "bold",
    width: "93%"
  },
  dropdownOptionsList: {
    width: "93%"
  }
});
