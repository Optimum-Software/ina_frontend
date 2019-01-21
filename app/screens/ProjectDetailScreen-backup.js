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
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { NavigationActions, Header } from "react-navigation";
import Router from "../helpers/Router";
import { Toolbar } from "react-native-material-ui";
import line from "../assets/images/Line.png";
import ProjectApi from "../helpers/ProjectApi";
import Api from "../helpers/Api";
import User from "../helpers/User";

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarked: "bookmark",
      liked: false,
      member: false,
      isModalVisible: false,
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
      },
      tags: [],
      projectMembers: []
    };
  }

  componentDidMount() {
    this.updateProjectInfo();
    User.getUserId().then(id => {
      console.log("PRINTSSSSSSS");
      console.log(id);
      console.log(this.state.project.id);
      ProjectApi.checkIfMember(id, this.state.project.id).then(result => {
        if (result["bool"]) {
          this.setState({ member: true });
        } else {
          this.setState({ member: false });
        }
      });
    });
  }

  followProject(projectId, userId) {
    let like = ProjectApi.followProject(projectId, userId).then(result => {
      console.log("Hij doet het ");
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
      console.log("Hij doet het ");
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
      console.log("hallllloooooo");
      if (result["bool"]) {
        this.setState({
          tags: result["tags"]
        });
        console.log(this.state.tags);
      } else {
        alert(result["msg"]);
      }
    });
    const tagItems = this.state.tags.map(tag => <Text>{tag.name}</Text>);
    return tagItems;
  }

  joinProject() {
    User.getUserId().then(id => {
      ProjectApi.joinProject(id, this.state.project.id).then(result => {
        if (result["bool"]) {
          this.setState({ member: true });
          this.updateProjectInfo();
          alert("Je neemt nu deel aan dit project");
        } else {
          alert(result["msg"]);
        }
      });
    });
  }

  leaveProject() {
    User.getUserId().then(id => {
      ProjectApi.leaveProject(id, this.state.project.id).then(result => {
        if (result["bool"]) {
          alert("Je neemt niet langer deel aan dit project");
          this.setState({ member: false });
          this.updateProjectInfo();
        } else {
          alert(result["msg"]);
        }
      });
    });
  }

  updateProjectInfo() {
    ProjectApi.getProjectById(this.state.project.id).then(result => {
      if (result["bool"]) {
        this.setState({
          project: result["project"]
        });
      } else {
        alert("Kon project niet updaten");
      }
    });
    ProjectApi.getProjectMembersById(this.state.project.id).then(result => {
      if (result["bool"]) {
        this.setState({
          projectMembers: result["members"]
        });
        console.log(this.state.projectMembers);
      } else {
        alert("Er zijn geen deelnemers aan dit project");
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
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
                source={{ uri: Api.getFileUrl(this.state.project.thumbnail) }}
                resizeMode="cover"
                style={{ width: "100%", height: 200 }}
              />
              <Image
                source={line}
                resizeMode="stretch"
                style={{ width: "100%", height: "2%" }}
              />
              <View>
                <Text style={styles.title}>{this.state.project.name}</Text>
                <Text>{this.state.desc}</Text>
              </View>
              <View>
                <TouchableHighlight
                  onPress={() => {
                    User.getUserId().then(userId => {
                      if (userId != null) {
                        this.likedProject(this.state.project.id, userId);
                      } else {
                        Router.goTo(
                          this.props.navigation,
                          "LoginStack",
                          "LoginScreen",
                          null
                        );
                      }
                    });
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>like</Text>
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight
                  onPress={() => {
                    User.getUserId().then(userId => {
                      if (userId != null) {
                        this.followProject(this.state.project.id, userId);
                      } else {
                        Router.goTo(
                          this.props.navigation,
                          "LoginStack",
                          "LoginScreen",
                          null
                        );
                      }
                    });
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>follow</Text>
                </TouchableHighlight>
              </View>
              <View>
                {this.state.member == false && (
                  <TouchableHighlight
                    style={styles.joinButton}
                    onPress={() => this.joinProject()}
                  >
                    <Text style={{ fontSize: 18, color: "#fff" }}>
                      Word lid
                    </Text>
                  </TouchableHighlight>
                )}
                {this.state.member == true && (
                  <TouchableHighlight
                    style={styles.leaveButton}
                    onPress={() => this.leaveProject()}
                  >
                    <Text style={{ fontSize: 18, color: "#fff" }}>
                      Verlaat groep
                    </Text>
                  </TouchableHighlight>
                )}
                <TouchableOpacity
                  style={styles.personList}
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "ProjectStack",
                      "ProjectMembersScreen",
                      { persons: this.state.projectMembers }
                    )
                  }
                >
                  <FlatList
                    data={this.state.projectMembers}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <View style={styles.personCard}>
                        <Image
                          source={{
                            uri: Api.getFileUrl(item.profilePhotoPath)
                          }}
                          resizeMode="cover"
                          style={{ width: 50, height: 50, borderRadius: 100 }}
                        />
                      </View>
                    )}
                  />
                </TouchableOpacity>
              </View>
              <View>{this.tags(this.state.project.id)}</View>
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
    height: Dimensions.get("window").height - 105
  },

  cardContainer: {
    flex: 1,
    margin: 10
  },
  card: {
    backgroundColor: "#F1F1F1",
    // margin: 10,
    width: "100%",
    height: "100%",
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
  modalContainer: {},
  personList: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  personCard: {
    height: 50,
    width: 50,
    backgroundColor: "#F1F1F1",
    borderRadius: 100
  },
  joinButton: {
    backgroundColor: "#f39200",
    width: "100%",
    height: 30,
    marginBottom: "2%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  leaveButton: {
    backgroundColor: "#ef5350",
    width: "100%",
    height: 30,
    marginBottom: "2%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
