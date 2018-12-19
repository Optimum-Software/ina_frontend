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
import {Toolbar} from "react-native-material-ui";
import line from "../assets/images/Line.png";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";

export default class ProjectDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Project"
  });

  constructor() {
    super();
    this.state = {
      bookmarked: "bookmark",
      id: '',
      liked: false,
    };
  }


  likedProject(projectId) {
    User.getUserId().then(userId => {
    let like = ProjectApi.likeProject(projectId,userId).then(result => {
      console.log("Hij doet het ");
      this.resetErrors();
      if (result["ntwFail"]) {
        //network error
        alert(result["msg"]);
      } else {
        if (result["bool"]) {
          alert("liked")
          this.setState({
            liked: true
          });
        }
      }
    });
    });
  }

  render() {
    const {navigation} = this.props;

    const id = navigation.getParam("id", "")
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
     backgroundColor="#00a6ff"
     barStyle="light-content"
   />
      <ScrollView>
        <View style={{ height: Header.HEIGHT }}>
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
        </View>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image
              source={{uri: url}}
              resizeMode="cover"
              style={{width: "100%", height: 200}}
            />
            <Image
              source={line}
              resizeMode="stretch"
              style={{width: "100%", height: "2%"}}
            />
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text>{desc}</Text>
            </View>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.likedProject(id)
                }
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  like
                </Text>
              </TouchableHighlight>
            </View>
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
    backgroundColor: '#fff',
    alignItems: "center",
    height: Dimensions.get("window").height - 105
  },

  cardContainer: {
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: "#F1F1F1",
    // margin: 10,
    width: "100%",
    height: '100%',
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
});
