import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableHighlight
} from "react-native";
import {
  NavigationActions,
  Header,
  createMaterialTopTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../helpers/Api";
import ProjectApi from "../helpers/ProjectApi";
import User from "../helpers/User";
import Router from "../helpers/Router";
import Ripple from "react-native-material-ripple";
import FirebaseApi from "../helpers/FirebaseApi";
import { CachedImage } from "react-native-cached-image";

export default class DetailTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project.project,
      tags: [],

      userId: null,
      projectMembers: [],

      liked: props.project.project.liked,
      member: props.project.project.member,
      followed: props.project.project.followed,

      like_count: props.project.project.like_count,
      follower_count: props.project.project.follower_count
    };
  }

  componentDidMount() {
    this.getMembers();
    this.tags(this.state.project.id);
    User.getUserId().then(id => {
      this.setState({ userId: id });
    });
  }

  likedProject() {
    User.getUserId().then(id => {
      if (id == null) {
        Router.goTo(this.props.navigation, "LoginStack", "LoginScreen", {});
      } else {
        ProjectApi.likeProject(this.state.project.id, id).then(res => {
          if (res["bool"]) {
            console.log("yay");
            this.setState({ liked: true, like_count: res["likedCount"] });
          } else {
            console.log(res);
          }
        });
      }
    });
  }

  unlikeProject() {
    User.getUserId().then(id => {
      if (id == null) {
        Router.goTo(this.props.navigation, "LoginStack", "LoginScreen", {});
      } else {
        ProjectApi.unlikeProject(this.state.project.id, id).then(res => {
          if (res["bool"]) {
            console.log("yay");
            this.setState({ liked: false, like_count: res["likedCount"] });
          } else {
            console.log(res);
          }
        });
      }
    });
  }

  getMembers() {
    ProjectApi.getProjectMembersById(this.state.project.id).then(result => {
      if (result["bool"]) {
        this.setState({
          projectMembers: result["members"]
        });
      } else {
        alert("Er zijn geen deelnemers aan dit project");
      }
    });
  }

  tags(id) {
    ProjectApi.getTagsByProjectId(id).then(result => {
      console.log(result);
      if (result["bool"]) {
        this.setState({
          tags: result["tags"]
        });
      }
    });
  }
  startChat() {
    User.getUserId().then(id => {
      if (id == null) {
        Router.goTo(this.props.navigation, "LoginStack", "LoginScreen", {});
      } else {
        let creatorId = this.state.project.creator.id;
        let uid = "";
        if (creatorId > id) {
          uid = id + ":" + creatorId;
        } else {
          uid = creatorId + ":" + id;
        }
        let title =
          this.state.project.creator.firstName +
          " " +
          this.state.project.creator.lastName;
        FirebaseApi.createChat(uid);
        Router.goTo(this.props.navigation, "ChatStack", "Chat", {
          uid: uid,
          title: title,
          differentStack: true
        });
      }
    });
  }

  followProject() {
    User.getUserId().then(id => {
      if (id == null) {
        Router.goTo(this.props.navigation, "LoginStack", "LoginScreen", {});
      } else {
        ProjectApi.followProject(this.state.project.id, id).then(res => {
          if (res["bool"]) {
            this.props.followHandler(true);
            this.setState({
              followed: true,
              follower_count: res["followerCount"]
            });
          } else {
            console.log(res);
          }
        });
      }
    });
  }

  unfollowProject() {
    User.getUserId().then(id => {
      if (id == null) {
        Router.goTo(this.props.navigation, "LoginStack", "LoginScreen", {});
      } else {
        ProjectApi.unfollowProject(this.state.project.id, id).then(res => {
          if (res["bool"]) {
            this.props.followHandler(false);
            this.setState({
              followed: false,
              follower_count: res["followerCount"]
            });
          } else {
            console.log(res);
          }
        });
      }
    });
  }

  joinProject() {
    User.getUserId().then(id => {
      if (id == null) {
        Router.goTo(this.props.navigation, "LoginStack", "LoginScreen", {});
      } else {
        ProjectApi.joinProject(id, this.state.project.id).then(result => {
          if (result["bool"]) {
            this.setState({ member: true });
            this.getMembers();
          } else {
            alert(result["msg"]);
          }
        });
      }
    });
  }

  leaveProject() {
    User.getUserId().then(id => {
      if (id == null) {
        Router.goTo(this.props.navigation, "LoginStack", "LoginScreen", {});
      } else {
        ProjectApi.leaveProject(id, this.state.project.id).then(result => {
          if (result["bool"]) {
            this.setState({ member: false });
            this.getMembers();
          } else {
            alert(result["msg"]);
          }
        });
      }
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ padding: "5%" }}>
          <View style={{ flexDirection: "row" }}>
            <CachedImage
              source={{
                uri: Api.getFileUrl(this.state.project.creator.profilePhotoPath)
              }}
              resizeMode="cover"
              style={{ width: 45, height: 45, top: 2, borderRadius: 100 }}
            />
            <View
              style={{ flexDirection: "column", marginLeft: 10, width: "70%" }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#232f34"
                }}
              >
                {this.state.project.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#232f34"
                }}
              >
                {"Door " +
                  this.state.project.creator.firstName +
                  " " +
                  this.state.project.creator.lastName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Icon name="heart-outline" size={24} color={"#4C6873"} />
                  <Text style={{ paddingLeft: 5, color: "#4C6873" }}>
                    {this.state.like_count} likes
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20
                  }}
                >
                  <Icon name="account-outline" size={24} color={"#4C6873"} />
                  <Text style={{ paddingLeft: 5, color: "#4C6873" }}>
                    {this.state.follower_count} volgers
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ position: "absolute", right: 0 }}>
              {this.state.userId == this.state.project.creator.id && (
                <Icon
                  name="square-edit-outline"
                  color="#00a6ff"
                  size={46}
                  onPress={() => {
                    Router.goTo(
                      this.props.navigation,
                      "ProjectStack",
                      "ProjectEditFirstScreen",
                      {
                        id: this.state.project.id,
                        name: this.state.project.name,
                        desc: this.state.project.desc,
                        start_date: this.state.project.start_date,
                        end_date: this.state.project.end_date,
                        location: this.state.project.location,
                        thumbnail: this.state.project.thumbnail,
                        images: this.state.project.images,
                        files: this.state.project.files,
                        tags: this.state.tags
                      }
                    );
                  }}
                />
              )}
              {this.state.userId != this.state.project.creator.id &&
                this.state.liked == true && (
                  <Icon
                    name="heart"
                    size={46}
                    color={"red"}
                    onPress={() => {
                      this.state.liked
                        ? this.unlikeProject()
                        : this.likedProject();
                    }}
                  />
                )}
              {this.state.userId != this.state.project.creator.id &&
                !this.state.liked && (
                  <Icon
                    name="heart-outline"
                    size={46}
                    color={"red"}
                    onPress={() => {
                      this.state.liked
                        ? this.unlikeProject()
                        : this.likedProject();
                    }}
                  />
                )}
            </View>
          </View>

          <View style={styles.separator} />

          <Text>{this.state.project.desc}</Text>

          {this.state.project.files.length > 0 && (
            <View style={styles.separator} />
          )}
          {this.state.project.files.length > 0 && (
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  width: Dimensions.get("window").width
                }}
              >
                <Icon name="file" size={24} color={"#4C6873"} />
                <Text
                  style={{
                    paddingLeft: 5,
                    color: "#4C6873",
                    fontWeight: "bold"
                  }}
                >
                  Bestanden
                </Text>
              </View>
              <FlatList
                data={this.state.project.files}
                style={{ flexGrow: 0 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      Linking.canOpenURL(Api.getFileUrl(item.path)).then(
                        supported => {
                          if (supported) {
                            Linking.openURL(Api.getFileUrl(item.path));
                          } else {
                            console.log(
                              "Don't know how to open URI: " +
                                Api.getFileUrl(item.path)
                            );
                          }
                        }
                      )
                    }
                    style={{
                      width: "90%",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingBottom: 10
                    }}
                  >
                    <Icon
                      name="file-document-outline"
                      size={48}
                      color={"#4C6873"}
                    />
                    <View style={{ flexDirection: "column" }}>
                      <Text>
                        {item.path.split("/")[item.path.split("/").length - 1]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {(this.state.project.start_date != null ||
            this.state.project.end_date != null ||
            this.state.project.location != null) && (
            <View style={styles.separator} />
          )}

          {(this.state.project.start_date != null ||
            this.state.project.end_date != null ||
            this.state.project.location != null) && (
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  width: Dimensions.get("window").width
                }}
              >
                <Icon name="information" size={24} color={"#4C6873"} />
                <Text
                  style={{
                    paddingLeft: 5,
                    color: "#4C6873",
                    fontWeight: "bold"
                  }}
                >
                  Extra informatie
                </Text>
              </View>
              {this.state.project.location != null && (
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    width: Dimensions.get("window").width
                  }}
                >
                  <Icon name="map-marker" size={24} color={"#4C6873"} />
                  <Text style={{ paddingLeft: 5, color: "#4C6873" }}>
                    {this.state.project.location}
                  </Text>
                </View>
              )}
              {this.state.project.start_date != null && (
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    width: Dimensions.get("window").width
                  }}
                >
                  <Icon name="calendar-range" size={24} color={"#4C6873"} />
                  <Text style={{ paddingLeft: 5, color: "#4C6873" }}>
                    {"Begin datum: " +
                      this.state.project.start_date.substring(0, 10)}
                  </Text>
                </View>
              )}
              {this.state.project.end_date != null && (
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    width: Dimensions.get("window").width
                  }}
                >
                  <Icon name="calendar-range" size={24} color={"#4C6873"} />
                  <Text style={{ paddingLeft: 5, color: "#4C6873" }}>
                    {"Eind datum: " +
                      this.state.project.end_date.substring(0, 10)}
                  </Text>
                </View>
              )}
            </View>
          )}

          {this.state.projectMembers.length > 0 && (
            <View style={styles.separator} />
          )}
          {this.state.projectMembers.length > 0 && (
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  width: Dimensions.get("window").width
                }}
              >
                <Icon name="account-group" size={24} color={"#4C6873"} />
                <Text
                  style={{
                    paddingLeft: 5,
                    color: "#4C6873",
                    fontWeight: "bold"
                  }}
                >
                  {"Deelnemers: " + this.state.projectMembers.length}
                </Text>
              </View>
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
                      <CachedImage
                        source={{
                          uri: Api.getFileUrl(item.profilePhotoPath)
                        }}
                        resizeMode="cover"
                        style={{ width: 35, height: 35, borderRadius: 100 }}
                      />
                    </View>
                  )}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.separator} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 25,
              marginRight: 25
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  backgroundColor: "#00a6ff",
                  height: 60,
                  width: 60,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.startChat()}
              >
                <Icon name="message-outline" size={24} color={"white"} />
              </TouchableOpacity>
              <Text style={{ paddingTop: 10 }}>Contact</Text>
            </View>
            {this.state.member == false && (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#00a6ff",
                    height: 60,
                    width: 60,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.joinProject()}
                >
                  <Icon
                    name="account-multiple-plus"
                    size={24}
                    color={"white"}
                  />
                </TouchableOpacity>
                <Text style={{ paddingTop: 10 }}>Deelnemen</Text>
              </View>
            )}
            {this.state.member == true && (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#00a6ff",
                    height: 60,
                    width: 60,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.leaveProject()}
                >
                  <Icon
                    name="account-multiple-minus"
                    size={24}
                    color={"white"}
                  />
                </TouchableOpacity>
                <Text style={{ paddingTop: 10 }}>Verlaten</Text>
              </View>
            )}
            {this.state.followed == false && (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#00a6ff",
                    height: 60,
                    width: 60,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.followProject()}
                >
                  <Icon
                    name="bookmark-plus-outline"
                    size={24}
                    color={"white"}
                  />
                </TouchableOpacity>
                <Text style={{ paddingTop: 10 }}>Volgen</Text>
              </View>
            )}
            {this.state.followed == true && (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#00a6ff",
                    height: 60,
                    width: 60,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this.unfollowProject()}
                >
                  <Icon
                    name="bookmark-minus-outline"
                    size={24}
                    color={"white"}
                  />
                </TouchableOpacity>
                <Text style={{ paddingTop: 10 }}>Ontvolgen</Text>
              </View>
            )}
          </View>

          {this.state.tags.length > 0 && <View style={styles.separator} />}
          {this.state.tags.length > 0 && (
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  width: Dimensions.get("window").width
                }}
              >
                <Icon name="tag" size={24} color={"#4C6873"} />
                <Text
                  style={{
                    paddingLeft: 5,
                    color: "#4C6873",
                    fontWeight: "bold"
                  }}
                >
                  Tags
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 0,
                  flexWrap: "wrap",
                  paddingHorizontal: 35
                }}
              >
                {this.state.tags.map(tag => {
                  return (
                    <View
                      style={{
                        paddingTop: 2,
                        paddingBottom: 3,
                        marginBottom: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 5,
                        marginLeft: 10,
                        backgroundColor: "#4C6873"
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "white" }}>
                        {tag.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    opacity: 0.3,
    backgroundColor: "#b5babf",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    width: "100%",
    alignSelf: "center"
  },

  personCard: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    width: Dimensions.get("window").width - 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textStyle: {
    padding: "5%",
    fontSize: 16,
    color: "white",
    textAlign: "center"
  },

  buttonStyle: {
    marginBottom: 15,
    backgroundColor: "#00a6ff",
    borderRadius: 25
  },
  personList: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
