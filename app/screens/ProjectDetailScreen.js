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
  StatusBar
} from "react-native";
import { Header } from "react-navigation";
import Router from "../helpers/Router";
import { Toolbar } from "react-native-material-ui";
import line from "../assets/images/Line.png";

export default class ProjectDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Project"
  });
  constructor() {
    super();
    this.state = { bookmarked: "bookmark" };
  }
  render() {
    const { navigation } = this.props;

    const name = navigation.getParam("name", "");
    const url = navigation.getParam("url", "");
    const desc = navigation.getParam("desc", "");
    const start_date = navigation.getParam("start_date", "");
    const end_date = navigation.getParam("end_date", "");
    const created_at = navigation.getParam("created_at", "");
    const like_count = navigation.getParam("like_count", "");
    const follower_count = navigation.getParam("follower_count", "");
    const location = navigation.getParam("location", "");

    return (
      <SafeAreaView style={styles.safeArea}>
      <StatusBar
     backgroundColor="blue"
     barStyle="light-content"
   />
      <ScrollView>
          <Toolbar
            leftElement={"chevron-left"}
            onLeftElementPress={() => Router.goBack(this.props.navigation)}
            centerElement="Project informatie"
            rightElement={this.state.bookmarked}
            onRightElementPress={() => {
              if (this.state.bookmarked == "bookmark") {
                this.setState({ bookmarked: "markunread" });
              } else {
                this.setState({ bookmarked: "bookmark" });
              }
            }}
          />
        <View style={styles.container}>
          <Image
            source={{ uri: url }}
            resizeMode="cover"
            style={{ width: "100%", height: 200 }}
          />
          <Image
            source={line}
            resizeMode="stretch"
            style={{ width: "100%", height: "2%" }}
          />
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text>{desc}</Text>
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
    backgroundColor: '#00a6ff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
        backgroundColor: '#fff'
  },
  cardContainer: {
    flex: 1,
    margin: 10
  },
  card: {
    backgroundColor: "#F1F1F1",
    margin: 10,
    width: "100%",
    height: 180,
    marginBottom: 10,
    elevation: 3
  },

  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  image: {
    height: "50%",
    width: "100%"
  },
  title: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold"
  }
});
